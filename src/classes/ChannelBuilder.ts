/* eslint-disable no-underscore-dangle */
import lowmemos from 'src/lowmemos';
import { Channel } from './Channel';
import { Memo } from './Memo';

export class ChannelBuilder {
  protected _channel: Channel;

  constructor() {
    this._channel = new Channel();
  }

  id(id: Channel[keyof Pick<Channel, 'id'>]) {
    this._channel = Object.assign(this._channel, { id });
    return this;
  }

  workspaceId(workspaceId: Channel[keyof Pick<Channel, 'workspaceId'>]) {
    this._channel = Object.assign(this._channel, { workspaceId });
    return this;
  }

  index(index: Channel[keyof Pick<Channel, 'index'>]) {
    this._channel = Object.assign(this._channel, { index });
    return this;
  }

  name(name: Channel[keyof Pick<Channel, 'name'>]) {
    this._channel = Object.assign(this._channel, { name });
    return this;
  }

  bookmarks(bookmarks: Channel[keyof Pick<Channel, 'bookmarks'>]) {
    this._channel = Object.assign(this._channel, { bookmarks });
    return this;
  }

  color(color: Channel[keyof Pick<Channel, 'color'>]) {
    this._channel = Object.assign(this._channel, { color });
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
