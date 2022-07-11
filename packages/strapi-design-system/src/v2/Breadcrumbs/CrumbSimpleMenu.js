import PropTypes from 'prop-types';

import { SimpleMenu } from '../SimpleMenu';

export const CrumbSimpleMenu = ({ children }) => children;

CrumbSimpleMenu.displayName = 'CrumbSimpleMenu';

CrumbSimpleMenu.propTypes = {
  children: PropTypes.shape({ type: PropTypes.oneOf([SimpleMenu]) }),
};
