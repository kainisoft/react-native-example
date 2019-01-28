import qs from 'qs';
import urlJoin from 'url-join';
import { METHODS } from './consts';

// import Interceptor from './interceptor';

// const methods = ['get', 'head', 'post', 'put', 'del', 'options', 'patch'];

const respProperties = {
  readOnly: [
    'headers',
    'ok',
    'redirected',
    'status',
    'statusText',
    'type',
    'url',
    'bodyUsed'
  ],
  writable: ['useFinalURL'],
  callable: [
    'clone',
    'error',
    'redirect',
    'arrayBuffer',
    'blob',
    'formData',
    'json',
    'text'
  ]
};

export interface FrisbeeResponse extends Response {
  originalResponse: Response;
  body: any;
  status: number;
  err?: Error;
}

function createFrisbeeResponse(origResp: Response): FrisbeeResponse {
  // @ts-ignore
  const resp: FrisbeeResponse = {
    originalResponse: origResp
  };

  respProperties.readOnly.forEach(prop =>
    Object.defineProperty(resp, prop, {
      // @ts-ignore
      value: origResp[prop]
    })
  );

  respProperties.writable.forEach(prop =>
    Object.defineProperty(resp, prop, {
      get() {
        // @ts-ignore
        return origResp[prop];
      },
      set(value) {
        // @ts-ignore
        origResp[prop] = value;
      }
    })
  );

  let callable = null;
  respProperties.callable.forEach(prop => {
    Object.defineProperty(resp, prop, {
      // @ts-ignore
      value: ((callable = origResp[prop]),
      typeof callable === 'function' && callable.bind(origResp))
    });
  });

  const headersObj = {};
  origResp.headers.forEach((pair: string[]) => {
    // @ts-ignore
    headersObj[pair[0]] = pair[1]; // eslint-disable-line prefer-destructuring
  });
  Object.defineProperty(resp, 'headersObj', {
    value: headersObj
  });

  return resp;
}

export interface FrisbeeOptions {
  baseURI?: string;
  body?: {[key: string]: any};
  method?: string;
  parseErr?: Function;
  headers?: Headers;
  arrayFormat?: 'indices' | 'brackets' | 'repeat';
  auth?: string | string[];
  jwt?: string;
}

interface FrisbeeOptionsInit_ extends FrisbeeOptions {
  headers: Headers;
  body?: FormData;
  query?: string;
}

export default class Frisbee {
  protected options: FrisbeeOptionsInit_ = {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }),
    arrayFormat: 'indices'
  };

  constructor(options: FrisbeeOptions) {
    this.proceedOptions(options);
  }

  protected proceedOptions(options: FrisbeeOptions): void {
    if (options.headers) {
      const headers = this.sanitizeHeader(new Headers(options.headers));

      headers.forEach((value: string, key: string) => {
        this.options.headers.set(key, headers.get(key) as string);
      });

      delete options.headers
    }

    if (options.body) {
      if (options.method !== METHODS.GET && options.method !== METHODS.HEAD) {
        const formData = new FormData();

        Object.entries(options.body).forEach(([key, value]) => {
          formData.append(key, value);
        });

        this.options.headers.set('Content-Type', 'multipart/form-data');
        this.options.body = formData;
      } else {
        const arrayFormat = options.arrayFormat || this.options.arrayFormat;

        this.options.query = `?${qs.stringify(options.body, { arrayFormat })}`;
      }

      delete options.body;
    }

    Object.assign(this.options, options);
  }

  protected sanitizeHeader(headers: Headers): Headers {
    headers.forEach((value: string, name: string) => {
      if (!value || !String(value).trim().length) {
        headers.delete(name)
      }
    });

    return headers;
  };

  protected joinUrl(baseURI = '', path = '', query = '') {
    return urlJoin(baseURI, path, query, '?XDEBUG_SESSION_START=10270');
  }

  protected request(method: METHODS, path: string, options: FrisbeeOptions): Promise<FrisbeeResponse> {
    options.method = method;

    this.proceedOptions(options);

    const { baseURI, query = ''} = this.options;

    return this.fetch(
      this.joinUrl(baseURI, path, query),
      this.options
    );
  }

  protected fetch(url: string, options: FrisbeeOptionsInit_): Promise<FrisbeeResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const originalRes = await fetch(url, options);
        const res = createFrisbeeResponse(originalRes);
        const contentType = res.headers.get('Content-Type');

        if (!res.ok) {
          res.err = new Error(res.statusText || 'Some error');

          // check if the response was JSON, and if so, better the error
          if (contentType && contentType.includes('application/json')) {
            try {
              // attempt to parse json body to use as error message
              if (typeof res.json === 'function') {
                res.body = await res.json();
              } else {
                res.body = await res.text();
                res.body = JSON.parse(res.body);
              }

              // attempt to use better and human-friendly error messages
              if (
                typeof res.body === 'object' &&
                typeof res.body.message === 'string'
              ) {
                res.err = new Error(res.body.message);
              } else if (
                !Array.isArray(res.body) &&
                // attempt to utilize Stripe-inspired error messages
                typeof res.body.error === 'object'
              ) {
                if (res.body.error.message)
                  res.err = new Error(res.body.error.message);
                if (res.body.error.stack)
                  res.err.stack = res.body.error.stack;
                // if (res.body.error.code) res.err.code = res.body.error.code;
                // if (res.body.error.param)
                //   res.err.param = res.body.error.param;
              }
            } catch (e) {
              // res.err = this.parseErr;
            }
          }
          reject(res);
          return;
        }

        res.body = await res.json();

        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  get(path: string, options: FrisbeeOptions = {}) {
    return this.request(METHODS.GET, path, options);
  }

  post(path: string, options: FrisbeeOptions = {}) {
    return this.request(METHODS.POST, path, options);
  }
}
