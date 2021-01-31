import lodash from 'lodash';
import { Memo } from 'src/classes/Memo';

declare module 'lodash' {
  interface CollectionChain<T> {
    value: T[];
    _: lodash.LoDashStatic;
    read(path: string): T;
  }
}

export default function lowmemos(defaultValue: Memo[]) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _ = lodash.runInContext();
  const memos = _.chain(defaultValue);
  memos.value = defaultValue;

  memos.mixin({
    length: () => memos.value.length,
    read: () => console.log('memos: ', memos),
  });

  memos._ = _;

  return memos;
}
