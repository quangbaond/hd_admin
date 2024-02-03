import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

export default function (app) {
  app.use(ToastPlugin)
}

export { ToastPlugin }
