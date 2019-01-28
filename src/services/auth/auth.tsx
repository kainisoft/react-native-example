import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRECT } from '../../configs/consts';
import { HttpResponse } from '../../lib/http';
import { SignInFormData } from '../../screens/Auth/SignIn/components/form';
import Base from '../base';
import { TokenEntity, UserEntity } from './entity';

class AuthService extends Base<TokenEntity | UserEntity> {

  singInAttempt({username, password}: SignInFormData): Promise<TokenEntity> {
    return this.post('/oauth/token', {
      body: {
        username,
        password,
        grant_type: 'password',
        client_id: OAUTH_CLIENT_ID,
        client_secret: OAUTH_CLIENT_SECRECT,
        scope: ''
      }
    })
      .then((response: HttpResponse<{access_token: string}>) => {
        return {
          token: response.body.access_token
        };
      });
  }

  attemptSignIn(username: string, password: string, ): Promise<TokenEntity> {
    return this.post('/oauth/token', {body: {
        username,
        password,
        grant_type: 'password',
        client_id: OAUTH_CLIENT_ID,
        client_secret: OAUTH_CLIENT_SECRECT,
        scope: ''
      }})
      .then((res: HttpResponse<{access_token: string}>) => {
        return {
          token: res.body.access_token
        };
      });
  }

  userInfo() {
    return this.get('api/user')
      .then(res => {
        return res.body.user;
      });
  }
}

export default AuthService;
