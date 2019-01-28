import { HttpResponse } from '../lib/http';
import { ScheduleEntity } from '../types/schedule';
import Base from './base';

export default class ScheduleService extends Base<ScheduleEntity> {

  loadPast() {
    return this.get('api/my_past_occasions')
      .then((response: HttpResponse<{occasions: any[]}>) => {
        return [...response.body.occasions];
      });
  }

  loadFuture() {
    return this.get('api/my_future_occasions')
      .then((response: HttpResponse<{occasions: any[]}>) => {
        return [...response.body.occasions];
      });
  }

}
