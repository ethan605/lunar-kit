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

export enum Locales {
  Default = 'default',
  Ko = 'ko',
  Vi = 'vi',
  Zh = 'zh',
}

interface SexagenaryParams {
  stem: Stem;
  branch: Branch;
}

/**
 * Calculate the absolute modulo value of two numbers.
 * Noted that dividend could be negative, but the results will always be non-negative
 *
 * @param {number} dividend
 * @param {number} divisor
 * @returns {number}
 */
const absModulo = (dividend: number, divisor: number): number => {
  const modulo = dividend % divisor;
  if (modulo >= 0) return Math.abs(modulo);
  return modulo + divisor;
};

export default class Sexagenary {
  readonly stem: Stem;
  readonly branch: Branch;

  constructor({ stem, branch }: SexagenaryParams) {
    this.stem = stem;
    this.branch = branch;
  }

  add(diff: number): Sexagenary {
    const stem = absModulo(this.stem + diff, 10);
    const branch = absModulo(this.branch + diff, 12);
    return new Sexagenary({ stem, branch });
  }

  toString(locale: Locales = Locales.Default): string {
    const { delimiter = '', stems = null, branches = null } = LOCALES[locale] || {};
    if (stems == null || branches == null) return '';

    const stem = stems[this.stem];
    const branch = branches[this.branch];
    return [stem, branch].join(delimiter);
  }
}
