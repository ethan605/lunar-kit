import LunarDate from '../../src/LunarDate';
import SolarDate from '../../src/SolarDate';
import { Sexagenary } from '../../src/Sexagenary';
import { Locales } from '../../src/utils';

// Fixtures
import fixtures from '../fixtures/sexagenaries/locales.json';

describe('Sexagenary', () => {
  describe('locales', () => {
    const sexagenaryDateTimes = fixtures.map(({ solarDate, timeZone }) => {
      const [day, month, year] = solarDate;
      const solar = new SolarDate({ day, month, year });
      return solar.toSexagenaryDate({ timeZone });
    });

    it('should handle invalid values correctly', () => {
      const sexagenary = new Sexagenary({ stem: 0, branch: 0 });
      expect(sexagenary.toString('undefined_locale' as Locales)).toEqual('');
    });

    it('should be converted from solar dates correctly', () => {
      sexagenaryDateTimes.forEach((sexagenaryDateTime, index) => {
        const { sexagenaries } = fixtures[index];
        expect(sexagenaryDateTime.toStringsObject()).toEqual(sexagenaries.default);

        const { startHour, day, month, year } = sexagenaryDateTime;
        expect(startHour.toString()).toEqual(sexagenaries.default.startHour);
        expect(day.toString()).toEqual(sexagenaries.default.day);
        expect(month.toString()).toEqual(sexagenaries.default.month);
        expect(year.toString()).toEqual(sexagenaries.default.year);
      });
    });

    it('should be converted from lunar dates correctly', () => {
      fixtures.forEach(({ lunarDate, lunarLeap, timeZone, sexagenaries }) => {
        const [day, month, year] = lunarDate;
        const lunar = new LunarDate({ day, month, year, isLeapMonth: lunarLeap });
        const sexagenaryDateTime = lunar.toSexagenaryDate({ timeZone });
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
});
