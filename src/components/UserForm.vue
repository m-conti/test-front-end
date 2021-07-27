<template>
  <div class="user-form fixed w-full h-full top-0 left-0 flex items-center justify-center z-10" v-show="visible">
    <div v-on:click="onCloseForm" class="modal-overlay absolute w-full h-full bg-black opacity-60" />
    <div class="fixed flex bg-gray-800 w-11/12 md:max-w-md mx-auto rounded shadow-2xl flex-col">
      <div class="form-header flex items-center justify-end">
        <div v-on:click="onCloseForm" class="cursor-pointer m-2">
          <svg class="fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
        </div>
      </div>
      <div class="form-content flex flex-col p-2 justify-start text-gray-400">
        <label for="nameInput">Name</label>
        <input id="nameInput" ref="nameInput" @input="(e) => onUpdateField('name', e.target.value)" class="flex shadow appearance-none border border-gray-800 focus:border-indigo-600 rounded w-full py-2 px-3 bg-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline" :class="fieldError.name ? 'error' : null" />
        <label for="usernameInput">Username</label>
        <input id="usernameInput" ref="usernameInput" @input="(e) => onUpdateField('username', e.target.value)" class="flex shadow appearance-none border border-gray-800 focus:border-indigo-600 rounded w-full py-2 px-3 bg-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline" :class="fieldError.username ? 'error' : null" />
      </div>
      <div class="form-bottom flex m-2 flex-row justify-end">
        <button @click="sendData" @input.prevent="checkFormValidity" v-text="actionProcessing ? 'Pending...' : 'Send form'" class="rounded-lg bg-indigo-600 hover:bg-indigo-400 p-2 text-white" />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import * as requests from '@/requests/user';
import { checkFieldName, checkFieldUsername } from '@/utils';
import { IUser } from '@/types/users';

const checkFunctions = {
  name: checkFieldName,
  username: checkFieldUsername
};

@Options({
  props: {
    visible: Boolean,
    onAddUser: Function,
    onCloseForm: Function,
  }
})
export default class UserForm extends Vue {
  $refs!: {
    nameInput: HTMLInputElement
    usernameInput: HTMLInputElement
  }
  onAddUser !: (user: IUser) => undefined;
  onCloseForm !: () => undefined;
  visible !: boolean;

  actionProcessing = false;
  error = null;
  fieldError = {
    username: false,
    name: false,
  };

  async sendData(): Promise<void> {
    if (this.actionProcessing || !this.checkFormValidity()) return;

    this.actionProcessing = true;
    this.error = null;

    const data = {
      name: this.$refs.nameInput.value.trim(),
      username: this.$refs.usernameInput.value.trim(),
    };

    const user = await requests.postUser(data).catch((error) => { this.error = error });

    this.actionProcessing = false;

    if (user)
      this.onAddUser(user);
  }

  onUpdateField(field: 'name'|'username', value: string): void {
    const validity = checkFunctions[field]?.(value.trim());
    this.fieldError[field] = !validity;
  }

  checkFormValidity(): boolean {
    return checkFieldName(this.$refs.nameInput.value.trim())
      && checkFieldUsername(this.$refs.usernameInput.value.trim());
  }
}
</script>

<style scoped>
  .error {
    border-color: red;
  }
  .error:focus {
    border-color: red;
  }
</style>