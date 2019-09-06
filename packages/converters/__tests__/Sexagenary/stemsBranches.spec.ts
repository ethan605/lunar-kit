import SolarDate from '../../src/SolarDate';

// Fixtures
import fixtures from '../fixtures/sexagenaries/stems_branches.json';

describe('Sexagenary - stems & branches', () => {
  it('should produce correct stem-branch pairs', () => {
    fixtures.forEach(({ solarDate, timeZone, sexagenaries }) => {
      const solar = new SolarDate({ day: solarDate[0], month: solarDate[1], year: solarDate[2] });
      const sexagenaryDate = solar.toSexagenaryDate({ timeZone });

      expect(sexagenaryDate).toEqual(sexagenaries);
    });
  });
});
