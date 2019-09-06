export interface BaseDateParams {
  day: number;
  month: number;
  year: number;
}

export enum DateComparison {
  Before = -1,
  Equal = 0,
  After = 1,
}

export default class BaseDate {
  readonly day: number;
  readonly month: number;
  readonly year: number;

  constructor({ day, month, year }: BaseDateParams) {
    this.day = day;
    this.month = month;
    this.year = year;
  }

  compareDate({ day, month, year }: BaseDateParams): DateComparison {
    if (this.year > year) return DateComparison.After;
    if (this.year < year) return DateComparison.Before;

    // Same years
    if (this.month > month) return DateComparison.After;
    if (this.month < month) return DateComparison.Before;

    // Same months
    if (this.day > day) return DateComparison.After;
    if (this.day < day) return DateComparison.Before;

    return DateComparison.Equal;
  }

  isEqualDate({ day, month, year }: BaseDateParams): boolean {
    return this.compareDate({ day, month, year }) === DateComparison.Equal;
  }

  toArray(): number[] {
    return [this.day, this.month, this.year];
  }
}
