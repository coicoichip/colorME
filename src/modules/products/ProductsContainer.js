import React from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, Image, ScrollView, TouchableOpacity } from "react-native";
import { Container } from "native-base";
import { STRINGS, COLORS, SIZES } from "../../constants";
import Header from "../../commons/Header";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { productsStore } from "./productsStore";
import Select, {returnInfo, returnDate} from "./Select";
// import loginStore from "../login/loginStore";
// import ListPortfolio from "./ListItem/portfolioItem"
import Loading from "../../commons/Loading";
import { formatImageLink } from "../../helper/index";




@observer
class ProductsContainer extends React.Component {
  @observable info_id = "";
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    productsStore.getListProducts(7);
    //console.log(getProfileStore.portfolioData);


  }
  async pickInfo() {
    await returnInfo(info_value => { productsStore.info_id = info_value;});
    productsStore.info_id == 7 ? productsStore.getListProducts(productsStore.data_id)
    : productsStore.getListProductsNew();
  }
  async pickDate() {
    await returnInfo(date_value => { productsStore.data_id = date_value;});
    productsStore.getListProducts(productsStore.data_id)
  }

  render() {
    const { navigate } = this.props.navigation;
    return <Container style={{ backgroundColor: COLORS.LIGHT_COLOR }}>
      <Header title={STRINGS.PRODUCTS} navigate={navigate} />
      <View style ={{flexDirection: 'row'}}>
        <Select haveInfo functionInfo={() => this.pickInfo()} />
        <Select haveDate = {productsStore.info_id == 0? null : 'haveDate'} functionDate={() => this.pickDate()} />
      </View>
      {productsStore.isLoading ? <Loading />
        :
        <View style={styles.wrapperContent}>
          <ScrollView style={[{ marginTop: 20, }]}>
            <View style={{ flexDirection: "row", justifyContent: "center", flex: 1 }}>
              <View style={[{ flex: 1 }]}>
                {productsStore.products1.map((item, id) => {
                  return <TouchableOpacity activeOpacity={0.8}
                    key={id}
                    onPress={() => this.props.navigation.navigate('DetailBlog', { slug: item.slug, kind: item.kind })}>
                    <Image resizeMode={"cover"} source={{ uri: formatImageLink(item.thumb_url) }} style={styles.imageFeature1} />
                  </TouchableOpacity>;
                })}
              </View>
              <View style={[{ flex: 1 }]}>

                {productsStore.products2.map((item, id) => {
                  return <TouchableOpacity activeOpacity={0.8}
                    key={id}
                    onPress={() => this.props.navigation.navigate('DetailBlog', { slug: item.slug, kind: item.kind })}>
                    <Image resizeMode={"cover"} source={{ uri: formatImageLink(item.url) }} style={styles.imageFeature2} />
                  </TouchableOpacity>;
                })}
              </View>
              <View style={[{ flex: 1 }]}>
                {productsStore.products3.map((item, id) => {
                  return <TouchableOpacity activeOpacity={0.8}
                    key={id}
                    onPress={() => this.props.navigation.navigate('DetailBlog', { slug: item.slug, kind: item.kind })}>
                    <Image resizeMode={"cover"} source={{ uri: formatImageLink(item.url) }} style={styles.imageFeature3} />
                  </TouchableOpacity>;
                })}
              </View>
            </View>
          </ScrollView>
        </View>
      }
    </Container>;
  }
}

const wrapperCenter = {
  justifyContent: "center",
  alignItems: "center"
};

const styles = StyleSheet.create({
  wrapperContent: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_COLOR,
    flexDirection: "row"
  },
  wrapperCenter: {
    ...wrapperCenter
  },
  imageFeature1: {
    height: SIZES.DEVICE_WIDTH_SIZE / 3 - 2,
    width: SIZES.DEVICE_WIDTH_SIZE / 3 - 2,
    marginBottom: 2
  },
  imageFeature2: {
    height: SIZES.DEVICE_WIDTH_SIZE / 3 - 2,
    width: SIZES.DEVICE_WIDTH_SIZE / 3 - 2,
    marginBottom: 2,
    marginLeft: 1,
  },
  imageFeature3: {
    height: SIZES.DEVICE_WIDTH_SIZE / 3 - 2,
    width: SIZES.DEVICE_WIDTH_SIZE / 3 - 2,
    marginLeft: 1,
    marginBottom: 2
  }
});

export default ProductsContainer;
