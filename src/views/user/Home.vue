<template>
    <v-container>
        <v-row justify="center">
            <v-col md="6" lg="4" cols="12" sm="6">
                <div>
                    <div style="display: flex; justify-content: center">
                        <a href="">
                            <v-img cover width="133px" src="https://sieuthe4trong1.hdbank.com.vn/images/logo.svg"
                                alt=""></v-img>
                        </a>
                    </div>
                </div>
                <div style="margin-top: 20px">
                    <div style="text-align: center">
                        <div class="herro_banner">
                            <v-img cover src="https://sieuthe4trong1.hdbank.com.vn/images/b-1.jpg"></v-img>
                        </div>
                    </div>
                </div>

                <v-sheet class="mx-auto">
                    <v-form ref="formRef" @submit.prevent="submit">
                        <v-text-field variant="filled" class="mb-3" v-model="formValue.fullName" label="Họ và tên"
                            :rules="rules.fullName"></v-text-field>
                        <v-text-field class="mb-3" v-model="formValue.numberPhone" variant="filled"
                            label="Số điện thoại" :rules="rules.numberPhone"></v-text-field>
                        <v-text-field class="mb-3" v-model="formValue.cccd" variant="filled" label="Số CMND hoặc CCCD"
                            :rules="rules.cccd"></v-text-field>
                        <v-text-field class="mb-3" v-model="formValue.referralCode" variant="filled"
                            label="Mã giới thiệu (nếu có)" :rules="rules.referralCode"></v-text-field>

                        <v-checkbox hide-details="auto" class="mb-3"
                            label="Tôi đồng ý với các điều khoản và điều kiện của chương trình"></v-checkbox>
                        <p class="px-3">+
                            <a style="" href="">Thông
                                báo xử lý dữ liệu cá nhân, </a>
                            <a href="">
                                Điều khoản và Điều kiện</a>
                            về xử lý dữ liệu cá nhân trước khi cho HDBank xử lý dữ liệu cá nhân của tôi và
                        </p>
                        <p class="px-3">+
                            <a style="" href="">Thông
                                Văn bản ủy quyền </a>
                            cho HDBank liên quan đến xử lý dữ liệu cá nhân của Tôi
                        </p>
                        <div id="recaptcha-container"></div><br>
                        <v-btn type="submit" color="blue" block class="my-2" :loading="loading">Tiếp tục</v-btn>
                    </v-form>
                </v-sheet>
            </v-col>

        </v-row>

    </v-container>
</template>
<script setup>
import { auth } from '@/firebaseConfig'
import { RecaptchaVerifier, signInWithPhoneNumber } from '@firebase/auth'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()

const store = useStore()
const formRef = ref(null)
const formValue = ref({
    fullName: '',
    numberPhone: '',
    cccd: '',
    referralCode: '',
})
const appVerifier = ref(null)
const loading = ref(false)

const rules = {
    fullName: [
        value => {
            if (value?.length > 3) return true

            return 'Họ và tên không hợp lệ.'
        },
    ],
    numberPhone: [
        value => {
            if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value)) return true

            return 'Số điện thoại không hợp lệ.'
        },
    ],
    cccd: [
        value => {
            if (/^\d{12}$/.test(value)) return true

            return 'Số CCCD không hợp lệ.'
        },
    ],
    referralCode: [
        value => {
            if (value === '') return true

            if (/[^0-9]/.test(value)) return 'Mã giới thiệu không hợp lệ.'
        },
    ],
}

const sendOtp = () => {

    let numberPhone = '+84' + formValue.value.numberPhone

    // numberPhone = numberPhone.replace('')
    appVerifier.value.render().then((widgetId) => {
        appVerifier.value.reset(widgetId);
    });

    loading.value = true

    signInWithPhoneNumber(auth, numberPhone, appVerifier.value)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            store.commit('setSnackbar', {
                type: true,
                message: 'Đăng ký thành công, OTP đã được gửi đến số điện thoại của bạn.',
                color: 'success',
            })
            loading.value = false

            store.commit('setUser', {
                ...formValue.value,
                verified: false,
            })

            router.push('/otp')
        }).catch((error) => {
            loading.value = false
            console.log(error);
            if (error.code === 'auth/invalid-phone-number') {
                store.commit('setSnackbar', {
                    type: true,
                    message: 'Số điện thoại không hợp lệ.',
                    color: 'error',
                })
            } else {
                // store.commit('setSnackbar', {
                //     type: true,
                //     message: 'Đã có lỗi xảy ra, vui lòng thử lại.',
                //     color: 'error',
                // })
            }
        });
}

const initReCaptcha = () => {
    setTimeout(() => {
        appVerifier.value = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                sendOtp()
            },
            'expired-callback': () => {
                store.commit('setSnackbar', {
                    type: true,
                    message: 'Vui lòng xác thực reCaptcha.',
                    color: 'error',
                })
            }
        });
    }, 1000);

}

onMounted(() => {
    initReCaptcha()
})

const submit = async () => {
    const isValid = await formRef.value.validate()

    if (isValid.valid) {
        sendOtp()
    }
}
</script>
<style lang="scss">
.herro_banner {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
}

.wrap-main {
    width: 375px;
    height: 100vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    align-self: center;
    align-items: center;
    margin-top: 20px;
}

input::placeholder {
    color: #000;
    opacity: 1 !important;
}

.v-text-field .v-input__details {
    padding-inline: 5px !important;
}


.v-field__overlay {
    background: none !important;
}

a {
    color: blue !important;
    text-decoration: none !important;
    font-size: 14px !important;
    opacity: 1 !important;
}

.v-icon {
    --v-icon-size-multiplier: .8 !important;
}

.v-selection-control--density-default {
    --v-selection-control-size: 20px !important;
}

.v-selection-control {
    align-items: revert !important;
}


p {
    margin: 0 5px !important;
    font-size: 14px !important;
}
</style>
