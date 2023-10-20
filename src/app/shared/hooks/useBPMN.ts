import { useContext } from 'react';
import { BpmnContext } from '../contexts/BpmnContext';

export const useBPMN = () => useContext(BpmnContext);
