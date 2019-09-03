const JULIUS_DAY_EPOCH = 2299160;

export default class GregorianDay {
  private day: number;
  private month: number;
  private year: number;

  constructor(day: number, month: number, year: number) {
    this.day = day;
    this.month = month;
    this.year = year;
  }

  /**
   * Compute the (integral) Julian days number of self,
   * i.e., the number of days between 01/01/4713 BC (Julian calendar) and dd/mm/yyyy.
   * Formula from http://www.tondering.dk/claus/calendar.html
   */
  julianDays(): number {
    const a = Math.floor((14 - this.month) / 12);
    const y = this.year + 4800 - a;
    const m = this.month + 12 * a - 3;
    let jd =
      this.day +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) -
      32045;

    if (jd < JULIUS_DAY_EPOCH + 1) jd = this.day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;

    return jd;
  }

  /**
   * Formular from: https://en.wikipedia.org/wiki/Julian_day#Converting_Gregorian_calendar_date_to_Julian_Day_Number
   */
  julianDaysWiki(): number {
    const normalizedMonth = Math.floor((this.month - 14) / 12);

    return (
      (1461 * (this.year + 4800 + normalizedMonth)) / 4 +
      (367 * (this.month - 2 - 12 * normalizedMonth)) / 12 -
      (3 * ((this.year + 4900 + normalizedMonth) / 100)) / 4 +
      this.day -
      32075
    );
  }
}
