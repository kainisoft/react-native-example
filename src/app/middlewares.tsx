import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import API from '../services';
import { ActionStandard } from './actions';

const middlewares: Array<any> = [];

middlewares.push(thunk.withExtraArgument(new API()));

if (__DEV__) {
  middlewares.push(createLogger());
}

middlewares.push(() => (next: any) => (action: any) => {
  if (action instanceof ActionStandard) {
    next(action.toObject());
  } else {
    next(action);
  }
});

export default middlewares;
