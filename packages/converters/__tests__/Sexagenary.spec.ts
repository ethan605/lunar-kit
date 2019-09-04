import SolarDate from '../src/SolarDate';
import { Sexagenary } from '../src/Sexagenary';

// Fixtures
import sexagenaryFixtures from './fixtures/sexagenaries.json';

describe('Sexagenary', () => {
  it('should handle invalid values correctly', () => {
    const sexagenary = new Sexagenary({ stem: 0, branch: 0 });
    expect(sexagenary.toString('undefined_locale')).toEqual('');
  });

  it('should be converted from solar dates correctly', () => {
    sexagenaryFixtures.forEach(({ solarDate, timeZone, solarTime, sexagenaries }) => {
      const solar = new SolarDate(solarDate[0], solarDate[1], solarDate[2]);
      const { hour, day, month, year } = solar.toSexagenaries(timeZone, solarTime);

      expect(hour.toString()).toEqual(sexagenaries.default.hour);
      expect(day.toString()).toEqual(sexagenaries.default.day);
      expect(month.toString()).toEqual(sexagenaries.default.month);
      expect(year.toString()).toEqual(sexagenaries.default.year);

      ['ko', 'vi', 'zh'].forEach(locale => {
        expect(hour.toString(locale)).toEqual(sexagenaries[locale].hour);
        expect(day.toString(locale)).toEqual(sexagenaries[locale].day);
        expect(month.toString(locale)).toEqual(sexagenaries[locale].month);
        expect(year.toString(locale)).toEqual(sexagenaries[locale].year);
      });
    });
  });
});
