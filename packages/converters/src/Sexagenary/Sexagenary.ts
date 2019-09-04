import LOCALES from './locales.json';

export enum Stem {
  Jia = 0,
  Yi,
  Bing,
  Ding,
  Wu,
  Ji,
  Geng,
  Xin,
  Ren,
  Gui,
}

export enum Branch {
  Rat = 0,
  Ox,
  Tiger,
  Rabbit,
  Dragon,
  Snake,
  Horse,
  Goat,
  Monkey,
  Rooster,
  Dog,
  Pig,
}

export interface SexagenaryPair {
  stem: Stem;
  branch: Branch;
}

export default class Sexagenary {
  private _stem: Stem;
  private _branch: Branch;

  constructor({ stem, branch }: SexagenaryPair) {
    this._stem = stem;
    this._branch = branch;
  }

  get stem(): Stem {
    return this._stem;
  }

  get branch(): Branch {
    return this._branch;
  }

  toString(locale = 'default'): string {
    const { stems = null, branches = null } = LOCALES[locale] || {};
    if (stems == null || branches == null) return '';

    const stem = stems[this._stem];
    const branch = branches[this._branch];

    if (locale === 'default') return [stem, branch].join('-');
    return [stem, branch].join(' ');
  }
}
