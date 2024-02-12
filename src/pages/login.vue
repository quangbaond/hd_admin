<script setup>
import axios from '@/plugins/axios';
import { router } from '@/plugins/router';
import { store } from '@/plugins/store';
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png';
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png';
import { useToast } from 'vue-toast-notification';
import { useTheme } from 'vuetify';
const form = ref({
  username: '',
  password: '',
})

const toast = useToast()
const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)
const loading = ref(false)

const submit = async () => {
  loading.value = true
  axios.post('/login', form.value).then((res) => {
    localStorage.setItem('admin', JSON.stringify(res.user))
    localStorage.setItem('isAuthenticated', true)
    store.commit('setUser', res.user)
    store.commit('setIsAuthenticated', true)
    toast.open({
      message: 'Đăng nhập thành công',
      type: 'success',
      position: 'top',
    })
    loading.value = false
    router.push({ path: '/admin' })
  }).catch((error) => {
    loading.value = false
    toast.open({
      message: 'Tài khoản hoặc mật khẩu không đúng',
      type: 'error',
      position: 'top',
    })
  })
}
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          Đăng nhập
        </VCardTitle>
      </VCardItem>

      <VCardText>
        <VForm @submit.prevent="submit">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField v-model="form.username" label="Tài khoản" type="text" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField v-model="form.password" label="Password" placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap my-4">
                <VBtn block type="submit" class="mt-1 mb-4" :loading="loading">
                  Login
                </VBtn>
              </div>

              <!-- login button -->

            </VCol>

          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
