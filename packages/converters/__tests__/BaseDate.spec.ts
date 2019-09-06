import BaseDate from '../src/BaseDate';

describe('BaseDate', () => {
  const date = new BaseDate({ day: 3, month: 9, year: 2019 });

  it('should contruct correctly', () => {
    expect(date.day).toEqual(3);
    expect(date.month).toEqual(9);
    expect(date.year).toEqual(2019);
  });

  it('should be compared with other dates correctly', () => {
    const refDate = date;

    expect(date.compareDate(refDate)).toEqual(0);
    expect(date.compareDate({ day: 3, month: 9, year: 2019 })).toEqual(0);

    expect(date.compareDate({ day: 2, month: 9, year: 2019 })).toEqual(1);
    expect(date.compareDate({ day: 4, month: 9, year: 2019 })).toEqual(-1);

    expect(date.compareDate({ day: 3, month: 8, year: 2019 })).toEqual(1);
    expect(date.compareDate({ day: 3, month: 10, year: 2019 })).toEqual(-1);

    expect(date.compareDate({ day: 3, month: 9, year: 2000 })).toEqual(1);
    expect(date.compareDate({ day: 3, month: 9, year: 2025 })).toEqual(-1);
  });
});
