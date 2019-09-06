import SolarDate from '../../src/SolarDate';

// Fixtures
import fixtures from '../fixtures/sexagenaries/stems_branches.json';

describe('Sexagenary - stems & branches', () => {
  it('should produce correct stem-branch pairs', () => {
    fixtures.forEach(({ solarDate, timeZone, sexagenaries }) => {
      const [day, month, year] = solarDate;
      const solar = new SolarDate({ day, month, year });
      const sexagenaryDate = solar.toSexagenaryDate({ timeZone });

      expect(sexagenaryDate).toEqual(sexagenaries);
    });
  });
});
