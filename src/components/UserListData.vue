<template>
  <tr class="user m-2 border border-gray-900">
    <td class="p-4 md:rounded-l-lg rounded-none">
      <div class="md:w-12 md:h-12 w-8 l-8 md:text-3xl text-2xl flex bg-gray-200 rounded-full justify-center items-center text-gray-800 text-center font-extrabold uppercase">
        {{name[0]}}
      </div>
    </td>
    <td class="name p-4">{{name}}</td>
    <td class="username p-4 md:rounded-r-lg rounded-none">{{username}}</td>
  </tr>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    name: String,
    username: String,
    id: Number
  }
})
export default class UserListData extends Vue {
  name !: string;
  username !: string;
  id !: number;
}
</script>

<style scoped>

</style>