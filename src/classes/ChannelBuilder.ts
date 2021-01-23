/* eslint-disable no-underscore-dangle */
import lowmemos from 'src/lowmemos';
import { Channel } from './Channel';
import { Memo } from './Memo';

export class ChannelBuilder {
  protected _channel: Channel;

  constructor() {
    this._channel = new Channel();
  }

  id(id: Exclude<Channel[keyof Pick<Channel, 'id'>], undefined>) {
    this._channel = Object.assign(this._channel, { id });
    return this;
  }

  workspaceId(workspaceId: Exclude<Channel[keyof Pick<Channel, 'workspaceId'>], undefined>) {
    this._channel = Object.assign(this._channel, { workspaceId });
    return this;
  }

  index(index: Exclude<Channel[keyof Pick<Channel, 'index'>], undefined>) {
    this._channel = Object.assign(this._channel, { index });
    return this;
  }

  name(name: Exclude<Channel[keyof Pick<Channel, 'name'>], undefined>) {
    this._channel = Object.assign(this._channel, { name: '' });
    this._channel.editName(name);
    return this;
  }

  bookmarks(bookmarks: Exclude<Channel[keyof Pick<Channel, 'bookmarks'>], undefined>) {
    this._channel = Object.assign(this._channel, { bookmarks });
    return this;
  }

  color(color: Exclude<Channel[keyof Pick<Channel, 'color'>], undefined>) {
    this._channel = Object.assign(this._channel, { color: '#000000' });
    if (color !== '') {
      this._channel.editColor(color);
    }
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
