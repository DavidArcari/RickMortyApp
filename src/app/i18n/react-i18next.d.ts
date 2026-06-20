import 'react-i18next';
import type {DefaultResources} from './resources';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: DefaultResources;
  }
}
