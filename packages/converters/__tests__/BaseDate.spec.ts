import BaseDate from '../src/BaseDate';

describe('BaseDate', () => {
  it('should be compared with other dates correctly', () => {
    expect(new BaseDate(3, 9, 2019).compareDate(3, 9, 2019)).toEqual(0);
    expect(new BaseDate(3, 9, 2019).compareDate(2, 9, 2019)).toEqual(1);
    expect(new BaseDate(3, 9, 2019).compareDate(4, 9, 2019)).toEqual(-1);

    expect(new BaseDate(16, 10, 2000).compareDate(16, 11, 2000)).toEqual(-1);
    expect(new BaseDate(16, 10, 2000).compareDate(16, 9, 2000)).toEqual(1);

    expect(new BaseDate(30, 5, 1975).compareDate(30, 5, 1976)).toEqual(-1);
    expect(new BaseDate(30, 5, 1975).compareDate(30, 5, 1974)).toEqual(1);
  });
});
