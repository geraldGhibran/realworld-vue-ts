import {
  VuexModule,
  Module,
  getModule,
  Action,
  Mutation,
} from 'vuex-module-decorators';
import store from '@/store';
import { User, Profile, UserSubmit } from '../models';
import { loginUser } from '../api';

@Module({
  namespaced: true,
  name: 'users',
  store,
  dynamic: true,
})
class UsersModule extends VuexModule {
  public user: User | null = null;
  public profile: Profile | null = null;

  @Mutation
  public setUser(user: User) {
    this.user = user;
  }

  get username() {
      return this.user && this.user.username || null;
  }

  @Action({ commit: 'setUser' })
  public async login(userSubmit: UserSubmit) {
    const user = await loginUser(userSubmit);
    return user;
  }
}

export default getModule(UsersModule);
