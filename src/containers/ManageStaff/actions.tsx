import { StaffSaveSuccess } from '../../actions/staff';
import API from '../../services';
import { GetState } from '../../app/actions';
import { ManageStaffFormData } from '../../screens/manage-staff/form';
import { StaffEntity } from '../../types/staff';

export function saveStaff({type, name, address, email, telephone, photo}: ManageStaffFormData) {
  return (dispatch: any, getState: GetState, api: API) => {
    if (type) {
      const {dictionaryState: {staff_types}} = getState();
      const typeEntity = staff_types.find(staffType => staffType.displayName === type);

      if (typeEntity) {
        type = typeEntity.id;
      }
    }

    return api.getStaffService().save({ name, address, telephone, email, type, photo })
      .then((staff: StaffEntity) => {
        return dispatch(new StaffSaveSuccess(staff));
      });
  };
}
