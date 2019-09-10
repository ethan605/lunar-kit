enum Locales {
  Default = 'default',
  Ko = 'ko',
  Vi = 'vi',
  Zh = 'zh',
}

export interface LocaleParams {
  [Locales.Default]: string;
  [Locales.Ko]: string;
  [Locales.Vi]: string;
  [Locales.Zh]: string;
}

export default Locales;
