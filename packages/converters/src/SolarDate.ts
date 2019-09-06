import Astronomy from './Astronomy';
import BaseDate from './BaseDate';
import LunarDate from './LunarDate';
import { SexagenaryDate } from './Sexagenary';

const JULIAN_CALENDAR_EPOCH = 2299160; // Oct 14, 1582 AD

export default class SolarDate extends BaseDate {
  /**
   * Convert Julian days number into a SolarDate
   * Formula at: https://www.tondering.dk/claus/cal/julperiod.php#formula
   */
  static fromJulianDays(julianDays: number): SolarDate {
    let b = 0;
    let c = 0;

    if (julianDays > JULIAN_CALENDAR_EPOCH) {
      // The day is in Gregorian Calendar
      const a = julianDays + 32044;
      b = Math.floor((4 * a + 3) / 146097);
      c = a - Math.floor((b * 146097) / 4);
    } else {
      // The day is in Julian Calendar
      c = julianDays + 32082;
    }

    const d = Math.floor((4 * c + 3) / 1461);
    const e = c - Math.floor((1461 * d) / 4);
    const m = Math.floor((5 * e + 2) / 153);
    const day = e - Math.floor((153 * m + 2) / 5) + 1;
    const month = m + 3 - 12 * Math.floor(m / 10);
    const year = b * 100 + d - 4800 + Math.floor(m / 10);
    return new SolarDate({ day, month, year });
  }

  /**
   * Calculate Julian days number of self
   * i.e., the number of days between 01/01/4713 BC (Julian calendar) and dd/mm/yyyy.
   * Formula at: https://www.tondering.dk/claus/cal/julperiod.php#formula
   */
  toJulianDays(): number {
    const a = Math.floor((14 - this.month) / 12);
    const y = this.year + 4800 - a;
    const m = this.month + 12 * a - 3;
    const cached = this.day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4);

    const julianDays = cached - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

    // Date in Gregorian calendar
    if (julianDays > JULIAN_CALENDAR_EPOCH) return julianDays;

    // Date in Julian calendar
    return cached - 32083;
  }

  toLunarDate(timeZone: number): LunarDate {
    const julianDays = this.toJulianDays();
    const astronomy = new Astronomy({ timeZone });

    const newMoon = Math.floor((julianDays - 2415021.076998695) / 29.530588853);
    let monthStart = astronomy.getNewMoonDay(newMoon + 1);
    if (monthStart > julianDays) monthStart = astronomy.getNewMoonDay(newMoon);

    let a11 = astronomy.getLunarMonth11(this.year);
    let b11 = a11;
    let year = this.year;

    if (a11 >= monthStart) {
      a11 = astronomy.getLunarMonth11(this.year - 1);
    } else {
      year = this.year + 1;
      b11 = astronomy.getLunarMonth11(this.year + 1);
    }

    const day = julianDays - monthStart + 1;
    const diff = Math.floor((monthStart - a11) / 29);
    let isLeapMonth = false;
    let month = diff + 11;

    if (b11 - a11 > 365) {
      const leapMonthDiff = astronomy.getLeapMonthOffset(a11);

      if (diff >= leapMonthDiff) {
        month = diff + 10;
        if (diff == leapMonthDiff) isLeapMonth = true;
      }
    }

    if (month > 12) month = month - 12;
    if (month >= 11 && diff < 4) year -= 1;
    return new LunarDate({ day, month, year, isLeapMonth });
  }

  toSexagenaryDate(timeZone: number): SexagenaryDate {
    const lunarDate = this.toLunarDate(timeZone);
    return lunarDate.toSexagenaryDate(timeZone);
  }
}
