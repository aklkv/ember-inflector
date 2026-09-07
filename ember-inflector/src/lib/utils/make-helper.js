import Helper from '@ember/component/helper';

export default function makeHelper(helperFunction) {
  return Helper.helper(helperFunction);
}
