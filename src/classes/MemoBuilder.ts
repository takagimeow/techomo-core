/* eslint-disable no-underscore-dangle */
import { Memo } from './Memo';
import { BaseBuilder } from './BaseBuilder';

export class MemoBuilder extends BaseBuilder {
  protected _base: Memo;

  constructor() {
    const memo = new Memo();
    super(memo);
    this._base = memo;
  }

  body(body: Exclude<Memo[keyof Pick<Memo, 'body'>], undefined>) {
    this._base = Object.assign(this._base, { body: '' });
    this._base.editBody(body);
    return this;
  }

  build() {
    return this._base;
  }
}
