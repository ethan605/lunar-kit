import Sexagenary, { Locales } from './Sexagenary';

interface SexagenaryDateObject {
  startHour: Sexagenary;
  day: Sexagenary;
  month: Sexagenary;
  year: Sexagenary;
}

interface SexagenaryDateStringsObject {
  startHour: string;
  day: string;
  month: string;
  year: string;
}

export default class SexagenaryDate {
  private _startHour: Sexagenary;
  private _day: Sexagenary;
  private _month: Sexagenary;
  private _year: Sexagenary;

  constructor(startHour: Sexagenary, day: Sexagenary, month: Sexagenary, year: Sexagenary) {
    this._startHour = startHour;
    this._day = day;
    this._month = month;
    this._year = year;
  }

  toObject(): SexagenaryDateObject {
    return {
      startHour: this._startHour,
      day: this._day,
      month: this._month,
      year: this._year,
    };
  }

  toStringsObject(locale: Locales = Locales.Default): SexagenaryDateStringsObject {
    return {
      startHour: this._startHour.toString(locale),
      day: this._day.toString(locale),
      month: this._month.toString(locale),
      year: this._year.toString(locale),
    };
  }
}
