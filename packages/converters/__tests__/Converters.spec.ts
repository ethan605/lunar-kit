import SolarDate from '../src/SolarDate';

import conversionFixtures from './fixtures/conversions.json';

describe('Converters', () => {
  it('should convert solar to lunar dates correctly', () => {
    conversionFixtures.forEach(({ solar, timeZone, lunar, leapMonth }) => {
      const [day, month, year] = solar;
      const solarDate = new SolarDate(day, month, year);
      const lunarDate = solarDate.toLunarDate(timeZone);
      expect(lunarDate.toArray()).toEqual(lunar);
      expect(lunarDate.isLeapMonth).toEqual(leapMonth);
    });
  });
});
