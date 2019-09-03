const JULIAN_CALENDAR_EPOCH = 2299160; // Oct 4, 1582 AD
const MIN_YEAR = -4712; // Jan 1, 4713 BC

export default class GregorianDate {
  private day: number;
  private month: number;
  private year: number;

  constructor(day: number, month: number, year: number) {
    this.day = day;
    this.month = month;
    this.year = year;
  }

  static fromJulianDays(julianDays: number): GregorianDate {
    return new GregorianDate(1, 1, 1);
  }

  /**
   * Compute the (integral) Julian days number of self,
   * i.e., the number of days between 01/01/4713 BC (Julian calendar) and dd/mm/yyyy.
   * Formula from http://www.tondering.dk/claus/calendar.html
   */
  toJulianDays(): number {
    if (this.year < MIN_YEAR) return -1;

    const monthDelta = Math.floor((14 - this.month) / 12);
    const normalizedYear = this.year + 4800 - monthDelta;
    const normalizedMonth = this.month + 12 * monthDelta - 3;
    const preCalculated =
      Math.floor((153 * normalizedMonth + 2) / 5) + 365 * normalizedYear + Math.floor(normalizedYear / 4);

    const julianDays =
      this.day + preCalculated - Math.floor(normalizedYear / 100) + Math.floor(normalizedYear / 400) - 32045;

    if (julianDays < JULIAN_CALENDAR_EPOCH + 1) return this.day + preCalculated - 32083;

    return julianDays;
  }

  isEqualDate(day: number, month: number, year: number): boolean {
    return this.day === day && this.month === month && this.year === year;
  }
}
