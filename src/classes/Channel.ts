import lodash from 'lodash';
import * as common from 'src/common';
// import lowmemos from 'src/lowmemos';
import { Base } from './Base';
import { Memo } from './Memo';

export type Memos = lodash.CollectionChain<Memo>;

export const NAME_LENGTH_MAX = 140;

export interface Channel {
  memos?: Memos;
  bookmarks?: string[];
}

export class Channel extends Base {
  memos?: Memos;

  bookmarks?: string[];

  constructor(props?: Channel) {
    super(props);

    this.memos = common.has(props, 'memos');
    this.bookmarks = common.has(props, 'bookmarks');
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
      this.allocateAll();
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
      this.allocateAll();
    }

    return this;
  }

  bookmark(memoId: string) {
    if (common.has(this, 'memos') && common.has(this, 'bookmarks')) {
      const memos = this.memos as Memos;
      const foundIndex = memos.findIndex({ id: memoId }).value();
      if (foundIndex < 0) {
        return this;
      }
      this.bookmarks?.push(memoId);
    }
    return this;
  }

  unbookmark(memoId: string) {
    if (common.has(this, 'memos') && common.has(this, 'bookmarks')) {
      const bookmarks = this.bookmarks as string[];
      let foundIndex = -1;
      for (let i = 0; i < bookmarks.length; i += 1) {
        if (bookmarks[i] === memoId) {
          foundIndex = i;
          break;
        }
      }
      if (foundIndex < 0) {
        return this;
      }
      bookmarks.splice(foundIndex, foundIndex + 1);
      this.bookmarks = bookmarks;
    }

    return this;
  }

  getBookmarks() {
    if (common.has(this, 'memos') && common.has(this, 'bookmarks')) {
      const memos = this.memos as Memos;
      const bookmarks = this.bookmarks as string[];
      const bookmarkedMemos = bookmarks.map((memoId) => {
        const foundIndex = memos.findIndex({ id: memoId }).value();
        if (foundIndex < 0) {
          return null;
        }
        return memos.value[foundIndex];
      });

      return lodash.compact(bookmarkedMemos);
    }
    return [];
  }

  allocate(id: string) {
    if (common.has(this, 'memos')) {
      const memos = this.memos as Memos;
      const foundIndex = memos.findIndex({ id }).value();
      if (foundIndex < 0) {
        return this;
      }
      memos.value[foundIndex].index = foundIndex;
      memos.value[foundIndex].groupId = this.id;
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
      memos.value.splice(foundIndex, 1);
      this.memos = memos;
    }

    return this;
  }
}
