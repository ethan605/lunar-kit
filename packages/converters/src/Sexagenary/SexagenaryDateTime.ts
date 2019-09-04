import Sexagenary from './Sexagenary';

export default class SexagenaryDateTime {
  private _hour: Sexagenary;
  private _day: Sexagenary;
  private _month: Sexagenary;
  private _year: Sexagenary;

  constructor(hour: Sexagenary, day: Sexagenary, month: Sexagenary, year: Sexagenary) {
    this._hour = hour;
    this._day = day;
    this._month = month;
    this._year = year;
  }

  get toObject(): { [key: string]: Sexagenary } {
    return {
      hour: this._hour,
      day: this._day,
      month: this._month,
      year: this._year,
    };
  }
}
