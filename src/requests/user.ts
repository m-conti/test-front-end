import axios from '@/axios';
import { POST_USER, USERS } from './actions';
import pick from 'lodash/pick';
import map from 'lodash/map';

import { IUser, IUserForm, IUserList } from '@/types/users';

export const listUser = (): Promise<IUserList> => new Promise(
  (res, rej) => axios.get(USERS)
  .then(({ data }) => res(map(data, (user) => pick(user, ['name', 'username', 'id'])) as IUserList))
  .catch(rej)
);

export const postUser = (data: IUserForm): Promise<IUser> => new Promise(
  (res, rej) => axios.post(POST_USER, data)
  .then(({ data }) => res(pick(data, ['name', 'username', 'id']) as IUser))
  .catch(rej)
  );

export const deleteUser = (id: number): Promise<boolean> => new Promise(
  (res, rej) => axios.delete(`${POST_USER}/${id}`)
  .then(() => res(true))
  .catch(rej)
);