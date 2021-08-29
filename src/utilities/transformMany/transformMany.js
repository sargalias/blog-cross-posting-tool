import { reduce } from 'ramda';
import transform from '../transform/transform.js';

const transformMany = reduce(transform);

export default transformMany;
