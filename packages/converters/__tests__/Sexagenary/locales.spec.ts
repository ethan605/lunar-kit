import LunarDate from '../../src/LunarDate';
import SolarDate from '../../src/SolarDate';
import { Sexagenary, Locales } from '../../src/Sexagenary';

// Fixtures
import fixtures from '../fixtures/sexagenaries/locales.json';

describe('Sexagenary - locales', () => {
  const sexagenaryDateTimes = fixtures.map(({ solarDate, timeZone, solarTime }) => {
    const solar = new SolarDate(solarDate[0], solarDate[1], solarDate[2]);
    return solar.toSexagenaryDateTime(timeZone, solarTime);
  });

  it('should handle invalid values correctly', () => {
    const sexagenary = new Sexagenary({ stem: 0, branch: 0 });
    expect(sexagenary.toString('undefined_locale' as Locales)).toEqual('');
  });

  it('should be converted from solar dates correctly', () => {
    sexagenaryDateTimes.forEach((sexagenaryDateTime, index) => {
      const { sexagenaries } = fixtures[index];
      expect(sexagenaryDateTime.toStringsObject()).toEqual(sexagenaries.default);

      const { hour, day, month, year } = sexagenaryDateTime.toObject();
      expect(hour.toString()).toEqual(sexagenaries.default.hour);
      expect(day.toString()).toEqual(sexagenaries.default.day);
      expect(month.toString()).toEqual(sexagenaries.default.month);
      expect(year.toString()).toEqual(sexagenaries.default.year);
    });
  });

  it('should be converted from lunar dates correctly', () => {
    fixtures.forEach(({ lunarDate, lunarLeap, solarTime, timeZone, sexagenaries }) => {
      const lunar = new LunarDate(lunarDate[0], lunarDate[1], lunarDate[2], lunarLeap);
      const sexagenaryDateTime = lunar.toSexagenaryDateTime(timeZone, solarTime);
      expect(sexagenaryDateTime.toStringsObject()).toEqual(sexagenaries.default);
    });
  });

  it('should produce Korean localed strings correctly', () => {
    sexagenaryDateTimes.forEach((sexagenaryDateTime, index) => {
      const { sexagenaries } = fixtures[index];
      expect(sexagenaryDateTime.toStringsObject(Locales.Ko)).toEqual(sexagenaries.ko);
    });
  });

  it('should produce Vietnamese localed strings correctly', () => {
    sexagenaryDateTimes.forEach((sexagenaryDateTime, index) => {
      const { sexagenaries } = fixtures[index];
      expect(sexagenaryDateTime.toStringsObject(Locales.Vi)).toEqual(sexagenaries.vi);
    });
  });

  it('should produce Chinses localed strings correctly', () => {
    sexagenaryDateTimes.forEach((sexagenaryDateTime, index) => {
      const { sexagenaries } = fixtures[index];
      expect(sexagenaryDateTime.toStringsObject(Locales.Zh)).toEqual(sexagenaries.zh);
    });
  });
});
