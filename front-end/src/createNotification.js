import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

export const createNotification = (type, title="", message="") => {
    store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
};