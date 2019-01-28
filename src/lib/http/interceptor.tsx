export default class Interceptor {
  protected interceptors: any[];

  constructor(API: any, interceptableMethods: any[] = []) {
    this.interceptors = [];

    if (!API) throw new Error('API should be passed to the Interceptor');

    if (interceptableMethods.length === 0)
      throw new Error('no methods were added to interceptableMethods');

    interceptableMethods.forEach(methodName => {
      const methodFn = API[methodName];
      // @ts-ignore
      API[methodName] = (...args) => this.interceptedMethod(methodFn, ...args);
    });
  }

  interceptedMethod(methodFn: any, ...args: any) {
    const { interceptors } = this;
    const reversedInterceptors = interceptors.slice().reverse();

    let promise = Promise.resolve(args);

    // Register request interceptors
    interceptors.forEach(({ request, requestError }) => {
      if (typeof request === 'function')
        promise = promise.then(args => request(...[].concat(args)));
      if (typeof requestError === 'function')
        promise = promise.catch(requestError);
    });

    // Register methodFn call
    if (typeof methodFn === 'function')
      promise = promise.then(args => methodFn(...[].concat(args)));

    // Register response interceptors
    reversedInterceptors.forEach(({ response, responseError }) => {
      if (typeof response === 'function') promise = promise.then(response);
      if (typeof responseError === 'function')
        promise = promise.catch(responseError);
    });

    return promise;
  }

  register(interceptor: any) {
    this.interceptors.push(interceptor);
    return () => this.unregister(interceptor);
  }

  unregister(interceptor: any) {
    const index = this.interceptors.indexOf(interceptor);
    if (index >= 0) this.interceptors.splice(index, 1);
  }

  clear() {
    this.interceptors = [];
  }
};
