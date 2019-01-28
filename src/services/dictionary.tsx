import { HttpResponse } from '../lib/http';
import { DictionaryEntity, DictionaryEntityList, DictionaryType } from '../types/dictionary';
import Base from './base';

export default class DictionaryService extends Base<DictionaryEntity> {
  load(type: DictionaryType): Promise<any> {
    let request: Promise<HttpResponse<DictionaryEntityList>>;

    switch (type) {
      case DictionaryType.BANQUET_PLACE:
        request = this.get('api/places');
        break;
      case DictionaryType.BANQUET_TYPE:
        request = this.get('api/occasion_types');
        break;
      case DictionaryType.STAFF_TYPE:
        request = this.get('api/staff_types');
        break;
      default:
        return Promise.reject('Dictionary type not specified');
    }

    return request.then((res: any) => {
      return [...res.body[type]];
    }).catch((...rest) => {debugger
      console.log(rest)
    });
  }
}
