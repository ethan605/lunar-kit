import SolarDate from '../src/SolarDate';

// Fixtures
import conversionFixtures from './fixtures/conversions.json';
import solarDateFixtures from './fixtures/solar_dates.json';

describe('SolarDate', () => {
  it('should convert to Julian days correctly', () => {
    solarDateFixtures.forEach(({ gregorianDate, julianDays }) => {
      const [day, month, year] = gregorianDate;
      const gDate = new SolarDate({ day, month, year });
      expect(gDate.toJulianDays()).toEqual(julianDays);
    });
  });

  it('should be parsed from Julian days correctly', () => {
    solarDateFixtures.forEach(({ gregorianDate, julianDays }) => {
      const [day, month, year] = gregorianDate;
      const gDate = SolarDate.fromJulianDays(julianDays);
      expect(gDate.isEqualDate({ day, month, year })).toBeTruthy();
    });
  });

  it('should convert to lunar dates correctly', () => {
    conversionFixtures.forEach(({ solar, timeZone, lunar, leapMonth }) => {
      const [day, month, year] = solar;
      const solarDate = new SolarDate({ day, month, year });
      const lunarDate = solarDate.toLunarDate(timeZone);
      expect(lunarDate.toArray()).toEqual(lunar);
      expect(lunarDate.isLeapMonth).toEqual(leapMonth);
    });
  });
});
