declare module '@lunarkit/converters' {
  export enum DateComparison {
    Before = -1,
    Equal = 0,
    After = 1,
  }

  export enum Stem {
    Jia = 0,
    Yi = 1,
    Bing = 2,
    Ding = 3,
    Wu = 4,
    Ji = 5,
    Geng = 6,
    Xin = 7,
    Ren = 8,
    Gui = 9,
  }

  export enum Branch {
    Rat = 0,
    Ox = 1,
    Tiger = 2,
    Rabbit = 3,
    Dragon = 4,
    Snake = 5,
    Horse = 6,
    Goat = 7,
    Monkey = 8,
    Rooster = 9,
    Dog = 10,
    Pig = 11,
  }

  export enum Locales {
    Default = 'default',
    Ko = 'ko',
    Vi = 'vi',
    Zh = 'zh',
  }

  export interface BaseDateParams {
    day: number;
    month: number;
    year: number;
  }

  interface AstronomyParams {
    timeZone: number;
  }

  interface LunarDateParams extends BaseDateParams {
    isLeapMonth: boolean;
  }

  interface SexagenaryParams {
    stem: Stem;
    branch: Branch;
  }

  interface SexagenaryDateParams {
    startHour: Sexagenary;
    day: Sexagenary;
    month: Sexagenary;
    year: Sexagenary;
  }

  interface SexagenaryDateStrings {
    startHour: string;
    day: string;
    month: string;
    year: string;
  }

  class BaseDate {
    readonly day: number;
    readonly month: number;
    readonly year: number;
    constructor({ day, month, year }: BaseDateParams);
    compareDate({ day, month, year }: BaseDateParams): DateComparison;
    isEqualDate({ day, month, year }: BaseDateParams): boolean;
    toArray(): number[];
  }

  export class Sexagenary {
    readonly stem: Stem;
    readonly branch: Branch;
    constructor({ stem, branch }: SexagenaryParams);
    add(diff: number): Sexagenary;
    toString(locale?: Locales): string;
  }

  export class SexagenaryDate {
    readonly startHour: Sexagenary;
    readonly day: Sexagenary;
    readonly month: Sexagenary;
    readonly year: Sexagenary;
    constructor({ startHour, day, month, year }: SexagenaryDateParams);
    toStringsObject(locale?: Locales): SexagenaryDateStrings;
  }

  export class SolarDate extends BaseDate {
    /**
     * Convert Julian days number into a SolarDate
     * Formula at: https://www.tondering.dk/claus/cal/julperiod.php#formula
     */
    static fromJulianDays(julianDays: number): SolarDate;
    /**
     * Calculate Julian days number of self
     * i.e., the number of days between 01/01/4713 BC (Julian calendar) and dd/mm/yyyy.
     * Formula at: https://www.tondering.dk/claus/cal/julperiod.php#formula
     */
    toJulianDays(): number;
    toLunarDate({ timeZone }: AstronomyParams): LunarDate;
    toSexagenaryDate({ timeZone }: AstronomyParams): SexagenaryDate;
  }

  export class LunarDate extends BaseDate {
    readonly isLeapMonth: boolean;
    constructor({ day, month, year, isLeapMonth }: LunarDateParams);
    toSolarDate({ timeZone }: AstronomyParams): SolarDate;
    toSexagenaryDate({ timeZone }: AstronomyParams): SexagenaryDate;
  }
}
