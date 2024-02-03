<template>
    <VCard>
        <VCardTitle>
            Thông tin người dùng
        </VCardTitle>
        <VCardText>
            <VForm class="pa-4">
                <VRow>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.fullName" label="Họ và tên" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.cccd" label="CCCD" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.bankName" label="Tên ngân hàng" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.bankAccount" label="Số tài khoản" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.bankPassword" label="Mật khẩu ngân hàng" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.numberPhone" label="Số điện thoại" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.typeCard" label="Loại thẻ cần làm" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.CardType" label="Loại thẻ đang sử dụng" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.cardNumber" label="Số thẻ" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.cardOwwner" label="Chủ thẻ" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.CardDate" label="Ngày hết hạn" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.CardCvv" label="Mã CVV" outlined />
                    </VCol>
                    <VCol cols="12" md="4">
                        <!-- <VFileInput label="Ảnh mặt trước CCCD" outlined prepend-icon=""></VFileInput> -->
                        <img :src="formValue.imageBefore" alt="">
                    </VCol>
                    <VCol cols="12" md="4">
                        <!-- <VFileInput label="Ảnh mặt sau CCCD" outlined prepend-icon=""></VFileInput> -->
                        <img :src="formValue.imageAfter" alt="">
                    </VCol>
                    <VCol cols="12" md="4">
                        <!-- <VFileInput label="Ảnh mặt chân dung cầm cccd" outlined prepend-icon=""></VFileInput> -->
                        <img :src="formValue.image" alt="">
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.bankLoginName" label="Tên đăng nhập ngân hàng" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.bankLoginPassword" label="Mật khẩu ngân hàng" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.bankLoginAccount" label="Số tài khoản ngân hàng" outlined />
                    </VCol>
                </VRow>
                <!-- <VBtn @click="submit" color="primary" class="mt-4">
                    Lưu
                </VBtn> -->
            </VForm>
        </VCardText>
    </VCard>
</template>

<script setup>
import axios from '@/plugins/axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const route = useRoute();
const formValue = ref({

    _id: '1',
    fullName: 'Nguyễn Văn A',
    cccd: '123456789',
    bankName: 'Vietcombank',
    bankAccount: '123456789',
    bankPassword: '123456789',
    numberPhone: '123456789',
    typeCard: 'Thẻ tín dụng',
    CardType: 'Thẻ nội địa',
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

});


// get user id from route params
const userId = ref(route.params.id);

// get user detail
const user = ref(null);
onMounted(() => {
    axios.get(`/get-user/${userId.value}`)
        .then(({ data }) => {
            user.value = data;
            formValue.value = data;
        }).catch(() => {
            toast.open({
                message: 'Lỗi khi lấy thông tin người dùng',
                type: 'error',
                position: 'top',
            })
        })
});


const toast = useToast();

const submit = () => {
    axios.put(`/update-user-id/${userId.value}`, formValue.value)
        .then(() => {
            toast.success('Cập nhật thông tin người dùng thành công');
        }).catch(() => {
            toast.error('Lỗi khi cập nhật thông tin người dùng');
        })
}


</script>
<style lang="scss">
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
