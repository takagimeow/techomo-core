/* eslint-disable no-underscore-dangle */
import { Memo } from './Memo';

export class MemoBuilder {
  protected _memo: Memo;

  constructor() {
    this._memo = new Memo();
  }

  id(id: Memo[keyof Pick<Memo, 'id'>]) {
    this._memo = Object.assign(this._memo, { id });
    return this;
  }

  channelID(channelID: Memo[keyof Pick<Memo, 'channelID'>]) {
    this._memo = Object.assign(this._memo, { channelID });
    return this;
  }

  index(index: Memo[keyof Pick<Memo, 'index'>]) {
    this._memo = Object.assign(this._memo, { index });
    return this;
  }

  title(title: Memo[keyof Pick<Memo, 'title'>]) {
    this._memo = Object.assign(this._memo, { title });
    return this;
  }

  body(body: Memo[keyof Pick<Memo, 'body'>]) {
    this._memo = Object.assign(this._memo, { body });
    return this;
  }

  build() {
    return this._memo;
  }
}
