import { observable, action, computed } from "mobx";
import { getProducts, getProductsNew } from "./productsApi";
import { Alert, AsyncStorage } from "react-native";

export const productsStore = new class productsStore {
    @observable products = [];
    @observable datas = [];
    @observable isLoading = false;
    @observable errorProducts = false;
    @observable info_name = "";
    @observable date_name = "";
    @observable info_id = 7;
    @observable data_id = 7;
    @observable isLoadingRefresh = false;
    @observable page = 1;
    @observable testproducts = [];
    @observable isLoadingBegin = false;
    @observable data = {};
    
    @action
    getListProducts(filter, page) {
        this.page == 1 ? this.isLoadingBegin = true : this.isLoadingBegin = false;
        this.isLoading = true;
        getProducts(filter, page).then(res => {
            this.isLoadingBegin = false
            this.isLoading = false;
            this.errorProducts = false;
            if(this.page == 1) this.data = res.data.products[0];
            this.products = this.page == 1 ? res.data.products.filter(e => e.id !== this.data.id) :  [...this.products, ...res.data.products];
            this.testproducts = res.data.products;
            console.log(res.data, "aaaa");
        })
            .catch(err => {
                this.isLoading = false;
                this.errorProducts = true;
            })
    }
    @action
    getListProductsNew(page) {
        this.page == 1 ? this.isLoadingBegin = true : this.isLoadingBegin = false;
        this.isLoading = true;
        getProductsNew(page).then(res => {
            this.isLoadingBegin = false
            this.isLoading = false;
            this.errorProducts = false;
            if(this.page == 1) this.data = res.data.products[0];
            this.products = this.page == 1 ? res.data.products.filter(e => e.id !== this.data.id) :  [...this.products, ...res.data.products];
            this.testproducts = res.data.products;
        })
            .catch(err => {
                this.isLoading = false;
                this.errorProducts = true;
            })
    }
}