import lodash from 'lodash';
import { Channel } from 'src/classes/Channel';

declare module 'lodash' {
  interface CollectionChain<T> {
    value: T[];
    _: lodash.LoDashStatic;
    read(path: string): T;
  }
}

export default function lowchannels(defaultValue: Channel[]) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _ = lodash.runInContext();
  const channels = _.chain(defaultValue);
  channels.value = defaultValue;

  channels.mixin({
    length: () => channels.value.length,
    read: () => console.log('channels: ', channels),
  });

  channels._ = _;

  return channels;
}
