'use client';

import { Head } from '~/src/app/features/header';
import { actions } from './newProcessUtils';

export const NavBar = () => <Head.Header actions={actions} />;
