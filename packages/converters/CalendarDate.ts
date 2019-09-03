const JULIAN_CALENDAR_EPOCH = 2299160; // Oct 14, 1582 AD

enum DateComparison {
  Before = -1,
  Equal = 0,
  After = 1,
}

export default class CalendarDate {
  private day: number;
  private month: number;
  private year: number;

  constructor(day: number, month: number, year: number) {
    this.day = day;
    this.month = month;
    this.year = year;
  }

  /**
   * Convert Julian days number into a CalendarDate
   * Formula at: https://www.tondering.dk/claus/cal/julperiod.php#formula
   */
  static fromJulianDays(julianDays: number): CalendarDate {
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
    return new CalendarDate(day, month, year);
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

  isEqualDate(day: number, month: number, year: number): boolean {
    return this.compareDate(day, month, year) === DateComparison.Equal;
  }

  private compareDate(day: number, month: number, year: number): DateComparison {
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
}
