import i18n from 'i18n-js';

export enum Local {
  RU = 'ru'
}

export default class Localization {
  constructor() {
    i18n.fallbacks = true;
    i18n.translations = {ru: require('./ru')};
    i18n.locale = i18n.defaultLocale = 'ru';
  }

  static setLocale(local: Local): void {
    i18n.fallbacks = true;
    i18n.locale = i18n.defaultLocale = local;

    switch (local) {
      case Local.RU: {
        i18n.translations = {[local]: require('./ru').default};
      }
    }
  }

  static t(scope: i18n.Scope, options?: i18n.TranslateOptions) {
    return i18n.t(scope, options);
  }
}
