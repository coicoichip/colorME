import { observable, action, computed } from "mobx";
import { getProducts, getProductsNew } from "./productsApi";
import { Alert, AsyncStorage } from "react-native";

export const productsStore = new class productsStore {
    @observable products = [];
    @observable isLoading = false;
    @observable errorProducts = false;
    @observable info_name = "";
    @observable date_name = "";
    @observable products1 = [];
    @observable products2 = [];
    @observable products3 = [];
    @observable info_id = 7;
    @observable data_id = 7;
    @action
    getListProducts(filter) {
        this.isLoading = true;
        getProducts(filter).then(res => {

            this.isLoading = false;
            this.errorProducts = false;
            this.products = res.data.products.map((item, id) => {return { ...item, id_render: id + 1}});
            this.products1 = this.products.filter(e => {return e.id_render % 3 == 1});
            this.products2 = this.products.filter(e => {return e.id_render % 3 == 2});
            this.products3 = this.products.filter(e => {
              return e.id_render % 3 == 0;
            });

        })
            .catch(err => {
                this.isLoading = false;
                this.errorProducts = true;
            })
    }
    @action
    getListProductsNew() {
        this.isLoading = true;
        getProductsNew().then(res => {

            this.isLoading = false;
            this.errorProducts = false;
            this.products = res.data.products.map((item, id) => {return { ...item, id_render: id + 1}});
            this.products1 = this.products.filter(e => {return e.id_render % 3 == 1});
            this.products2 = this.products.filter(e => {return e.id_render % 3 == 2});
            this.products3 = this.products.filter(e => {
              return e.id_render % 3 == 0;
            });

        })
            .catch(err => {
                this.isLoading = false;
                this.errorProducts = true;
            })
    }
}