import { Dispatch } from 'redux';
import { ScheduleLoadSuccess } from '../../actions/schedule';
import { GetState } from '../../app/actions';
import API from '../../services';
import { ScheduleEntityList } from '../../types/schedule';

export function load() {
  return (dispatch: Dispatch, getState: GetState, api: API) => {
    const service = api.getScheduleService();

    return Promise.all([
      service.loadPast(),
      service.loadFuture()
    ])
      .then(([past, future]: Array<ScheduleEntityList>) => {
        dispatch(new ScheduleLoadSuccess({past, future}));
      })
      .catch((...rest: any) => {
        console.log(rest);
      })
  };
}
