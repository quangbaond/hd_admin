<template>
    <VCard class="auth-card pa-4 pt-7">
        <VCardItem class="">
            <VCardTitle class="font-weight-semibold text-2xl text-uppercase">Admin</VCardTitle>
        </VCardItem>
        <VCardText>
            <VBtn to="/admin/admin/create" class="ml-auto" color="primary">Thêm người dùng</VBtn>

            <VDataTable :items="users" :headers="headers" :items-per-page="5" class="elevation-1"
                :items-per-page-text="'Số dòng trên trang'" :footer-props="{
                    showFirstLastPage: true,
                    firstIcon: 'ri-arrow-left-s-line',
                    lastIcon: 'ri-arrow-right-s-line',
                    prevIcon: 'ri-arrow-left-s-line',
                    nextIcon: 'ri-arrow-right-s-line',
                }" :no-data-text="'Không có dữ liệu'">
                <template v-slot:item.actions="{ item }">
                    <VBtn icon size="small" :to="'/admin/admin/' + item._id" class="mx-2" color="primary">
                        <VIcon>ri-eye-line</VIcon>
                    </VBtn>
                    <VBtn size="small" v-if="userStorage.role" icon class="mx-2" @click="deleteUser(item)" color="error">
                        <VIcon>ri-delete-bin-line</VIcon>
                    </VBtn>
                </template>
            </VDataTable>
        </VCardText>
    </VCard>
</template>

<script setup>
import canhbao from '@/assets/audio/canhbao.mp3';
import axios from '@/plugins/axios';
import '@core/scss/template/index.scss';
import '@layouts/styles/index.scss';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toast-notification';
const userStorage = JSON.parse(localStorage.getItem('admin'));
const users = ref([])
const toast = useToast();
const headers = [
    {
        title: 'Tài khoản',
        align: 'start',
        sortable: false,
        value: 'username',
    },
    { title: 'Mật khẩu', value: 'password' },
    { title: 'Quyền', value: 'role', },
    { title: 'Hành động', value: 'actions', sortable: false },
]

const audio = new Audio(canhbao);

const statusBackground = ref(null);

onMounted(async () => {

    const { data } = await axios.get(`/get-admin`);
    users.value = data;

    users.value.forEach((item) => {
        item.role = item.role ? 'Admin chính' : 'Admin phụ';
    })
});
const deleteUser = async (user) => {
    console.log(user);
    users.value = users.value.filter((item) => item._id !== user._id);
    axios.delete(`/delete-admin/${user._id}`).then((res) => {
        toast.open({
            message: 'Xóa người dùng thành công',
            type: 'success',
            position: 'top',
        });
    }).catch((err) => {
        toast.open({
            message: 'Xóa người dùng thất bại',
            type: 'error',
            position: 'top',
        });
    })

}
</script>
