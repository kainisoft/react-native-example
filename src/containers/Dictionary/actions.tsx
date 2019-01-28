import { Dispatch } from 'redux';
import { DictionaryLoadFail, DictionaryLoadSuccess } from '../../actions/dictionary';
import API from '../../services';
import { GetState } from '../../app/actions';
import { DictionaryType } from '../../types/dictionary';

export function load(type: DictionaryType) {
  return (dispatch: Dispatch, getState: GetState, api: API) => {
    return api.getDictionaryService().load(type)
      .then(dictionaries => {
        dispatch(new DictionaryLoadSuccess({type, dictionaries}));
      })
      .catch(() => {
        dispatch(new DictionaryLoadFail(type));
      });
  };
}
