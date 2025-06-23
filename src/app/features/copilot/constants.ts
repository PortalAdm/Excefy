import { FaProjectDiagram } from 'react-icons/fa';
import { MdFormatAlignLeft } from 'react-icons/md';

export enum COPILOT_SCREEN_ID {
  UNKNOWN = 0,
  PROJECTS_LIST = 1,
  PROCESSES_LIST = 2,
  NEW_PROCESS = 3,
  EDIT_PROCESS = 4,
  NEW_FORM = 5,
  EDIT_FORM = 6
}

export enum COPILOT_OBJECT_TYPE {
  NONE = 0,
  PROJECT = 1,
  PROCESS = 2,
  FORM = 3
}

export const ITEM_ICON = {
  PROCESS: FaProjectDiagram,
  FORM: MdFormatAlignLeft
};
