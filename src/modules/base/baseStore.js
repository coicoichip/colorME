import {observable, action, computed} from "mobx";
import * as baseApi from "./baseApi";

export const store = new class baseStore {
    @observable isLoading = true;
    @observable isLoadingRefresh: false;
    @observable isLoadingMore= false;
    @observable total_pages= 0;
    @observable bases= [];
    @observable isLoadingProvinces= false;
    @observable error= false;

    @action
    getListBase(page, token) {
        //console.log(11);
        this.isLoading = true;
        baseApi.getBasesApi(page, token).then(res => {
                console.log(1);
                this.isLoading = false;
                console.log(1);
                this.bases = res.data.bases;
                this.total_pages = res.data.paginator.total_pages;
                console.log(this.bases);
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
        return this.bases.map(function(base) {
            return {
                id: base.id,
                name: base.name
            };
        });
    }
}