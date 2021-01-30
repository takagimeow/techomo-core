/* eslint-disable no-underscore-dangle */
import lowmemos from 'src/lowmemos';
import { Channel } from './Channel';
import { Memo } from './Memo';
import { BaseBuilder } from './BaseBuilder';

export class ChannelBuilder extends BaseBuilder {
  protected _channel: Channel;

  constructor() {
    const channel = new Channel();
    super(channel);
    this._channel = channel;
  }

  bookmarks(bookmarks: Exclude<Channel[keyof Pick<Channel, 'bookmarks'>], undefined>) {
    this._channel = Object.assign(this._channel, { bookmarks });
    return this;
  }

  memos(memos: Memo[]) {
    this._channel = Object.assign(this._channel, { memos: lowmemos(memos) });
    return this;
  }

  build() {
    return this._channel;
  }
}
