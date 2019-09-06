import LunarDate from '../src/LunarDate';

// Fixtures
import conversionFixtures from './fixtures/conversions.json';

describe('LunarDate', () => {
  it('should convert to solar dates correctly', () => {
    conversionFixtures.forEach(({ solar, timeZone, lunar, leapMonth }) => {
      const [day, month, year] = lunar;
      const lunarDate = new LunarDate({ day, month, year, isLeapMonth: leapMonth });
      const solarDate = lunarDate.toSolarDate(timeZone);
      expect(solarDate.toArray()).toEqual(solar);
    });
  });
});
