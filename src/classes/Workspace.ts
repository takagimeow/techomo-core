import lodash from 'lodash';
import * as common from 'src/common';
import { Base } from './Base';
import { Channel } from './Channel';

export type Channels = lodash.CollectionChain<Channel>;

export interface Workspace {
  channels?: Channels;
}

export class Workspace extends Base {
  channels?: Channels;

  constructor(props?: Workspace) {
    super(props);

    this.channels = common.has(props, 'channels');
  }

  length() {
    if (common.has(this, 'channels')) {
      return this.channels?.value.length;
    }

    return -1;
  }

  push(channel: Channel) {
    if (common.has(this, 'channels')) {
      this.channels?.value.push(channel);
      this.allocateAll();
    }

    return this;
  }

  allocate(id: string) {
    if (common.has(this, 'channels')) {
      const channels = this.channels as Channels;
      const foundIndex = channels.findIndex({ id }).value();
      if (foundIndex < 0) {
        return this;
      }
      channels.value[foundIndex].index = foundIndex;
      channels.value[foundIndex].groupId = this.id;
      this.channels = channels;
    }
    return this;
  }

  allocateAll() {
    if (common.has(this, 'channels')) {
      const channels = this.channels as Channels;
      for (let i = 0; i < channels.value.length; i += 1) {
        const channelId = channels.value[i].id as string;
        this.allocate(channelId);
      }
    }
    return this;
  }

  delete(id: string) {
    if (common.has(this, 'channels')) {
      const channels = this.channels as Channels;

      const foundIndex = channels.findIndex({ id }).value();
      if (foundIndex < 0) {
        return this;
      }
      channels.value.splice(foundIndex, 1);
      this.channels = channels;
    }

    return this;
  }
}
