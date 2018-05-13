import { observable, action, computed } from "mobx";
import * as baseApi from "./baseApi";

export default store = new class baseStore {
    @observable isLoading = true;
    @observable isLoadingRefresh = false;
    @observable isLoadingMore = false;
    @observable total_pages = 0;
    @observable bases = [];
    @observable isLoadingProvinces = false;
    @observable error = false;

    @action
    getListBase() {
        //console.log(11);
        this.isLoading = true;
        baseApi.getBasesApi().then(res => {
            
            this.bases = res.data.data.bases;
            this.isLoading = false;
           
        }
        )
            .catch(() => {
                this.isLoading = false;
                this.error = true;
            })
        //console.log(this.isLoading);
    }
    @computed
    get baseData() {
        return this.bases.map(function (base) {
            return {
                id: base.id,
                name: base.name
            };
        });
    }
}