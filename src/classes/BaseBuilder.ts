/* eslint-disable no-underscore-dangle */
import { Base } from './Base';

export abstract class BaseBuilder {
  protected _base: Base;

  constructor(instance: Base) {
    this._base = instance;
  }

  id(id: Exclude<Base[keyof Pick<Base, 'id'>], undefined>) {
    this._base = Object.assign(this._base, { id });
    return this;
  }

  groupId(groupId: Exclude<Base[keyof Pick<Base, 'groupId'>], undefined>) {
    this._base = Object.assign(this._base, { groupId });
    return this;
  }

  index(index: Exclude<Base[keyof Pick<Base, 'index'>], undefined>) {
    this._base = Object.assign(this._base, { index });
    return this;
  }

  name(name: Exclude<Base[keyof Pick<Base, 'name'>], undefined>) {
    this._base = Object.assign(this._base, { name: '' });
    this._base.editName(name);
    return this;
  }

  color(color: Exclude<Base[keyof Pick<Base, 'color'>], undefined>) {
    this._base = Object.assign(this._base, { color: '#000000' });
    if (color !== '') {
      this._base.editColor(color);
    }
    return this;
  }

  build() {
    return this._base;
  }
}
