import Frisbee, { FrisbeeOptions, FrisbeeResponse } from './frisbee';

export interface HttpOptions extends FrisbeeOptions {

}

export interface HttpResponse<T> extends FrisbeeResponse {
  body: T;
}

export default class HttpClient extends Frisbee {

}
