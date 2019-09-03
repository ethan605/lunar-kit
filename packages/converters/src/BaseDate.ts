export enum DateComparison {
  Before = -1,
  Equal = 0,
  After = 1,
}

export default class BaseDate {
  protected _day: number;
  protected _month: number;
  protected _year: number;

  constructor(day: number, month: number, year: number) {
    this._day = day;
    this._month = month;
    this._year = year;
  }

  compareDate(day: number, month: number, year: number): DateComparison {
    if (this._year > year) return DateComparison.After;
    if (this._year < year) return DateComparison.Before;

    // Same years
    if (this._month > month) return DateComparison.After;
    if (this._month < month) return DateComparison.Before;

    // Same months
    if (this._day > day) return DateComparison.After;
    if (this._day < day) return DateComparison.Before;

    return DateComparison.Equal;
  }

  isEqualDate(day: number, month: number, year: number): boolean {
    return this.compareDate(day, month, year) === DateComparison.Equal;
  }

  toArray(): number[] {
    return [this._day, this._month, this._year];
  }
}
