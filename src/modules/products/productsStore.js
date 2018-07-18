import { observable, action, computed } from "mobx";
import { getProducts, getProductsNew } from "./productsApi";
import { Alert, AsyncStorage } from "react-native";
import { unlikePostApi, likePostApi } from "../comment/commentApi";

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
    @observable headerProducts = [];

    @observable productsNew = [];
    @observable isLoadingProductsNew = false;
    @observable errorProductsNew = false;

    @observable products1 = [];
    @observable products7 = [];
    @observable products30 = [];

    @action
    getListProductsNew(page) {
        this.isLoadingProductsNew = true;
        getProductsNew(page).then(res => {
            this.isLoadingProductsNew = false;
            this.errorProductsNew = false;

            this.productsNew = res.data.products;
            this.productsNew = this.productsNew.map((data, index) => { return ({ ...data, index: index }) });
            this.productsNew = this.productsNew.filter((data) => { return (data.index < 4) })
        })
            .catch(err => {
                this.isLoadingProductsNew = false;
                this.errorProductsNew = true;
            })
    }
    @action
    getListProducts(filter, page) {
        this.isLoading = true;
        getProducts(filter, page).then(res => {
            this.isLoading = false;
            this.errorProducts = false;
            if (filter == 1) {
                this.products1 = res.data.products;
                this.products1 = this.products1.map((data, index) => { return ({ ...data, index: index }) });
                this.products1 = this.products1.filter((data) => { return (data.index < 4) })
            }
            if (filter == 7) {
                this.products7 = res.data.products;
                this.products7 = this.products7.map((data, index) => { return ({ ...data, index: index }) });
                this.products7 = this.products7.filter((data) => { return (data.index < 4) })
            }
            if (filter == 30) {
                this.products30 = res.data.products;
                this.products30 = this.products30.map((data, index) => { return ({ ...data, index: index }) });
                this.products30 = this.products30.filter((data) => { return (data.index < 4) })
            }
        })
            .catch(err => {
                this.isLoading = false;
                this.errorProducts = true;
            })
    }


    @action
    getListDetailProducts(filter, page) {
        this.page == 1 ? this.isLoadingBegin = true : this.isLoadingBegin = false;
        this.isLoading = true;
        getProducts(filter, page).then(res => {
            this.isLoadingBegin = false
            this.isLoading = false;
            this.errorProducts = false;

            this.products = this.page == 1 ? res.data.products : [...this.products, ...res.data.products];
            this.testproducts = res.data.products;
        })
            .catch(err => {
                this.isLoading = false;
                this.errorProducts = true;
            })
    }
    @action
    getListDetailProductsNew(page) {
        this.page == 1 ? this.isLoadingBegin = true : this.isLoadingBegin = false;
        this.isLoading = true;
        getProductsNew(page).then(res => {
            this.isLoadingBegin = false
            this.isLoading = false;
            this.errorProducts = false;
            this.products = this.page == 1 ? res.data.products : [...this.products, ...res.data.products];
            this.testproducts = res.data.products;
        })
            .catch(err => {
                this.isLoading = false;
                this.errorProducts = true;
            })
    }
    @action
    likePost(item) {
        let index = this.products.findIndex(products => products.id == item.id);
        console.log(index + "<<<<");
        if (item.liked) {
            unlikePostApi(item.id).then((res) => {
                // console.log(res)
                item.likes_count = item.likes_count - 1;
                item.liked = false;
                this.products[index] = item;
                this.products = this.products.map(item => { return item });
            }).catch(err => console.log(err))
        }
        else {
            likePostApi(item.id).then((res) => {
                item.likes_count = item.likes_count + 1;
                item.liked = true;
                this.products[index] = item;
                this.products = this.products.map(item => { return item });
            }).catch(err => console.log(err))
        }
    }
}