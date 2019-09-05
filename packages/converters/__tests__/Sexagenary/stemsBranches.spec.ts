import SolarDate from '../../src/SolarDate';

// Fixtures
import fixtures from '../fixtures/sexagenaries/stems_branches.json';

describe('Sexagenary - stems & branches', () => {
  it('should produce correct stem-branch pairs', () => {
    fixtures.forEach(({ solarDate, timeZone, sexagenaries }) => {
      const solar = new SolarDate(solarDate[0], solarDate[1], solarDate[2]);
      const { startHour, day, month, year } = solar.toSexagenaryDate(timeZone).toObject();

      expect(startHour.toObject()).toEqual(sexagenaries.startHour);
      expect(day.toObject()).toEqual(sexagenaries.day);
      expect(month.toObject()).toEqual(sexagenaries.month);
      expect(year.toObject()).toEqual(sexagenaries.year);
    });
  });
});
