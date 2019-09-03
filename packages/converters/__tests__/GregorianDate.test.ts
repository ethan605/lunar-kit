const JULIAN_DAYS = [
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

import GregorianDate from '../GregorianDate';

describe('GregorianDate', () => {
  it('should compare with other GregorianDate correctly', () => {
    const date1 = new GregorianDate(1, 1, 1);
    expect(date1.isEqualDate(1, 1, 1)).toBeTruthy();

    const date2 = new GregorianDate(1, 1, 1);
    expect(date2.isEqualDate(3, 9, 2019)).toBeFalsy();
  });

  it('should convert to Julian days correctly', () => {
    JULIAN_DAYS.forEach(({ gregorianDate, julianDays }) => {
      const [day, month, year] = gregorianDate;
      const gDate = new GregorianDate(day, month, year);
      expect(gDate.toJulianDays()).toEqual(julianDays);
    });
  });

  it('should be parsed from Julian days correctly', () => {
    JULIAN_DAYS.forEach(({ gregorianDate, julianDays }) => {
      const [day, month, year] = gregorianDate;
      const gDate = GregorianDate.fromJulianDays(julianDays);
      expect(gDate.isEqualDate(day, month, year)).toBeTruthy();
    });
  });
});
