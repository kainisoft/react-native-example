import { AnyAction, Dispatch } from 'redux';
import { BanquetLoadSuccess, BanquetUpdateTimeSuccess } from '../../actions/banquet';
import API from '../../services';
import { ActionStandard, GetState } from '../../app/actions';

const prefix = 'banquet';
export const Actions = {
  ...ActionStandard,
  LOAD: `${prefix}-load`,
  SUCCESS: `${prefix}-load-success`,
  FAIL: `${prefix}-load-fail`
};

export const BANQUET_LOAD = 'banquet-load';
export const BANQUET_LOAD_SUCCESS = 'banquet-load-success';
export const BANQUET_LOAD_FAILURE = 'banquet-load-failure';

export function loadBanquets() {
  return (dispatch: Dispatch, getState: GetState, api: API) => {
    return api.getBanquetService().load()
      .then(banquets => {
        dispatch(new BanquetLoadSuccess(banquets));
      })
      .catch((error: any) => {
        console.log('ERROR',error);
        dispatch(banquetLoadFailure());
      });
  }
}

export function updateBanquetTime(id: string, guests: number, dateTime: string) {
  return (dispatch: Dispatch, getState: GetState, api: API) => {
    return api.getBanquetService().updateTime(id, guests, dateTime)
      .then(banquet => {
        return dispatch(new BanquetUpdateTimeSuccess(banquet));
      });
  };
}

export function banquetLoadSuccess(banquets: any): AnyAction {
  return {
    type: BANQUET_LOAD_SUCCESS,
    banquets
  }
}

export function banquetLoadFailure(): AnyAction {
  return {
    type: BANQUET_LOAD_FAILURE
  }
}
