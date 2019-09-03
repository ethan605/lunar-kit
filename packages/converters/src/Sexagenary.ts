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

const LOCALES = {
  default: {
    stems: ['jia', 'yi', 'bing', 'ding', 'wu', 'ji', 'geng', 'xin', 'ren', 'gui'],
    branches: ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'],
  },
  ko: {
    stems: ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'],
    branches: ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'],
  },
  vi: {
    stems: ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'],
    branches: ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'],
  },
  zh: {
    stems: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
    branches: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
  },
};

export default class Sexagenary {
  private _stem: Stem;
  private _branch: Branch;

  constructor({ stem, branch }: SexagenaryPair) {
    this._stem = stem;
    this._branch = branch;
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
