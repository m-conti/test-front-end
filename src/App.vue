<template>
<div class="flex items-center justify-center min-h-screen bg-gray-900">
  <div class="col-span-12 flex flex-col overflow-hidden">
    <UserList ref="userList" />
    <UserForm :onAddUser="onAddUser" :visible="showForm" :onCloseForm="() => setShowForm(false)" />
    <div @click="() => setShowForm(!this.showForm)" class="fill-current shadow-2xl bg-indigo-700 p-4 rounded-full text-white hover:text-indigo-800 hover:bg-indigo-400 cursor-pointer fixed right-4 bottom-4 md:right-8 md:bottom-8 z-0">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 512 512" xml:space="preserve">
        <path d="M492,236H276V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v216H20c-11.046,0-20,8.954-20,20s8.954,20,20,20h216v216c0,11.046,8.954,20,20,20s20-8.954,20-20V276h216c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"/>
      </svg>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import UserList from '@/components/UserList.vue';
import UserForm from '@/components/UserForm.vue';
import { IUser } from '@/types/users';

@Options({
  components: {
    UserList,
    UserForm,
  },
})
export default class App extends Vue {
  $refs!: {
    userList: UserList
  };

  showForm = false;

  created(): void {
    this.onAddUser = this.onAddUser.bind(this);
    this.setShowForm = this.setShowForm.bind(this);
  }

  onAddUser(user: IUser): void {
    this.$refs.userList.addUserToList(user);
    this.setShowForm(false);
  }

  setShowForm(showForm=false): void {
    this.showForm = showForm;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
