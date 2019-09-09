import Astronomy from '../src/Astronomy';
import SolarDate from '../src/SolarDate';

// Fixtures
import lunarMonthFixtures from './fixtures/astronomy/lunar_months.json';
import newMoonFixtures from './fixtures/astronomy/new_moons.json';
import solarTermFixtures from './fixtures/astronomy/solar_terms.json';

describe('Astronomy', () => {
  const astronomy = new Astronomy({ timeZone: 7 }); // Astronomy setup for UTC+07:00

  it('should compute new moon days correctly', () => {
    newMoonFixtures.forEach(({ order, julianDays }) => {
      expect(astronomy.getNewMoonDay(order)).toEqual(julianDays);
    });
  });

  it('should compute sun longitude at mid nights correctly', () => {
    newMoonFixtures.forEach(({ julianDays, sunLong }) => {
      expect(astronomy.getSunLongitudeMidNight(julianDays)).toEqual(sunLong);
    });
  });

  it('should compute sun longitute for solar terms correctly', () => {
    solarTermFixtures.forEach(({ solarDate, sunLong }) => {
      const longitute = astronomy.getSunLongitudeSolarTerm(new SolarDate(solarDate).toJulianDays());
      expect(longitute).toEqual(sunLong);
    });
  });

  it('should compute 11th lunar months correctly', () => {
    lunarMonthFixtures.forEach(({ year, lunarMonth11 }) => {
      expect(astronomy.getLunarMonth11(year)).toEqual(lunarMonth11);
    });
  });

  it('should compute leap month offsets correctly', () => {
    lunarMonthFixtures.forEach(({ lunarMonth11, leapMonthOffset }) => {
      expect(astronomy.getLeapMonthOffset(lunarMonth11)).toEqual(leapMonthOffset);
    });
  });
});
