/* eslint-disable no-underscore-dangle */
import lowchannels from 'src/lowchannels';
import { Workspace } from './Workspace';
import { Channel } from './Channel';
import { BaseBuilder } from './BaseBuilder';

export class WorkspaceBuilder extends BaseBuilder {
  protected _workspace: Workspace;

  constructor() {
    const workspace = new Workspace();
    super(workspace);
    this._workspace = workspace;
  }

  channels(channels: Channel[]) {
    this._workspace = Object.assign(this._workspace, { channels: lowchannels(channels) });
    return this;
  }

  build() {
    return this._workspace;
  }
}
