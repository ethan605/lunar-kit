const FIXTURES = [
  {
    gregorianDate: [3, 9, 2019],
    julianDays: 2458730,
  },
  {
    gregorianDate: [16, 10, 2000],
    julianDays: 2451834,
  },
  {
    gregorianDate: [30, 5, 1975],
    julianDays: 2442563,
  },
  {
    gregorianDate: [15, 10, 1582],
    julianDays: 2299161,
  },
  {
    gregorianDate: [4, 10, 1582],
    julianDays: 2299160,
  },
  {
    gregorianDate: [26, 7, 1],
    julianDays: 1721630,
  },
  {
    gregorianDate: [1, 1, 0], // Jan 1, 1 BC
    julianDays: 1721058,
  },
  {
    gregorianDate: [20, 7, -50], // Jul 20, 51 BC
    julianDays: 1702996,
  },
  {
    gregorianDate: [1, 1, -4712], // Very first Julian day
    julianDays: 0,
  },
  {
    gregorianDate: [31, 12, -4713], // Out of Julian days range
    julianDays: -1,
  },
];

import CalendarDate from '../CalendarDate';

describe('CalendarDate', () => {
  it('should convert to Julian days correctly', () => {
    FIXTURES.forEach(({ gregorianDate, julianDays }) => {
      const [day, month, year] = gregorianDate;
      const gDate = new CalendarDate(day, month, year);
      expect(gDate.toJulianDays()).toEqual(julianDays);
    });
  });

  it('should be parsed from Julian days correctly', () => {
    FIXTURES.forEach(({ gregorianDate, julianDays }) => {
      const [day, month, year] = gregorianDate;
      const gDate = CalendarDate.fromJulianDays(julianDays);
      expect(gDate.isEqualDate(day, month, year)).toBeTruthy();
    });
  });
});
