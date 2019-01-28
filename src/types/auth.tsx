import { StateStandard } from '../app/actions';
import { UserEntity } from '../services/auth/entity';

export interface State extends StateStandard {
  token: string;
  user?: UserEntity;
}
