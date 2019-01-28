import { URL } from '../configs/consts';
import HttpClient, { HttpOptions } from '../lib/http';
import { Entity } from './entity';

export default class Base<T extends Entity> extends HttpClient {

  constructor(options: HttpOptions) {
    super({
      ...{baseURI: URL},
      ...options
    });
  }

}
