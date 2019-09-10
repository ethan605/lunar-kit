import { Astronomy } from '../../src/Astronomy';

// Fixtures
import lunarMonthFixtures from '../fixtures/astronomy/lunar_months.json';
import newMoonFixtures from '../fixtures/astronomy/new_moons.json';

describe('Astronomy', () => {
  describe('moon calculations', () => {
    const astronomy = new Astronomy({ timeZone: 7 }); // Astronomy setup for UTC+07:00

    it('should compute new moon days correctly', () => {
      newMoonFixtures.forEach(({ order, julianDays }) => {
        expect(astronomy.getNewMoonDay(order)).toEqual(julianDays);
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
});
