import lodash from 'lodash';
import * as common from 'src/common';
// import lowmemos from 'src/lowmemos';
import { Memo } from './Memo';

type Memos = lodash.CollectionChain<Memo>;

export interface Channel {
  id?: string;
  workspaceId?: string;
  index?: number;
  name?: string;
  memos?: Memos;
  bookmarks?: string[];
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Channel {
  id?: string;

  workspaceId?: string;

  index?: number;

  name?: string;

  memos?: Memos;

  bookmarks?: string[];

  color?: string;

  createdAt?: Date;

  updatedAt?: Date;

  constructor(props?: Channel) {
    const createdAt = new Date();

    this.id = common.has(props, 'id');
    this.workspaceId = common.has(props, 'workspaceId');
    this.index = common.has(props, 'index');
    this.name = common.has(props, 'name');
    this.memos = common.has(props, 'memos');
    this.bookmarks = common.has(props, 'bookmarks');
    this.color = common.has(props, 'color');
    this.createdAt = createdAt;
    this.updatedAt = createdAt;
  }

  get<T extends keyof Channel>(key: T) {
    return common.has(this, key);
  }

  editId(id: string): this & Pick<Channel, 'id'> {
    return Object.assign(this, { id });
  }

  editWorkspaceId(workspaceId: string): this & Pick<Channel, 'workspaceId'> {
    return Object.assign(this, { workspaceId });
  }

  editName(name: string): this & Pick<Channel, 'name'> {
    return Object.assign(this, { name });
  }

  editColor(color: string): this & Pick<Channel, 'color'> {
    return Object.assign(this, { color });
  }

  updateUpdatedAt(updatedAt: Date): this & Pick<Channel, 'updatedAt'> {
    return Object.assign(this, { updatedAt });
  }

  length() {
    if (common.has(this, 'memos')) {
      return this.memos?.value.length;
    }

    return -1;
  }

  push(memo: Memo) {
    if (common.has(this, 'memos')) {
      this.memos?.value.push(memo);
      /*
      const memos = this.memos?.value as Memo[];
      memos.push(memo);
      return Object.assign(this, { memos: lowmemos(memos) });
      */
    }

    return this;
  }

  swap(id: string, index: number) {
    if (common.has(this, 'memos')) {
      const memos = this.memos as Memos;
      const max = memos.value.length - 1;
      if (max < index) {
        return this;
      }

      const foundIndex = memos.findIndex({ id }).value();
      if (foundIndex < 0) {
        return this;
      }
      const targetMemo = memos.value[foundIndex];
      const tmpMemo = memos.value[index];
      memos.value[index] = targetMemo;
      memos.value[foundIndex] = tmpMemo;
      this.memos = memos;
    }

    return this;
  }

  allocate(id: string) {
    if (common.has(this, 'memos')) {
      const memos = this.memos as Memos;
      const foundIndex = memos.findIndex({ id }).value();
      if (foundIndex < 0) {
        return this;
      }
      memos.value[foundIndex].index = foundIndex;
      this.memos = memos;
    }
    return this;
  }

  allocateAll() {
    if (common.has(this, 'memos')) {
      const memos = this.memos as Memos;
      for (let i = 0; i < memos.value.length; i += 1) {
        const memoId = memos.value[i].id as string;
        this.allocate(memoId);
      }
    }
    return this;
  }

  delete(id: string) {
    if (common.has(this, 'memos')) {
      const memos = this.memos as Memos;

      const foundIndex = memos.findIndex({ id }).value();
      if (foundIndex < 0) {
        return this;
      }
      memos.value.splice(foundIndex, foundIndex + 1);
      this.memos = memos;
    }

    return this;
  }
}
