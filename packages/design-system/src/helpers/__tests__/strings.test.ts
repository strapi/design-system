import * as StringHelpers from '../strings';

describe('String helpers', () => {
  describe('stripReactIdOfColon', () => {
    it('should remove all colons from a string', () => {
      expect(StringHelpers.stripReactIdOfColon(':r18:')).toEqual('r18');
    });

    it('should remove all colons from a string', () => {
      expect(StringHelpers.stripReactIdOfColon(':r1:8:')).toEqual('r18');
    });

    it('should return the same string assuming there are no colons in the passed string', () => {
      expect(StringHelpers.stripReactIdOfColon('r18')).toEqual('r18');
    });
  });
});
