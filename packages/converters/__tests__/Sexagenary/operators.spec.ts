import { Sexagenary } from '../../src/Sexagenary';

// Fixtures
import fixtures from '../fixtures/sexagenaries/operators.json';

describe('Sexagenary - operators', () => {
  it('should always create new instance', () => {
    const [{ input }] = fixtures;
    const sexagenary = new Sexagenary(input);
    const otherSexagenary = sexagenary;
    expect(otherSexagenary).toBe(sexagenary);
    expect(sexagenary.add(1)).not.toBe(sexagenary);
  });

  it('should add/subtract correctly', () => {
    fixtures.forEach(({ add, input, output }) => {
      const sexagenary = new Sexagenary(input);
      expect(sexagenary.add(add).toObject()).toEqual(output);
    });
  });
});
