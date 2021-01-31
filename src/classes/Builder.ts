/* eslint-disable no-underscore-dangle */
export class Builder<Props, K extends keyof Props> {
  private readonly _instance: Props;

  constructor() {
    this._instance = {} as Props;
  }

  set(key: K, value: Props[K]) {
    Object.assign(this._instance[key], value);
  }

  build() {
    return this._instance;
  }
}
