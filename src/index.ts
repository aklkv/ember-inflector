import { Inflector, pluralize, singularize } from './lib/system.ts';

export default Inflector;

export { pluralize, singularize };

export type {
  InflectionRule,
  IrregularPair,
  PluralizeOptions,
  Rules,
  RuleSet,
} from './lib/system/inflector.ts';
