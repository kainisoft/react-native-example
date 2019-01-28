import { ActionStandard, PayloadStandard } from '../app/actions';
import {
  DictionaryEntityList,
  DictionaryOriginalList,
  DictionaryPlaceOriginal, DictionaryStaffTypeOriginal,
  DictionaryType,
  State
} from '../types/dictionary';

interface Payload extends PayloadStandard {
  type: DictionaryType;
  dictionaries: DictionaryEntityList;
}

export class DictionaryLoadSuccess extends ActionStandard<State, Payload>{

  handler(state: State, {type, dictionaries}: Payload): State {
    return this.merge({
      ...state,
      ...{
        [type]: this.convertDictionaries(type, dictionaries)
      }
    });
  }

  protected convertDictionaries(type: DictionaryType, dictionaries: DictionaryOriginalList): DictionaryEntityList {
    return dictionaries.map(dictionary => {
      switch (type) {
        case DictionaryType.BANQUET_PLACE:
        case DictionaryType.BANQUET_TYPE: {
          const d = dictionary as DictionaryPlaceOriginal;

          return {
            id: d.id,
            displayName: d.name,
            originalDictionary: dictionary
          };
        }

        case DictionaryType.STAFF_TYPE: {
          const d = dictionary as DictionaryStaffTypeOriginal;

          return {
            id: d.val,
            displayName: d.name,
            originalDictionary: dictionary
          }
        }
      }
    });
  }
}

export class DictionaryLoadFail extends ActionStandard<State, any> {

}
