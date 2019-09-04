import SolarDate from '../src/SolarDate';
import { Sexagenary, Locales } from '../src/Sexagenary';

// Fixtures
import sexagenaryFixtures from './fixtures/sexagenaries.json';

describe('Sexagenary', () => {
  const sexagenaryDateTimes = sexagenaryFixtures.map(({ solarDate, timeZone, solarTime }) => {
    const solar = new SolarDate(solarDate[0], solarDate[1], solarDate[2]);
    return solar.toSexagenaryDateTime(timeZone, solarTime);
  });

  it('should handle invalid values correctly', () => {
    const sexagenary = new Sexagenary({ stem: 0, branch: 0 });
    expect(sexagenary.toString('undefined_locale' as Locales)).toEqual('');
  });

  it('should be converted from solar dates correctly', () => {
    sexagenaryDateTimes.forEach((sexagenaryDateTime, index) => {
      const { hour, day, month, year } = sexagenaryDateTime.toObject();
      const { sexagenaries } = sexagenaryFixtures[index];

      expect(hour.toString()).toEqual(sexagenaries.default.hour);
      expect(day.toString()).toEqual(sexagenaries.default.day);
      expect(month.toString()).toEqual(sexagenaries.default.month);
      expect(year.toString()).toEqual(sexagenaries.default.year);
    });
  });

  it('should produce Korean localed strings correctly', () => {
    sexagenaryDateTimes.forEach((sexagenaryDateTime, index) => {
      const { hour, day, month, year } = sexagenaryDateTime.toObject();
      const { sexagenaries } = sexagenaryFixtures[index];

      expect(hour.toString(Locales.Ko)).toEqual(sexagenaries.ko.hour);
      expect(day.toString(Locales.Ko)).toEqual(sexagenaries.ko.day);
      expect(month.toString(Locales.Ko)).toEqual(sexagenaries.ko.month);
      expect(year.toString(Locales.Ko)).toEqual(sexagenaries.ko.year);
    });
  });

  it('should produce Vietnamese localed strings correctly', () => {
    sexagenaryDateTimes.forEach((sexagenaryDateTime, index) => {
      const { hour, day, month, year } = sexagenaryDateTime.toObject();
      const { sexagenaries } = sexagenaryFixtures[index];

      expect(hour.toString(Locales.Vi)).toEqual(sexagenaries.vi.hour);
      expect(day.toString(Locales.Vi)).toEqual(sexagenaries.vi.day);
      expect(month.toString(Locales.Vi)).toEqual(sexagenaries.vi.month);
      expect(year.toString(Locales.Vi)).toEqual(sexagenaries.vi.year);
    });
  });

  it('should produce Chinses localed strings correctly', () => {
    sexagenaryDateTimes.forEach((sexagenaryDateTime, index) => {
      const { hour, day, month, year } = sexagenaryDateTime.toObject();
      const { sexagenaries } = sexagenaryFixtures[index];

      expect(hour.toString(Locales.Zh)).toEqual(sexagenaries.zh.hour);
      expect(day.toString(Locales.Zh)).toEqual(sexagenaries.zh.day);
      expect(month.toString(Locales.Zh)).toEqual(sexagenaries.zh.month);
      expect(year.toString(Locales.Zh)).toEqual(sexagenaries.zh.year);
    });
  });
});
