import * as yup from 'yup';
import { get } from 'lodash';

const getYupInnerErrors = (error) => {
  return get(error, 'inner', []).reduce((acc, curr) => {
    acc[curr.path.split('[').join('.').split(']').join('')] = curr.message;

    return acc;
  }, {});
};

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email(),
  description: yup.string().min(20),
  enum: yup.string().required(),
  private: yup.boolean(),
  date: yup.date(),
});

export default schema;
export { getYupInnerErrors };
