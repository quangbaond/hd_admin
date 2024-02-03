<script setup>
import axios from '@/plugins/axios';
import avatar1 from '@images/avatars/avatar-1.png';
import { computed, ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
  window.location.href = '/login';
};


const toast = useToast();
const store = useStore()
const openDialogPassword = ref(false);
const user = JSON.parse(localStorage.getItem('user')) || computed(() => store.state.user).value;
const formRef = ref(null);
const formValue = ref({
  password: '',
  newPassword: '',
  confirmPassword: '',
});

const rules = {
  password: [
    (v) => !!v || 'Mật khẩu không được để trống',
  ],
  newPassword: [
    (v) => !!v || 'Mật khẩu mới không được để trống',
  ],
  confirmPassword: [
    (v) => !!v || 'Xác nhận mật khẩu không được để trống',
    (v) => v === formValue.value.newPassword || 'Xác nhận mật khẩu không khớp',
  ],
};

const submit = async () => {
  const isValid = await formRef.value.validate();

  if (isValid.valid) {
    console.log('formValue', formValue.value);
    axios.post('/change-password', formValue.value).then((res) => {
      console.log('res', res);
      openDialogPassword.value = false;
      toast.open({
        message: 'Đã đổi mật khẩu',
        type: 'success',
        position: 'top',
      });

    }).catch((error) => {
      console.error('error', error);
      toast.open({
        message: 'Mật khẩu cũ không đúng',
        type: 'error',
        position: 'top',
      });
    });
  }
};
console.log('user', user);
</script>

<template>
  <v-dialog width="500" v-model="openDialogPassword">
    <v-card title="Đổi mật khẩu">
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="submit">
          <v-text-field class="mb-2" v-model="formValue.password" label="Mật khẩu cũ" type="password" outlined
            :rules="rules.password"></v-text-field>
          <v-text-field class="mb-2" v-model="formValue.newPassword" label="Mật khẩu mới" type="password" outlined
            :rules="rules.newPassword"></v-text-field>
          <v-text-field class="mb-2" v-model="formValue.confirmPassword" label="Xác nhận mật khẩu" type="password"
            outlined :rules="rules.confirmPassword"></v-text-field>
          <v-btn block @click="submit" color="primary" class="mt-4">
            Lưu
          </v-btn>
          <v-btn block @click="openDialogPassword = false" color="error" class="mt-4">
            Đóng
          </v-btn>
        </v-form>
      </v-card-text>

      <!-- <v-card-actions>
        <v-spacer></v-spacer>

        <VBtn type="button" @click="openDialogPassword = false">Đóng</VBtn>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
  <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success" bordered>
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                  <VAvatar color="primary" variant="tonal">
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ user.username || 'Admin' }}
            </VListItemTitle>
            <VListItemSubtitle>Admin</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="ri-user-line" size="22" />
            </template>

            <VListItemTitle @click="openDialogPassword = true">Đổi mật khẩu</VListItemTitle>
          </VListItem>

          <!-- 👉 Logout -->
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="ri-logout-box-line" size="22" />
            </template>

            <VListItemTitle @click="logout">Đăng xuất</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
