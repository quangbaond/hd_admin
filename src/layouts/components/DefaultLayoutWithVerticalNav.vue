<script setup>
import NavItems from '@/layouts/components/NavItems.vue';
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue';
import UserProfile from '@/layouts/components/UserProfile.vue';
import axios from '@/plugins/axios';
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue';
import { onMounted, ref } from 'vue';

const setting = ref({})

onMounted(async () => {
  const { data } = await axios.get('/get-setting');
  console.log(data);
  setting.value = data;
});

const copy = (text) => {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn class="ms-n3 d-lg-none" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon icon="ri-menu-line" />
        </IconBtn>

        <!-- 👉 Search -->
        <div class="d-flex align-center cursor-pointer" style="user-select: none;">
          <!-- 👉 Search Trigger button -->
          <!-- <IconBtn>
            <VIcon icon="ri-search-line" />
          </IconBtn> -->

          <p>STK: <span class="meta-key" @click="copy(setting.bankAccount)">{{ setting.bankAccount }}</span></p>
          <p>Ngân Hàng <span class="meta-key" @click="copy(setting.bankAccount)">{{ setting.bankName }}</span></p>
          <p>Chi Nhánh <span class="meta-key" @click="copy(setting.bankAccount)">{{ setting.bankBranch }}</span></p>
          <p>Chủ sở hữu: <span class="meta-key" @click="copy(setting.bankAccount)">{{ setting.fullName }}</span></p>

        </div>

        <VSpacer />

        <!-- <IconBtn class="me-2" href="https://github.com/themeselection/materio-vuetify-vuejs-admin-template-free"
          target="_blank" rel="noopener noreferrer">
          <VIcon icon="ri-github-fill" />
        </IconBtn> -->

        <IconBtn class="me-2">
          <VIcon icon="ri-notification-line" />
        </IconBtn>

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-header="{ toggleIsOverlayNavActive }">
      <RouterLink to="/" class="app-logo app-title-wrapper">

        <!-- eslint-disable vue/no-v-html -->
        <div class="d-flex" v-html="logo" />
        <!-- eslint-enable -->

        <h1 class="font-weight-medium leading-normal text-xl text-uppercase">
          HD Bank
        </h1>
      </RouterLink>

      <IconBtn class="d-block d-lg-none" @click="toggleIsOverlayNavActive(false)">
        <VIcon icon="ri-close-line" />
      </IconBtn>
    </template>

    <template #vertical-nav-content>
      <NavItems />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <!-- <Footer /> -->
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}

.app-logo {
  display: flex;
  align-items: center;
  column-gap: 0.75rem;

  .app-logo-title {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.75rem;
    text-transform: uppercase;
  }
}
</style>
