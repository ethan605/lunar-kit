declare module '@lunar-kit/converters' {
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

  export enum DateComparison {
    Before = -1,
    Equal = 0,
    After = 1,
  }

  export enum Locales {
    Default = 'default',
    Ko = 'ko',
    Vi = 'vi',
    Zh = 'zh',
  }

  interface SexagenaryPair {
    stem: Stem;
    branch: Branch;
  }

  interface SexagenaryDateTimeObject {
    hour: Sexagenary;
    day: Sexagenary;
    month: Sexagenary;
    year: Sexagenary;
  }

  interface SexagenaryDateTimeStringsObject {
    hour: string;
    day: string;
    month: string;
    year: string;
  }

  class BaseDate {
    constructor(day: number, month: number, year: number);
    compareDate(day: number, month: number, year: number): DateComparison;
    isEqualDate(day: number, month: number, year: number): boolean;
    toArray(): number[];
  }

  export class Sexagenary {
    constructor({ stem, branch }: SexagenaryPair);
    toString(locale?: Locales): string;
  }

  export class SexagenaryDateTime {
    constructor(hour: Sexagenary, day: Sexagenary, month: Sexagenary, year: Sexagenary);
    toString(locale?: Locales): string;
    toObject(): SexagenaryDateTimeObject;
    toStringsObject(locale?: Locales): SexagenaryDateTimeStringsObject;
  }

  export class SolarDate extends BaseDate {
    static fromJulianDays(julianDays: number): SolarDate;
    toJulianDays(): number;
    toLunarDate(timeZone: number): LunarDate;
    toSexagenaryDateTime(timeZone: number, solarTime: number[]): SexagenaryDateTime;
  }

  export class LunarDate extends BaseDate {
    readonly isLeapMonth: boolean;
    toSolarDate(timeZone: number): SolarDate;
    toSexagenaryDateTime(timeZone: number, solarTime: number[]): SexagenaryDateTime;
  }
}
