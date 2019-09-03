import Astronomy from '../Astronomy';

const FIXTURES = [
  { order: -1000, julianDays: 2385490, sunLong: 11 },
  { order: -10, julianDays: 2414726, sunLong: 11 },
  { order: -2, julianDays: 2414962, sunLong: 7 },
  { order: -4, julianDays: 2414903, sunLong: 5 },
  { order: 0, julianDays: 2415021, sunLong: 9 },
  { order: 1, julianDays: 2415051, sunLong: 10 },
  { order: 30, julianDays: 2415907, sunLong: 2 },
  { order: 5, julianDays: 2415168, sunLong: 2 },
  { order: 1000, julianDays: 2444552, sunLong: 7 },
];

const LUNAR_MOONS = [
  { year: -4000, lunarMonth11: 260410, leapMonthOffset: 13 },
  { year: -10, lunarMonth11: 1717745, leapMonthOffset: 9 },
  { year: -1, lunarMonth11: 1721023, leapMonthOffset: 4 },
  { year: 0, lunarMonth11: 1721406, leapMonthOffset: 13 },
  { year: 1, lunarMonth11: 1721760, leapMonthOffset: 9 },
  { year: 1582, lunarMonth11: 2299202, leapMonthOffset: 5 },
  { year: 1975, lunarMonth11: 2442750, leapMonthOffset: 10 },
  { year: 2000, lunarMonth11: 2451875, leapMonthOffset: 6 },
  { year: 2019, lunarMonth11: 2458814, leapMonthOffset: 6 },
];

describe('Astronomy', () => {
  const astronomy = new Astronomy(7); // Astronomy setup for UTC+07:00

  it('should compute new moon days correctly', () => {
    FIXTURES.forEach(({ order, julianDays }) => {
      expect(astronomy.getNewMoonDay(order)).toEqual(julianDays);
    });
  });

  it('should compute sun longitudes correctly', () => {
    FIXTURES.forEach(({ julianDays, sunLong }) => {
      expect(astronomy.getSunLongitude(julianDays)).toEqual(sunLong);
    });
  });

  it('should compute 11th lunar months correctly', () => {
    LUNAR_MOONS.forEach(({ year, lunarMonth11 }) => {
      expect(astronomy.getLunarMonth11(year)).toEqual(lunarMonth11);
    });
  });

  it('should compute leap month offsets correctly', () => {
    LUNAR_MOONS.forEach(({ lunarMonth11, leapMonthOffset }) => {
      expect(astronomy.getLeapMonthOffset(lunarMonth11)).toEqual(leapMonthOffset);
    });
  });
});
