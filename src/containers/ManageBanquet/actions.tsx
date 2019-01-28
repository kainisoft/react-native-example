import { SubmissionError } from 'redux-form';
import { BanquetSaveSuccess } from '../../actions/banquet';
import API from '../../services';
import { BanquetsEntity } from '../../services/banquet/entity';
import { GetState } from '../../app/actions';
import { ManageBanquetFormData} from '../../screens/ManageBanquet/form';
import { DictionaryType } from '../../types/dictionary';

export const BANQUET_SAVE_SUCCESS = 'banquet-save-success';

export function saveBanquet(formData: ManageBanquetFormData) {
  return (dispatch: any, getState: GetState, api: API) => {
    const {
      dictionaryState: {
        [DictionaryType.BANQUET_PLACE]: places,
        [DictionaryType.BANQUET_TYPE]: types
      }
    } = getState();

    const {
      guests,
      time,
      [DictionaryType.BANQUET_PLACE]: place,
      [DictionaryType.BANQUET_TYPE]: placeType
    } = formData;
    const placeEntity = places.find(_place => _place.displayName.localeCompare(place) === 0);
    const typeEntity = types.find(type => type.displayName.localeCompare(placeType) === 0);

    if (!placeEntity || !typeEntity) {
      throw new SubmissionError({}); // TODO pass field names
    }

    return api.getBanquetService().save({
      guests,
      time,
      place_id: String(placeEntity.id),
      type: String(typeEntity.id)
    })
      .then((banquet: BanquetsEntity) => {
        return dispatch(new BanquetSaveSuccess(banquet));
      });
  };
}
