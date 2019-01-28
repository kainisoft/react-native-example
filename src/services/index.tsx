import { AnyAction, Store } from 'redux';
import { GlobalState } from '../app/actions';
import { HttpOptions } from '../lib/http';
import AuthService from './auth/auth';
import BanquetService from './banquet';
import DictionaryService from './dictionary';
import ScheduleService from './schedule';
import StaffService from './staff/staff';

let instance: any;

class API {
  protected static store: Store<GlobalState, AnyAction>;

  static setStore(store: Store) {
    self.store = store;
  }

  constructor() {
    if (instance) {
      return instance;
    }

    if (!(this instanceof self)) {
      return new self();
    }

    instance = this;
  }

  protected getHttpOptions(): HttpOptions {
    const {authState: {token}} = self.store.getState();

    return {
      headers: new Headers({
        'X-Authorization': `Bearer ${token}`,
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // protected getInstanceOf<T extends Base<S extends Entity>>(classOf: T): T { // TODO implement
  //   return new classOf(this.getHttpOptions());
  // }

  getAuthService(): AuthService {
    return new AuthService(this.getHttpOptions());
  }

  getBanquetService(): BanquetService {
    return new BanquetService(this.getHttpOptions());
  }

  getStaffService(): StaffService {
    return new StaffService(this.getHttpOptions());
  }

  getDictionaryService(): DictionaryService {
    return new DictionaryService(this.getHttpOptions());
  }

  getScheduleService(): ScheduleService {
    return new ScheduleService(this.getHttpOptions());
  }
}

const self = API;

export default API;
