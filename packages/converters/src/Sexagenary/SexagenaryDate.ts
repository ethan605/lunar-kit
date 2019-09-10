import Sexagenary from './Sexagenary';
import { Locales } from '../utils';

interface SexagenaryDateParams {
  startHour: Sexagenary;
  day: Sexagenary;
  month: Sexagenary;
  year: Sexagenary;
}

interface SexagenaryDateStrings {
  startHour: string;
  day: string;
  month: string;
  year: string;
}

export default class SexagenaryDate {
  readonly startHour: Sexagenary;
  readonly day: Sexagenary;
  readonly month: Sexagenary;
  readonly year: Sexagenary;

  constructor({ startHour, day, month, year }: SexagenaryDateParams) {
    this.startHour = startHour;
    this.day = day;
    this.month = month;
    this.year = year;
  }

  toStringsObject(locale: Locales = Locales.Default): SexagenaryDateStrings {
    return {
      startHour: this.startHour.toString(locale),
      day: this.day.toString(locale),
      month: this.month.toString(locale),
      year: this.year.toString(locale),
    };
  }
}
