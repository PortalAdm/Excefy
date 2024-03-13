import { FormsComponent } from './views/FormsComponent';
import { AuthHero } from './views/AuthHero';
import { AuthRoot } from '~/src/app/features/auth/views/AuthRoot';

export const Auth = {
  root: AuthRoot,
  forms: FormsComponent,
  hero: AuthHero
};
