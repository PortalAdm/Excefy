import { FaProjectDiagram } from 'react-icons/fa';
import { MdFormatAlignLeft } from 'react-icons/md';

export enum COPILOT_SCREEN_ID {
  UNKNOWN = 0,
  PROJECTS_LIST = 1,
  PROCESSES_LIST = 2,
  NEW_PROCESS = 3,
  EDIT_PROCESS = 4,
  EDIT_FORM = 5
}

export enum COPILOT_OBJECT_TYPE {
  NONE = 0,
  PROCESS = 1,
  FORM = 2,
  DMN = 3,
  PROJECT = 4
}

export const ITEM_ICON = {
  PROCESS: FaProjectDiagram,
  FORM: MdFormatAlignLeft
};
