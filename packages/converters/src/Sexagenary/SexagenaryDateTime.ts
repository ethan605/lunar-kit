import Sexagenary, { Locales } from './Sexagenary';

interface SexagenaryDateTimeObject {
  hour: Sexagenary;
  day: Sexagenary;
  month: Sexagenary;
  year: Sexagenary;
}

interface SexagenaryDateTimeStringsObject {
  hour: string;
  day: string;
  month: string;
  year: string;
}

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

  toObject(): SexagenaryDateTimeObject {
    return {
      hour: this._hour,
      day: this._day,
      month: this._month,
      year: this._year,
    };
  }

  toStringsObject(locale: Locales = Locales.Default): SexagenaryDateTimeStringsObject {
    return {
      hour: this._hour.toString(locale),
      day: this._day.toString(locale),
      month: this._month.toString(locale),
      year: this._year.toString(locale),
    };
  }
}
