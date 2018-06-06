import { observable, action, computed } from "mobx";
import { deviceApi } from "./deviceApi";
import { Alert, AsyncStorage } from "react-native";
import DeviceInfo from 'react-native-device-info';
export default deviceStore = new class DeviceStore {
    @observable isLoading = false;
    @observable error = false;
    
    @action 
    checkDevice(){
        // this.isLoading = true;
        // let device = {
        //     device_id : DeviceInfo.getUniqueID(),
        //     device_name : DeviceInfo.getDeviceName(),
        //     device_os : DeviceInfo.getSystemName(),
        // }
        // console.log(device)
        // deviceApi().then(res => {

        // })
    }
    
}