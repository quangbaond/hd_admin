<template>
    <VCard>
        <VCardTitle>
            Thông tin admin
        </VCardTitle>
        <VCardText>
            <VForm class="pa-4">
                <VRow>
                    <VCol cols="12" md="12">
                        <VTextField v-model="formValue.username" label="Tên tài khoản" outlined />
                    </VCol>
                    <VCol cols="12" md="12">
                        <VTextField v-model="formValue.password" label="Mật khẩu đăng nhập ngân hàng" outlined />
                    </VCol>
                    <VCol cols="12" md="12">
                        <VSwitch v-model="formValue.role" label="Admin chính" outlined />
                    </VCol>
                </VRow>

                <VBtn @click="submit" color="primary" class="mt-4">
                    Lưu
                </VBtn>
            </VForm>
        </VCardText>
    </VCard>
</template>

<script setup>
import axios from '@/plugins/axios';
import '@core/scss/template/index.scss';
import '@layouts/styles/index.scss';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const route = useRoute();
const otp = ref('');
const otpNew = ref('');
const statusXD = ref('');
const statusTV = ref('');
const formValue = ref({
    actions: null,
});


// get user id from route params
const userId = ref(route.params.id);

// get user detail
const user = ref(null);
onMounted(() => {
    axios.get(`/get-admin/${userId.value}`)
        .then(({ data }) => {
            user.value = data;
            formValue.value = data;
            console.log('user', formValue.value);
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
    axios.put(`/update-admin/${userId.value}`, formValue.value)
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
