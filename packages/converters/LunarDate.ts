import CalendarDate from './CalendarDate';
import Astronomy from './Astronomy';

export default class LunarDate {
  private astronomy: Astronomy;
  private date: CalendarDate;

  constructor(day: number, month: number, year: number, timeZone: number) {
    this.astronomy = new Astronomy(timeZone);
    this.date = new CalendarDate(day, month, year);
  }
}
