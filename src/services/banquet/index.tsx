import { HttpResponse } from '../../lib/http';
import { BanquetEntity, BanquetEntityList, ManageBanquetEntity } from '../../types/banquet';
import Base from '../base';

class BanquetService extends Base<BanquetEntity> {

  load(): Promise<BanquetEntityList> {
    const request = this.get('api/occasions');

    return request
      .then((res: HttpResponse<{occasions: BanquetEntityList}>) => {
        if (!res.body.hasOwnProperty('occasions')) {
          throw new Error('occasions empty');
        }

        return [
          ...res.body.occasions
        ];
      });
  }

  save(formData: ManageBanquetEntity): Promise<any> {
    return this.get('api/createOccasion', {body: formData})
      .then((res: any) => {
        if (!res.body.hasOwnProperty('occasion')) {
          return Promise.reject('save banquet fail');
        }

        return {
          ...res.body.occasion
        };
      })
      .catch((...rest) => {
        debugger;
        console.log(rest);
        return {
          foo: false
        }
      });
  }

  updateTime(id: string, guests_amount: number, dateTime: string) {
    const [date, time] = dateTime.split(' ');

    return this.get('api/change_occasion', {
      body: {
        id,
        guests_amount,
        date,
        time
      }
    })
      .then((res: any) => {debugger
        if (!res.body.hasOwnProperty('occasion')) {
          return Promise.reject('save banquet fail');
        }

        return {
          ...res.body.occasion
        };
      });
  }
}

export default BanquetService;
