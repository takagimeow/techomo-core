import * as common from 'src/common';
import xss from 'xss';
import { BODY_LENGTH_MAX } from 'src/constants';

import { Base } from './Base';

export interface Memo extends Base {
  body?: string;
}

export class Memo extends Base {
  body?: string;

  constructor(props?: Memo) {
    super(props);

    this.body = common.has(props, 'body');
  }

  editBody(body: string): this & Exclude<Pick<Memo, 'body'>, undefined> {
    if (body.length > BODY_LENGTH_MAX) return this;
    const newBody = xss(body);

    return Object.assign(this, { body: newBody });
  }
}
