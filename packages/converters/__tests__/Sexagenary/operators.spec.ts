import { Sexagenary } from '../../src/Sexagenary';

// Fixtures
import fixtures from '../fixtures/sexagenaries/operators.json';

describe('Sexagenary - operators', () => {
  describe('.add()', () => {
    it('should always create new instance', () => {
      const { input } = fixtures[0]; // Test on first fixture only
      const sexagenary = new Sexagenary(input);

      expect(sexagenary.add(0)).not.toBe(sexagenary);
      expect(sexagenary.add(1)).not.toBe(sexagenary);
    });

    it('should calculate correctly', () => {
      fixtures.forEach(({ add, input, output }) => {
        const sexagenary = new Sexagenary(input);
        if (add != null) expect(sexagenary.add(add)).toEqual(output);
      });
    });
  });
});
