import { observable, action, computed } from "mobx";
import { supportApi } from "./supportApi";
import { Alert, AsyncStorage } from "react-native";
import Analytics from 'appcenter-analytics';
import { STRINGS } from "../../constants";

export const SupportStore = new class SupportStore {
    @observable info = {
        title: "",
        message: "",
        email: "",
        name: "",
    };
    @observable isLoading = false;

    @action
    support(value) {
        this.isLoading = true;
        supportApi(value)
            .then(res =>  {
                Alert.alert(
                    'Cảm ơn những ý kiến đóng góp của bạn',
                    'Chúng tôi sẽ cố gắng sớm khắc phục trong thời gian sớm nhất!'
                )
                this.isLoading = false;
                Analytics.trackEvent(STRINGS.ACTION_REPORT)
            })
            .catch(err =>  {
                Alert.alert("Có lỗi xảy ra", "Mời bạn kiểm tra lại đường truyền");
                this.isLoading = false;
                Analytics.trackEvent(STRINGS.ACTION_REPORT_FAIL)
            })

    }
}
