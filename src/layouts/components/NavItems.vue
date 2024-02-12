<script setup>
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';
</script>

<template>
  <!-- <VerticalNavLink
    :item="{
      title: 'Account Settings',
      icon: 'ri-user-settings-line',
      to: '/account-settings',
    }"
  /> -->

  <VerticalNavLink :item="{
    title: 'Người dùng',
    icon: 'ri-user-3-line',
    to: '/admin/users',
  }" />
  <VerticalNavLink :item="{
    title: 'Cài đặt',
    icon: 'ri-settings-3-line',
    to: '/admin/settings',
  }" />
</template>
