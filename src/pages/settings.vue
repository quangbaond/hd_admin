<template>
    <VCard class="auth-card pa-4 pt-7">
        <VCardItem class="">
            <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
                Cài đặt
            </VCardTitle>
        </VCardItem>
        <VCardText>
            <VForm class="pa-4">
                <VRow>
                    <VCol cols="12" md="6">
                        <VSelect :disabled="!userStorage.role" v-model="form.bankName" :items="banks" label="Tên ngân hàng"
                            outlined></VSelect>
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField :disabled="!userStorage.role" v-model="form.fullName" label="Chủ tài khoản" outlined />
                    </VCol>

                    <VCol cols="12" md="6">
                        <VTextField :disabled="!userStorage.role" v-model="form.bankAccount" label="Số tài khoản"
                            outlined />
                    </VCol>

                    <VCol cols="12" md="6">
                        <VTextField :disabled="!userStorage.role" v-model="form.bankBranch" label="Chi nhánh" outlined />
                    </VCol>
                </VRow>
                <VRow>
                    <VCol cols="12" md="12">
                        <VTextField :disabled="!userStorage.role" v-model="form.zaloUrl" label="Link zalo" outlined />
                    </VCol>
                </VRow>
                <VBtn v-if="userStorage.role" @click="submit" color="primary" class="mt-4" block>
                    Lưu
                </VBtn>
            </VForm>
        </VCardText>
    </VCard>
</template>

<script setup>
import axios from '@/plugins/axios';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toast-notification';
const form = ref({
    bankName: '',
    fullName: '',
    bankAccount: '',
    bankBranch: '',
    zaloUrl: '',
});
const toast = useToast();
const userStorage = JSON.parse(localStorage.getItem('admin'));
const banks = ref([
    'Vietcombank',
    'Techcombank',
    'BIDV',
    'Vietinbank',
    'ACB',
    'VPBank',
    'MBBank',
    'Sacombank',
    'SHB',
    'VIB',
    'TPBank',
    'OceanBank',
    'Eximbank',
    'ABBank',
    'GPBank',
    'NAMABANK',
    'NCB',
    'PVcomBank',
    'BVB',
    'OCB',
    'SCB',
    'IVB',
    'LienVietPostBank',
    'ABBank',
    'VRB',
    'HDBank',
    'BacABank',
    'SeaBank',
])
const submit = async () => {
    try {
        await axios.post('/update-setting', form.value);
        console.log('saved');
        toast.open({
            message: 'Đã lưu cài đặt',
            type: 'success',
            position: 'top',
        });
    } catch (error) {
        console.error(error);
    }
}

const upload = async (e) => {
    console.log('upload', e.target.files[0]);

    const formData = new FormData();
    formData.append('zaloImage', e.target.files[0]);

    try {
        const { data } = await axios.post('/update-zalo', formData);

        toast.open({
            message: 'Ảnh đã được tải lên',
            type: 'success',
            position: 'top',

        });
        console.log('uploaded', data);
    } catch (error) {
        console.error(error);
    }
}

onMounted(async () => {
    const { data } = await axios.get('/get-setting');
    form.value = data;
});
</script>
<style scoped>
img {
    max-width: 100%;
    object-fit: cover;
}
</style>
