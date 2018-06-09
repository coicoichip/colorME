import { observable, action, computed } from "mobx";
import { deviceApi } from "./deviceApi";
import { Alert, AsyncStorage } from "react-native";
import DeviceInfo from 'react-native-device-info';
import blogStore from "../blogs/blogStore";
import { resetScreen } from '../../helper';
import loginStore from "../login/loginStore";

export default deviceStore = new class DeviceStore {
    @observable isLoading = false;
    @observable error = false;
    
    @action 
    checkDevice(class_id, class_lesson_id, mac_wifi){
        this.isLoading = true;
        let device = {
            device_id : DeviceInfo.getUniqueID(),
            device_name : DeviceInfo.getModel(),
            device_os : DeviceInfo.getSystemName(),
        }
        console.log(device)
        deviceApi(device).then( res => {
            console.log(res.data)
           this.isLoading = false;
            if(res.data.status != 0){
                blogStore.attendance(class_id, class_lesson_id, mac_wifi)
            }
            else {
                Alert.alert("Thông báo", "Đây là máy của " + res.data.message.device_user.name + ", bạn không thể điểm danh vào máy này", [
                    { text: "OK" , onPress : () => blogStore.modalVisible = false}
                ])
            }
        }
    )
        .catch(err => {
            this.isLoading = false;
            console.log(err)
        })
    }
    
}