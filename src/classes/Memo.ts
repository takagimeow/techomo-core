import * as common from 'src/common';

export interface Memo {
  id?: string;
  channelId?: string;
  index?: number;
  title?: string;
  body?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/*
type memoIdType = Pick<Memo, 'id'>;
type memoChannelIdType = Pick<Memo, 'channelId'>;
type memoIndexType = Pick<Memo, 'index'>;
type memoTitleTYpe = Pick<Memo, 'title'>;
type memoBodyType = Pick<Memo, 'body'>;
type memoCreatedAtType = Pick<Memo, 'createdAt'>;
type memoUpdatedAtType = Pick<Memo, 'updateUpdatedAt'>;
*/

export class Memo {
  id?: string;

  channelId?: string;

  index?: number;

  title?: string;

  body?: string;

  createdAt?: Date;

  updatedAt?: Date;

  constructor(props?: Memo) {
    const createdAt = new Date();

    this.id = common.has(props, 'id');
    this.channelId = common.has(props, 'channelId');
    this.index = common.has(props, 'index');
    this.title = common.has(props, 'title');
    this.body = common.has(props, 'body');
    this.createdAt = createdAt;
    this.updatedAt = createdAt;
  }

  get<T extends keyof Memo>(key: T) {
    return common.has(this, key);
  }

  editId(id: string): this & Pick<Memo, 'id'> {
    return Object.assign(this, { id });
  }

  editChannelId(channelId: string): this & Pick<Memo, 'channelId'> {
    return Object.assign(this, { channelId });
  }

  editTitle(title: string): this & Pick<Memo, 'title'> {
    return Object.assign(this, { title });
  }

  editBody(body: string): this & Pick<Memo, 'body'> {
    return Object.assign(this, { body });
  }

  updateUpdatedAt(updatedAt: Date): this & Pick<Memo, 'updatedAt'> {
    return Object.assign(this, { updatedAt });
  }
}

/*
export interface Memo {
  id?: string;
  channelId?: string;
  index?: number;
  title?: string;
  body?: string;
  createdAt?: Date;
}

export class Memo {
  id?: string;

  channelId?: string;

  index?: number;

  title?: string;

  body?: string;

  createdAt?: Date;

  protected isBuilt: boolean = false;

  getId() {
    if ('id' in this && this.id) {
      return this.id;
    }
    return '';
  }

  getChannelId() {
    if ('channelId' in this && this.channelId) {
      return this.channelId;
    }

    return '';
  }

  getIndex() {
    if ('index' in this && typeof this.index === 'number') {
      return this.index;
    }

    return -1;
  }

  getTitle() {
    if ('title' in this && this.title) {
      return this.title;
    }

    return '';
  }

  getBody() {
    if ('body' in this && this.body) {
      return this.body;
    }
    return '';
  }

  getCreatedAt() {
    if ('createdAt' in this && this.createdAt) {
      return this.createdAt;
    }

    return null;
  }

  setId(id: string): this & Pick<Memo, 'id'> {
    return Object.assign(this, { id });
  }

  setChannelId(channelId: string): this & Pick<Memo, 'channelId'> {
    return Object.assign(this, { channelId });
  }

  setIndex(index: number): this & Pick<Memo, 'index'> {
    return Object.assign(this, { index });
  }

  setTitle(title: string): this & Pick<Memo, 'title'> {
    return Object.assign(this, { title });
  }

  setBody(body: string): this & Pick<Memo, 'body'> {
    return Object.assign(this, { body });
  }

  setCreatedAt(createdAt: Date): this & Pick<Memo, 'createdAt'> {
    return Object.assign(this, { createdAt });
  }

  build(): this {
    this.isBuilt = true;
    return this;
  }
}

export function MemoBuilder() {
  return new Memo();
}
*/
