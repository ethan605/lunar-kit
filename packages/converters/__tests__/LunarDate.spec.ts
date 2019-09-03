import LunarDate from '../src/LunarDate';

const FIXTURES = [
  { solarDate: [30, 10, 2014], timeZone: 7, lunarDate: [7, 9, 2014], isLeapMonth: true },
  { solarDate: [24, 6, 2009], timeZone: 7, lunarDate: [2, 5, 2009], isLeapMonth: true },
  { solarDate: [25, 3, 2004], timeZone: 7, lunarDate: [5, 2, 2004], isLeapMonth: true },
  { solarDate: [16, 10, 2000], timeZone: 7, lunarDate: [19, 9, 2000], isLeapMonth: false },
  { solarDate: [12, 10, 1995], timeZone: 7, lunarDate: [19, 8, 1995], isLeapMonth: true },
  { solarDate: [30, 5, 1975], timeZone: 7, lunarDate: [20, 4, 1975], isLeapMonth: false },
  { solarDate: [4, 10, 1582], timeZone: 7, lunarDate: [18, 9, 1582], isLeapMonth: false },
  { solarDate: [26, 7, 1], timeZone: 7, lunarDate: [18, 6, 1], isLeapMonth: false },
  { solarDate: [1, 1, 0], timeZone: 7, lunarDate: [7, 12, -1], isLeapMonth: false },
  { solarDate: [1, 1, -4712], timeZone: 7, lunarDate: [22, 11, -4713], isLeapMonth: false },
  { solarDate: [31, 12, -4713], timeZone: 7, lunarDate: [21, 11, -4713], isLeapMonth: false },
  { solarDate: [1, 1, -4713], timeZone: 7, lunarDate: [12, 11, -4714], isLeapMonth: false },
];

describe('LunarDate', () => {
  it('should convert from solar dates correctly', () => {
    FIXTURES.forEach(({ solarDate, timeZone, lunarDate, isLeapMonth }) => {
      const [day, month, year] = solarDate;
      const lunar = LunarDate.fromSolarDate(day, month, year, timeZone);
      expect(lunar.toArray()).toEqual(lunarDate);
      expect(lunar.isLeapMonth).toEqual(isLeapMonth);
    });
  });
});
