'use client';

import '@bpmn-io/form-js/dist/assets/form-js.css';
import '@bpmn-io/form-js/dist/assets/form-js-editor.css';

import { type FormEditor } from '@bpmn-io/form-js';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import Canva from '~/src/app/features/diagramView/views/components/Canva';
import { Title } from '~/src/app/shared/components/Title';
import { Button } from '~/src/app/shared/components/Button';
import { FormItem } from '../../shared/types/FormItem';
import { FormSchema } from '../../shared/types/FormItem';
import { TbLoader2 } from 'react-icons/tb';
import { Icon } from '~/src/app/shared/components/Icon';
import { FaCheck } from 'react-icons/fa';
import { formateHour } from '~/src/app/shared/utils/dateUtils';
import { Text } from '~/src/app/shared/components/Text';
import { Tooltip } from '../../shared/components/Tooltip';
import { CiExport, CiImport } from 'react-icons/ci';
import download from 'downloadjs';
import { useToast } from '../../shared/hooks/useToast';

type Props = {
  name: string;
  item?: FormItem;
  onSave: (schema: FormSchema) => void;
};

export function FormPanel({ name, item, onSave }: Props) {
  const canvaRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<FormEditor>();

  const [isMounted, setIsMounted] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState<Error | null>(null);
  const [isLoadingEditor, setIsLoadingEditor] = useState(true);

  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const { changeToastActive } = useToast();

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!isMounted || !canvaRef.current) return;

    import('@bpmn-io/form-js')
      .then(({ FormEditor }) => {
        if (!editorRef.current) {
          editorRef.current = new FormEditor({
            container: canvaRef.current
          });
        }

        editorRef.current
          .importSchema(item?.schema || { type: 'default', components: [] })
          .then(({ warnings }) => {
            if (warnings?.length) {
              // eslint-disable-next-line no-console
              console.warn(warnings);
            }
          })
          .catch((error) => setErrorFeedback(error as Error))
          .finally(() => setIsLoadingEditor(false));
      })
      .catch((error) => {
        setIsLoadingEditor(false);
        setErrorFeedback(error as Error);
      });

    return () => {
      editorRef.current?.destroy();
      editorRef.current = undefined;
    };
  }, [isMounted, item]);

  const showToast = useCallback(
    (state: 'success' | 'error', title: string, message: string) =>
      changeToastActive(
        {
          state
        },
        title,
        message,
        3000
      ),
    [changeToastActive]
  );

  async function handleSave() {
    if (!editorRef.current) return;

    const schema = await editorRef.current.saveSchema();
    onSave(schema);

    setLastUpdate(new Date());
  }

  async function handleImport(event: ChangeEvent<HTMLInputElement>) {
    if (!editorRef.current) return;

    const file = event.target.files?.item(0);
    if (!file) return;

    let formSchema: FormSchema;

    try {
      const parsed = JSON.parse(await file.text());

      if ('components' in parsed && 'schemaVersion' in parsed && 'id' in parsed) {
        formSchema = parsed as FormSchema;
      } else {
        throw new Error('Formulário inválido ou corrompido.');
      }
    } catch (error) {
      showToast('error', `Ocorreu um erro ao importar ${file.name}:`, (error as Error).message);
      return;
    }

    showToast('success', `Arquivo ${file.name} importado.`, '');
    await editorRef.current.importSchema(formSchema);
  }

  async function handleExport() {
    if (!editorRef.current) return;

    const fileName = `${name}.form`;

    showToast('success', `Baixando arquivo ${fileName}...`, '');

    const schema = await editorRef.current.saveSchema();
    download(JSON.stringify(schema), fileName, 'application/json');
  }

  return (
    <div className="w-full h-[calc(100%_-_6rem)] justify-center">
      {isLoadingEditor && (
        <div className="h-[calc(100vh-64px)] flex items-center justify-center animate-pulse">
          <TbLoader2 className="animate-spin w-10 h-10 text-primary/60" />
        </div>
      )}

      {!isLoadingEditor && errorFeedback && (
        <div className="h-[calc(100vh-64px)] text-error flex items-center justify-center flex-col gap-2">
          <span className="text-[16px]">Ocorreu um erro ao carregar o formulário:</span>

          <span className="font-bold text-[18px]">{errorFeedback.message}</span>
        </div>
      )}

      {!isLoadingEditor && !errorFeedback && (
        <div className="px-10 pt-12 pb-1 flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Title title={name} size="md" className="truncate" />

            <Button.root onClick={handleSave} color="primary" size="small">
              <Button.contentWrapper>
                <Button.label text="Salvar" color="white" className="text-xs sm:text-md" />
              </Button.contentWrapper>
            </Button.root>

            {lastUpdate && (
              <div className="flex gap-2 items-center">
                <Text
                  text={`Salvo ${formateHour(lastUpdate)}`}
                  as="span"
                  color="placeholder"
                  size="sm"
                />
                <Icon icon={FaCheck} color="outline" size="small" />
              </div>
            )}
          </div>

          <div className="flex items-center">
            <Tooltip text="Importar">
              <Button.root size="small" color="transparent" variant="onlyIcon" asChild>
                <label>
                  <input
                    id="import-form"
                    type="file"
                    value=""
                    className="sr-only"
                    accept=".form"
                    onChange={handleImport}
                  />
                  <Button.icon icon={CiImport} />
                </label>
              </Button.root>
            </Tooltip>

            <Tooltip text="Exportar">
              <Button.root
                size="small"
                color="transparent"
                variant="onlyIcon"
                onClick={handleExport}
              >
                <Button.icon icon={CiExport} />
              </Button.root>
            </Tooltip>
          </div>
        </div>
      )}

      <Canva ref={canvaRef} />
    </div>
  );
}
