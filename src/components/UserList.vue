<template>
  <div class="col-span-12  overflow-x-auto">
  <table class="user-list table text-gray-300 space-y-6 text-sm border-separate">
    <thead class="text-gray-500 font-bold text-lg">
      <tr>
        <th class="py-3 px-6 text-center"></th>
        <th class="py-3 px-6 text-center">Name</th>
        <th class="py-3 px-6 text-center">Username</th>
      </tr>
    </thead>
    <tbody class="bg-gray-800">
      <UserListData v-for="user in users" :key="user.id" :name="user.name" :username="user.username" :id="user.id" />
    </tbody>
  </table>
  </div>
  <div class="flex m-4">
    <button @click="removeLast" v-text="actionProcessing ? 'Pending...' : 'Remove last user'" class="rounded-lg bg-red-600 hover:bg-red-400 p-2 text-white" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import UserListData from './UserListData.vue';

import * as requests from '@/requests/user';

import { IUser, IUserList } from '@/types/users';

@Options({
  components: {
    UserListData
  }
})
export default class UserList extends Vue {
  users: IUserList = [];
  error = null;
  actionProcessing = false;

  created(): void {
    this.fetchData = this.fetchData.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.removeLast = this.removeLast.bind(this);
  }
  mounted(): void {
    this.fetchData();
  }

  async fetchData(): Promise<void> {
    this.error = null;

    this.users = await requests.listUser().catch((error) => { this.error = error }) || this.users;
  }

  addUserToList(user: IUser): void {
    this.users.push(user);
  }

  async removeUser(id: number): Promise<void> {
    if (this.actionProcessing) return;

    this.error = null;
    this.actionProcessing = true;

    const deleted = await requests.deleteUser(id).catch((error) => { this.error = error });

    if (deleted)
      this.users = this.users.filter((item: IUser) => id !== item.id);
    this.actionProcessing = false;
  }

  async removeLast(): Promise<void> {
    if (!this.users.length) return;

    const lastId = this.users[this.users.length - 1].id;
    this.removeUser(lastId);
  }
}
</script>

<style scoped>
.table {
  border-spacing: 0 15px;
}

i {
  font-size: 1rem !important;
}

.table tr {
  border-radius: 20px;
}

tr td:nth-child(n+5),
tr th:nth-child(n+5) {
  border-radius: 0 .625rem .625rem 0;
}

tr td:nth-child(1),
tr th:nth-child(1) {
  border-radius: .625rem 0 0 .625rem;
}
</style>