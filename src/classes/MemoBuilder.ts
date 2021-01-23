/* eslint-disable no-underscore-dangle */
import { Memo } from './Memo';

export class MemoBuilder {
  protected _memo: Memo;

  constructor() {
    this._memo = new Memo();
  }

  id(id: Exclude<Memo[keyof Pick<Memo, 'id'>], undefined>) {
    this._memo = Object.assign(this._memo, { id });
    return this;
  }

  channelId(channelId: Exclude<Memo[keyof Pick<Memo, 'channelId'>], undefined>) {
    this._memo = Object.assign(this._memo, { channelId });
    return this;
  }

  index(index: Exclude<Memo[keyof Pick<Memo, 'index'>], undefined>) {
    this._memo = Object.assign(this._memo, { index });
    return this;
  }

  title(title: Exclude<Memo[keyof Pick<Memo, 'title'>], undefined>) {
    this._memo = Object.assign(this._memo, { title: '' });
    this._memo.editTitle(title);
    return this;
  }

  body(body: Exclude<Memo[keyof Pick<Memo, 'body'>], undefined>) {
    this._memo = Object.assign(this._memo, { body: '' });
    this._memo.editBody(body);
    return this;
  }

  build() {
    return this._memo;
  }
}
