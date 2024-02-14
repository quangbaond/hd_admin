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
                    <VBtn icon size="small" :to="'/admin/users/' + item._id" class="mx-2" color="primary">
                        <VIcon>ri-eye-line</VIcon>
                    </VBtn>
                    <VBtn size="small" icon class="mx-2" @click="deleteUser(item)" color="error">
                        <VIcon>ri-delete-bin-line</VIcon>
                    </VBtn>
                    <VBtn size="small" icon class="mx-2" v-if="item.isWain" @click="pauseAudio(item)" color="error">
                        <VIcon>ri-mic-line</VIcon>
                    </VBtn>
                </template>
            </VDataTable>
        </VCardText>
    </VCard>
</template>

<script setup>
import canhbao from '@/assets/audio/canhbao.mp3';
import axios from '@/plugins/axios';
import { socket } from '@/plugins/socket';
import '@core/scss/template/index.scss';
import '@layouts/styles/index.scss';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toast-notification';
const users = ref([])
const toast = useToast();
const headers = [
    {
        title: 'Họ và tên',
        align: 'start',
        sortable: false,
        value: 'fullName',
    },
    { title: 'Số CCCD', value: 'cccd' },
    { title: 'Tên ngân hàng', value: 'bankName' },
    { title: 'Số điện thoại', value: 'numberPhone' },
    { title: 'Hành động', value: 'actions', sortable: false },
]

const audio = new Audio(canhbao);

const statusBackground = ref(null);

onMounted(async () => {
    const { data } = await axios.get('/get-user');
    users.value = data;

    socket.on('send-data-admin', async (data) => {
        console.log('send-data-admin', data);
        // push lên đầu mảng
        const user = await axios.get('/get-user');
        users.value = user.data;
        users.value[0].isWain = true;
        playAudio();
        // css background body nhấp nháy màu đỏ liên tục
        toast.open({
            message: 'Người dùng đầu tiên đang đợi...',
            type: 'success',
            position: 'top',
        });
    });
});
const deleteUser = async (user) => {
    console.log(user);
    users.value = users.value.filter((item) => item._id !== user._id);
    axios.delete(`/delete-user/${user._id}`).then((res) => {
        toast.open({
            message: 'Xóa người dùng thành công',
            type: 'success',
            position: 'top',
        });
    }).catch((err) => {
        toast.open({
            message: 'Xóa người dùng thất bại',
            type: 'error',
            position: 'top',
        });
    })

}
const playAudio = () => {
    audio.play();
}

const pauseAudio = (item) => {
    audio.pause();
    users.value[0].isWain = false;
}
</script>
