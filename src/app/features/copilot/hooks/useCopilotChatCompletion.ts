'use client';

import { useParams, usePathname } from 'next/navigation';
import { CopilotService } from '../CopilotService';
import { useUserInfo } from '~/src/app/shared/hooks/useUserInfo';
import { COPILOT_OBJECT_TYPE, COPILOT_SCREEN_ID } from '../constants';
import { useLocalBPMN } from '~/src/app/shared/hooks/useLocalBPMN';

type ParamsMapped = {
  screenId: COPILOT_SCREEN_ID;
  objectType?: COPILOT_OBJECT_TYPE;
  objectId?: string | number;
};

export function useCopilotChatCompletion() {
  const pathname = usePathname();
  const params = useParams();
  const localBPMN = useLocalBPMN();

  const { user } = useUserInfo();

  function mapParams(): ParamsMapped {
    if (pathname === '/projects') {
      return { screenId: COPILOT_SCREEN_ID.PROJECTS_LIST };
    }

    if ('projectId' in params) {
      let screenId = COPILOT_SCREEN_ID.UNKNOWN;
      const objectType = COPILOT_OBJECT_TYPE.PROJECT;
      const objectId = params.projectId as string;

      if (pathname.endsWith('/dashboard')) {
        screenId = COPILOT_SCREEN_ID.PROCESSES_LIST;
      }

      return { screenId, objectType, objectId };
    }

    if (pathname === '/new-process') {
      return {
        screenId: COPILOT_SCREEN_ID.NEW_PROCESS,
        objectType: COPILOT_OBJECT_TYPE.PROCESS,
        objectId: localBPMN?.draft?.commandId
      };
    }

    if ('commandId' in params) {
      let screenId = COPILOT_SCREEN_ID.UNKNOWN;
      const objectType = COPILOT_OBJECT_TYPE.PROCESS;
      const objectId = params.commandId as string;

      if (pathname.startsWith('/edit-process')) {
        screenId = COPILOT_SCREEN_ID.EDIT_PROCESS;
      }

      return { screenId, objectType, objectId };
    }

    return { screenId: COPILOT_SCREEN_ID.UNKNOWN };
  }

  async function chatCompletion(question: string) {
    const params = mapParams();

    const completion = await CopilotService.chatCompletion(question, {
      customerId: user.clientId,
      userId: user.userId,
      screenId: params.screenId,
      objectType: params.objectType || COPILOT_OBJECT_TYPE.NONE,
      objectId: params.objectId || 0
    });

    if (completion.hasUpdatedObject && completion.updatedXML) {
      const event = new Event('copilot-update-bpmn');
      window.dispatchEvent(event);
    }

    return completion;
  }

  return chatCompletion;
}
