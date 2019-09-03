import CalendarDate from './CalendarDate';
import Astronomy from './Astronomy';

export default class LunarDate extends CalendarDate {
  private _hour: number;
  private _isLeapMonth: boolean;

  constructor(day: number, month: number, year: number, isLeapMonth: boolean) {
    super(day, month, year);
    this._isLeapMonth = isLeapMonth;
  }

  get isLeapMonth(): boolean {
    return this._isLeapMonth;
  }

  static fromSolarDate(day: number, month: number, year: number, timeZone: number): LunarDate {
    const dayNumber = new CalendarDate(day, month, year).toJulianDays();
    const astronomy = new Astronomy(timeZone);

    const newMoon = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = astronomy.getNewMoonDay(newMoon + 1);
    if (monthStart > dayNumber) monthStart = astronomy.getNewMoonDay(newMoon);

    let a11 = astronomy.getLunarMonth11(year);
    let b11 = a11;
    let lunarYear = year;

    if (a11 >= monthStart) {
      a11 = astronomy.getLunarMonth11(year - 1);
    } else {
      lunarYear = year + 1;
      b11 = astronomy.getLunarMonth11(year + 1);
    }

    const lunarDay = dayNumber - monthStart + 1;
    const diff = Math.floor((monthStart - a11) / 29);
    let lunarLeap = false;
    let lunarMonth = diff + 11;

    if (b11 - a11 > 365) {
      const leapMonthDiff = astronomy.getLeapMonthOffset(a11);

      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff == leapMonthDiff) lunarLeap = true;
      }
    }

    if (lunarMonth > 12) lunarMonth = lunarMonth - 12;
    if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
    return new LunarDate(lunarDay, lunarMonth, lunarYear, lunarLeap);
  }
}
