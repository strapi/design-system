import { getVariantColorName } from '../utils';

describe('utils', () => {
  describe('getVariantsColorName', () => {
    it('should return primary for the default and secondary', () => {
      expect(getVariantColorName('default')).toEqual('primary');
      expect(getVariantColorName('secondary')).toEqual('primary');
    });

    it('should return the right color name for light variants', () => {
      expect(getVariantColorName('success-light')).toEqual('success');
      expect(getVariantColorName('danger-light')).toEqual('danger');
    });

    it('should return primary by default', () => {
      expect(getVariantColorName('unknown')).toEqual('primary');
    });
  });
});
