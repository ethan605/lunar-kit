import BaseDate from './BaseDate';

export default class LunarDate extends BaseDate {
  private _hour: number;
  private _isLeapMonth: boolean;

  constructor(day: number, month: number, year: number, isLeapMonth: boolean) {
    super(day, month, year);
    this._isLeapMonth = isLeapMonth;
  }

  get isLeapMonth(): boolean {
    return this._isLeapMonth;
  }
}
