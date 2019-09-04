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

  export interface SexagenaryPair {
    stem: Stem;
    branch: Branch;
  }

  class BaseDate {
    constructor(day: number, month: number, year: number);
    compareDate(day: number, month: number, year: number): DateComparison;
    isEqualDate(day: number, month: number, year: number): boolean;
    toArray(): number[];
  }

  export class Sexagenary {
    constructor({ stem, branch }: SexagenaryPair);
    toString(locale?: string): string;
  }

  export class SolarDate extends BaseDate {
    static fromJulianDays(julianDays: number): SolarDate;
    toJulianDays(): number;
    toLunarDate(timeZone: number): LunarDate;
    toSexagenaries(timeZone: number, solarTime: number[]): { [key: string]: Sexagenary };
  }

  export class LunarDate extends BaseDate {
    readonly isLeapMonth: boolean;
    toSolarDate(timeZone: number): SolarDate;
  }
}
