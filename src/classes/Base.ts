import xss from 'xss';
import * as common from 'src/common';

import { NAME_LENGTH_MAX } from 'src/constants';

export interface Base {
  id?: string;
  groupId?: string;
  index?: number;
  name?: string;
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class Base {
  id?: string;

  groupId?: string;

  index?: number;

  name?: string;

  color?: string;

  createdAt?: Date;

  updatedAt?: Date;

  constructor(props?: Base) {
    this.id = common.has(props, 'id');
    this.groupId = common.has(props, 'groupId');
    this.index = common.has(props, 'index');
    this.name = common.has(props, 'name');
    this.color = common.has(props, 'color');

    const createdAt = new Date();
    this.createdAt = createdAt;
    this.updatedAt = createdAt;
  }

  get<T extends keyof this>(key: T) {
    return common.has(this, key);
  }

  editId(id: string): this & Exclude<Pick<this, 'id'>, undefined> {
    return Object.assign(this, { id });
  }

  editGroupId(groupId: string): this & Exclude<Pick<this, 'groupId'>, undefined> {
    return Object.assign(this, { groupId });
  }

  editName(name: string): this & Exclude<Pick<this, 'name'>, undefined> {
    if (name.length > NAME_LENGTH_MAX) return this;
    const newName = xss(name);
    return Object.assign(this, { name: newName });
  }

  editColor(color: string): this & Exclude<Pick<this, 'color'>, undefined> {
    const regexp = new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$');
    if (regexp.exec(color)) {
      return Object.assign(this, { color });
    }
    return this;
  }

  updateUpdatedAt(updatedAt: Date): this & Exclude<Pick<this, 'updatedAt'>, undefined> {
    return Object.assign(this, { updatedAt });
  }
}
