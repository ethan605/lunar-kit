import LunarDate from '../src/LunarDate';

// Fixtures
import fixtures from './fixtures/conversions.json';

describe('LunarDate', () => {
  it('should convert to solar dates correctly', () => {
    fixtures.forEach(({ solar, timeZone, lunar, leapMonth }) => {
      const [day, month, year] = lunar;
      const lunarDate = new LunarDate({ day, month, year, isLeapMonth: leapMonth });
      const solarDate = lunarDate.toSolarDate({ timeZone });
      expect(solarDate.toArray()).toEqual(solar);
    });
  });

  it('should handle edge cases correctly', () => {
    const date1 = new LunarDate({ day: 24, month: 6, year: 2009, isLeapMonth: true });
    expect(date1.toSolarDate({ timeZone: 7 })).toEqual({ day: 0, month: 0, year: 0 });
  });
});
