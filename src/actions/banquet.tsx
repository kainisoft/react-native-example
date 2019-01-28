import { ActionStandard, PayloadStandard } from '../app/actions';
import { BanquetEntity, BanquetEntityList, GroupBanquet, State } from '../types/banquet';
import { StaffEntity } from '../types/staff';
import { DateUtils } from '../utils/date';

export class BanquetLoadSuccess extends ActionStandard<State, BanquetEntityList>{

  handler(state: State, banquets: BanquetEntityList): State {
    const groupBanquet = this.groupByDay(banquets);
    const group = this.sortByDate(groupBanquet);

    return this.merge({
      ...state,
      ...{
        banquets,
        group
      }
    });
  }

  protected groupByDay(banquets: BanquetEntityList): GroupBanquet {
    return banquets.reduce((carry: GroupBanquet, banquet: BanquetEntity) => {
      const date = DateUtils.fromFullString(banquet.date);
      const groupName = `${date.getYearString()}-${date.getMonthStr()}-${date.getDateStr()}`;

      if (!carry[groupName]) {
        carry[groupName] = [];
      }

      carry[groupName].push(banquet);

      return carry;
    }, {});
  }

  protected sortByDate(groupBanquet: GroupBanquet): GroupBanquet {
    const keys = Object.keys(groupBanquet).sort((keyA: string, keyB: string) => {
      const dateA = DateUtils.fromDateString(keyA);
      const dateB = DateUtils.fromDateString(keyB);

      return dateB.getTime() - dateA.getTime();
    });

    return keys.reduce((carry: GroupBanquet, date: string) => {
      const banquetList = groupBanquet[date];

      banquetList.sort((banquetA, banquetB) => {
        const dateA = DateUtils.fromFullString(banquetA.date);
        const dataB = DateUtils.fromFullString(banquetB.date);

        return dataB.getTime() - dateA.getTime();
      });

      carry[date] = banquetList;

      return carry;
    }, {});
  }

}


interface AssignStaffPayload extends PayloadStandard {
  banquet: BanquetEntity;
  staff: StaffEntity;
  type: number;
}

export class BanquetAssignStaffSuccess extends ActionStandard<State, AssignStaffPayload> {

  handler(state: State, {banquet, staff, type}: AssignStaffPayload): State {
    const banquets = [...state.banquets];
    const banquetEntity = banquets.find(entity => entity.id === banquet.id) as BanquetEntity;
    const index = banquetEntity.staff_occ.findIndex(staffOcc => staffOcc.staff_id === staff.id && staffOcc.type === type);

    if (index === -1 ) {
      banquetEntity.staff_occ.push({
        staff,
        type,
        id: String(Date.now()),
        staff_id: String(staff.id)
      });
    } else {
      banquetEntity.staff_occ.splice(index, 1);
    }

    const action = new BanquetLoadSuccess([]);

    return action.handler(state, banquets);
  }

}

export class BanquetSaveSuccess extends ActionStandard<State, {}> {
  // Manage Banquet Save Success
}

export class BanquetUpdateTimeSuccess extends ActionStandard<State, BanquetEntity> {

  handler(state: State, payload: BanquetEntity): State {
    const banquets = state.banquets.slice();
    const banquet = banquets.find(banquet => banquet.id === payload.id);

    Object.assign(banquet, payload);

    const action = new BanquetLoadSuccess([]);

    return action.handler(state, banquets);
  }

}
