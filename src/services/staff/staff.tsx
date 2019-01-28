import { SubmissionError } from 'redux-form';
import { ManageStaffFormData } from '../../screens/manage-staff/form';
import { BanquetEntity } from '../../types/banquet';
import { StaffEntity, StaffEntityList } from '../../types/staff';
import Base from '../base';

class StaffService extends Base<StaffEntity> {
  protected staffType: {[key: number]: string} = {
    4: 'distributors',
    2: 'photographers',
    3: 'its',
    1: 'managers'
  };

  load():Promise<StaffEntityList> {
    return this.get('api/staff')
      .then((res: any) => {
        if (!res.body.hasOwnProperty('staff')) {
          throw new Error('staff empty');
        }

        return [...res.body.staff];
      });
  }

  assign(coordination: BanquetEntity, staff: StaffEntity, type: number) {
    return this.get('api/assign_staff', {
      body: {
        occasion_id: coordination.id,
        [this.staffType[type]]: [staff.id]
      }
    });
  }

  unAssign(coordination: BanquetEntity, staff: StaffEntity, type: number) {
    return this.get('api/remove_staff', {
      body: {
        occasion_id: coordination.id,
        staff_id: staff.id,
        staff_type: type,
      }
    });
  }

  save(formData: ManageStaffFormData) {
    return this
      .post('api/create_staff', {
        headers: new Headers({'Content-Type': 'multipart/form-data'}),
        body: formData
      })
      .catch(() => {
        debugger
      })
      .then((res: any) => {
        if (!res.body.staff) {
          throw new SubmissionError({
            'email': 'busy'
          });
        }

        return {...res.body.staff};
      });
  }
}

export default StaffService;
