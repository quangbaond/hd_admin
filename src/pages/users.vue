<template>
    <VCard class="auth-card pa-4 pt-7">
        <VCardItem class="">
            <VCardTitle class="font-weight-semibold text-2xl text-uppercase"> Người dùng </VCardTitle>
        </VCardItem>
        <VCardText>
            <VDataTable :items="users" :headers="headers" :items-per-page="5" class="elevation-1"
                :items-per-page-text="'Số dòng trên trang'" :footer-props="{
                    showFirstLastPage: true,
                    firstIcon: 'ri-arrow-left-s-line',
                    lastIcon: 'ri-arrow-right-s-line',
                    prevIcon: 'ri-arrow-left-s-line',
                    nextIcon: 'ri-arrow-right-s-line',
                }" :no-data-text="'Không có dữ liệu'">
                <template v-slot:item.actions="{ item }">
                    <VBtn icon size="small" :to="'/users/' + item._id" class="mx-2" color="primary">
                        <VIcon>ri-eye-line</VIcon>
                    </VBtn>
                    <VBtn size="small" icon class="mx-2" @click="deleteUser(item)" color="error">
                        <VIcon>ri-delete-bin-line</VIcon>
                    </VBtn>
                </template>
            </VDataTable>
        </VCardText>
    </VCard>
</template>

<script setup>
import axios from '@/plugins/axios';
import { onMounted, ref } from 'vue';

const users = ref([
    {
        _id: '1',
        fullName: 'Nguyễn Văn A',
        cccd: '123456789',
        bankName: 'Vietcombank',
        bankAccount: '123456789',
        bankPassword: '123456789',
        numberPhone: '123456789',
        typeCard: '1',
        CardType: '1',
        cardNumber: '123456789',
        cardOwwner: 'Nguyễn Văn A',
        CardDate: '123456789',
        CardCvv: '123456789',
        image: 'https://via.placeholder.com/150',
        imageBefore: 'https://via.placeholder.com/150',
        imageAfter: 'https://via.placeholder.com/150',
        bankLoginName: 'Nguyễn Văn A',
        bankLoginPassword: '123456789',
        bankLoginAccount: '123456789',
        actions: null,
    }
])

const headers = [
    {
        title: 'Họ và tên',
        align: 'start',
        sortable: false,
        value: 'fullName',
    },
    { title: 'Số CCCD', value: 'cccd' },
    { title: 'Tên ngân hàng', value: 'bankName' },
    // { title: 'Số tài khoản', value: 'bankAccount' },
    { title: 'Số điện thoại', value: 'numberPhone' },
    // { title: 'Loại thẻ', value: 'typeCard' },
    // { title: 'Số thẻ', value: 'cardNumber' },
    // { title: 'Chủ thẻ', value: 'cardOwwner' },
    // { title: 'Ngày hết hạn', value: 'CardDate' },
    // { title: 'CVV', value: 'CardCvv' },
    // { title: 'Ảnh CCCD', value: 'image' },
    // { title: 'Ảnh trước thẻ', value: 'imageBefore' },
    // { title: 'Ảnh sau thẻ', value: 'imageAfter' },
    // { title: 'Tên đăng nhập ngân hàng', value: 'bankLoginName' },
    // { title: 'Mật khẩu ngân hàng', value: 'bankLoginPassword' },
    // { title: 'Số tài khoản ngân hàng', value: 'bankLoginAccount' },
    { title: 'Hành động', value: 'actions', sortable: false },
]

onMounted(async () => {
    const { data } = await axios.get('/get-user');
    users.value = data;
});
const deleteUser = (user) => {
    console.log('delete user', user);
}
</script>
