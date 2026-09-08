/* eslint-disable import/extensions */
import { pluralize } from 'ember-inflector';

/**
 *
 * If you have Ember Inflector (such as if Ember Data is present),
 * pluralize a word. For example, turn "ox" into "oxen".
 *
 * Example:
 *
 * {{pluralize count myProperty}}
 * {{pluralize 1 "oxen"}}
 * {{pluralize myProperty}}
 * {{pluralize "ox"}}
 *
 * @for Ember.HTMLBars.helpers
 * @method pluralize
 * @param {Number|Property} [count] count of objects
 * @param {String|Property} word word to pluralize
 */
export default function pluralizeHelper(...args) {
  // Named arguments arrive as a trailing object, and only when the template
  // actually passes some — unlike the old `(positional, named)` helper
  // signature, where `named` was always present. Positional arguments here are
  // only ever a count and a word, so a trailing object is unambiguous.
  const last = args[args.length - 1];
  const named = typeof last === 'object' && last !== null ? args.pop() : {};

  if (args.length === 2) {
    args.push({ withoutCount: named['without-count'] });
  }

  return pluralize(...args);
}
