import BaseDate from '../src/BaseDate';

describe('BaseDate', () => {
  it('should contruct correctly', () => {
    const date = new BaseDate({ day: 3, month: 9, year: 2019 });
    expect(date.day).toEqual(3);
    expect(date.month).toEqual(9);
    expect(date.year).toEqual(2019);
  });

  it('should be compared with other dates correctly', () => {
    expect(
      new BaseDate({ day: 3, month: 9, year: 2019 }).compareDate(new BaseDate({ day: 3, month: 9, year: 2019 }))
    ).toEqual(0);
    expect(new BaseDate({ day: 3, month: 9, year: 2019 }).compareDate({ day: 2, month: 9, year: 2019 })).toEqual(1);
    expect(new BaseDate({ day: 3, month: 9, year: 2019 }).compareDate({ day: 4, month: 9, year: 2019 })).toEqual(-1);

    expect(new BaseDate({ day: 16, month: 10, year: 2000 }).compareDate({ day: 16, month: 11, year: 2000 })).toEqual(
      -1
    );
    expect(new BaseDate({ day: 16, month: 10, year: 2000 }).compareDate({ day: 16, month: 9, year: 2000 })).toEqual(1);

    expect(new BaseDate({ day: 30, month: 5, year: 1975 }).compareDate({ day: 30, month: 5, year: 1976 })).toEqual(-1);
    expect(new BaseDate({ day: 30, month: 5, year: 1975 }).compareDate({ day: 30, month: 5, year: 1974 })).toEqual(1);
  });
});
