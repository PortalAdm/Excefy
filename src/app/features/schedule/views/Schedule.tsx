import { Text } from '~/src/app/shared/components/Text';
import { Title } from '~/src/app/shared/components/Title';

export function Schedule() {
  return (
    <div className="p-8">
      <Title title="Agenda" size="xl" color="primary" />
      <div className="flex justify-center mt-40">
        <Text
          text="Página em construção..."
          size="lg"
          color="primary"
          weigth="light"
          className="max-w-md leading-9"
        />
      </div>
    </div>
  );
}
