'use client';

import { logEvent, EventParams } from 'firebase/analytics';
import { analytics } from './firebase';

export const analyticsEvent = (eventName: string, params: EventParams) =>
  logEvent(analytics, eventName, params);
