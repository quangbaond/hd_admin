<template>
  <v-app>
    <v-main>
      <router-view />
      <Alert />
      <div id="cc">
        <a target="_blank" href="https://zaloapp.com/qr/p/nlav22bk3vq6?src=qr" title="Zalo" id="nutzalo">ZALO</a>

      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import Alert from '@/components/Alert.vue';
</script>
<style lang="scss">
#nutzalo {
  border: none;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  background: #0065f7;
  color: #fff !important;
  font-weight: bold;
  position: fixed;
  display: grid;
  align-items: center;
  text-align: center;
  font-size: 12px;
  padding: 0px;
  top: 50%;
  right: 10px;
  animation: zalo 1000ms infinite;
  z-index: 999999999;
}

#nutzalo:hover {
  opacity: 0.6;
}

@keyframes zalo {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  33.3333% {
    transform: translate3d(0, 0, 0) scale(0.9);
  }

  66.6666% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  0% {
    box-shadow: 0 0 0 0px #0065f7, 0 0 0 0px #0065f7;
  }

  50% {
    transform: scale(0.8);
  }

  100% {
    box-shadow: 0 0 0 15px rgba(0, 210, 255, 0), 0 0 0 30px rgba(0, 210, 255, 0);
  }
}
</style>

