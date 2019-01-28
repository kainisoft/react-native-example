import { ActionStandard } from '../app/actions';
import { State, Payload } from '../types/schedule';

export class ScheduleLoadSuccess extends ActionStandard<State, Payload> {

  handler(state: State, {past, future}: Payload): State {
    return this.merge({
      ...state,
      ...{
        past,
        future
      }
    });
  }

}
