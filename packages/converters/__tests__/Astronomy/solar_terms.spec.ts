import Astronomy from '../../src/Astronomy';
import SolarDate from '../../src/SolarDate';

// Fixtures
import solarTermFixtures from '../fixtures/astronomy/solar_terms.json';

describe('Astronomy', () => {
  describe('solar terms', () => {
    const astronomy = new Astronomy({ timeZone: 7 }); // Astronomy setup for UTC+07:00

    it('should calculate solar terms correctly', () => {
      solarTermFixtures.forEach(({ solarDate, solarTerm }) => {
        const term = astronomy.getSolarTerm(new SolarDate(solarDate).toJulianDays());
        expect(term).toEqual(solarTerm);
      });
    });
  });
});
