/* eslint-disable no-underscore-dangle */
import * as common from 'src/common';

export interface Memo {
  id?: string;
  channelID?: string;
  index?: number;
  title?: string;
  body?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Memo {
  id?: string;

  channelId?: string;

  index?: number;

  title?: string;

  body?: string;

  createdAt?: Date;

  constructor(props?: Memo) {
    const createdAt = new Date();

    this.id = common.has(props, 'id');
    this.channelID = common.has(props, 'channelID');
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

  editIndex(index: number): this & Pick<Memo, 'index'> {
    return Object.assign(this, { index });
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

export function MemoBuilder() {
  return new Memo();
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
