import Astronomy from './Astronomy';
import BaseDate from './BaseDate';
import SolarDate from './SolarDate';

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

  toSolarDate(timeZone: number): SolarDate {
    const astronomy = new Astronomy(timeZone);

    let a11 = 0;
    let b11 = 0;
    let offset = 0;

    if (this._month < 11) {
      a11 = astronomy.getLunarMonth11(this._year - 1);
      b11 = astronomy.getLunarMonth11(this._year);
      offset = this._month + 1;
    } else {
      a11 = astronomy.getLunarMonth11(this._year);
      b11 = astronomy.getLunarMonth11(this._year + 1);
      offset = this._month - 11;
    }

    const newMoonOrder = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);

    let leapOffset = 0;
    let leapMonth = 0;

    if (b11 - a11 > 365) {
      leapOffset = astronomy.getLeapMonthOffset(a11);
      leapMonth = leapOffset - 2;
      if (leapMonth < 0) leapMonth += 12;
      if (this._isLeapMonth && this._month != leapMonth) return new SolarDate(0, 0, 0);
      if (this._isLeapMonth || offset >= leapOffset) offset += 1;
    }

    const monthStart = astronomy.getNewMoonDay(newMoonOrder + offset);
    return SolarDate.fromJulianDays(monthStart + this._day - 1);
  }
}
