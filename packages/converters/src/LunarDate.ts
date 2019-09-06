import Astronomy, { AstronomyParams } from './Astronomy';
import BaseDate, { BaseDateParams } from './BaseDate';
import SolarDate from './SolarDate';
import { Sexagenary, SexagenaryDate } from './Sexagenary';

interface LunarDateParams extends BaseDateParams {
  isLeapMonth: boolean;
}

export default class LunarDate extends BaseDate {
  readonly isLeapMonth: boolean;

  constructor({ day, month, year, isLeapMonth }: LunarDateParams) {
    super({ day, month, year });
    this.isLeapMonth = isLeapMonth;
  }

  toSolarDate(timeZone: number): SolarDate {
    const astronomy = new Astronomy({ timeZone });

    let a11 = 0;
    let b11 = 0;
    let offset = 0;

    if (this.month < 11) {
      a11 = astronomy.getLunarMonth11(this.year - 1);
      b11 = astronomy.getLunarMonth11(this.year);
      offset = this.month + 1;
    } else {
      a11 = astronomy.getLunarMonth11(this.year);
      b11 = astronomy.getLunarMonth11(this.year + 1);
      offset = this.month - 11;
    }

    const newMoonOrder = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);

    let leapOffset = 0;
    let leapMonth = 0;

    if (b11 - a11 > 365) {
      leapOffset = astronomy.getLeapMonthOffset(a11);
      leapMonth = leapOffset - 2;
      if (leapMonth < 0) leapMonth += 12;
      if (this.isLeapMonth && this.month != leapMonth) return new SolarDate({ day: 0, month: 0, year: 0 });
      if (this.isLeapMonth || offset >= leapOffset) offset += 1;
    }

    const monthStart = astronomy.getNewMoonDay(newMoonOrder + offset);
    return SolarDate.fromJulianDays(monthStart + this.day - 1);
  }

  toSexagenaryDate({ timeZone }: AstronomyParams): SexagenaryDate {
    const julianDays = this.toSolarDate(timeZone).toJulianDays();

    const year = new Sexagenary({
      stem: (this.year + 6) % 10,
      branch: (this.year + 8) % 12,
    });

    const month = new Sexagenary({
      stem: (this.year * 12 + this.month + 3) % 10,
      branch: (this.month + 1) % 12,
    });

    const day = new Sexagenary({
      stem: (julianDays + 9) % 10,
      branch: (julianDays + 1) % 12,
    });

    const startHour = new Sexagenary({
      stem: (((julianDays + 9) % 5) * 2) % 10,
      branch: 0,
    });

    return new SexagenaryDate({ startHour, day, month, year });
  }
}
