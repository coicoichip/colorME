import React from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, Image, TouchableOpacity } from "react-native";
import { Container } from "native-base";
import { STRINGS, COLORS, SIZES } from "../../constants";
import Header from "../../commons/Header";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { productsStore } from "./productsStore";
import Select, { returnInfo, returnDate } from "./Select";
import Loading from "../../commons/Loading";
import { formatImageLink } from "../../helper/index";
import TextNullData from "../../commons/TextNullData";
import Analytics from 'appcenter-analytics';

@observer
class ProductsContainer extends React.PureComponent {
  @observable info_id = "";
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    productsStore.page = 1;
    productsStore.getListProducts(7, 1);
    //console.log(getProfileStore.portfolioData);
  }
  async pickInfo() {
    productsStore.page = 1;
    await returnInfo(info_value => { productsStore.info_id = info_value; });
    productsStore.info_id == 7 ? productsStore.getListProducts(productsStore.data_id, 1)
      : productsStore.getListProductsNew(1);
  }
  async pickDate() {
    productsStore.page = 1;
    await returnInfo(date_value => { productsStore.data_id = date_value });
    productsStore.getListProducts(productsStore.data_id, 1);
  }
  gridPost() {
    if (productsStore.products.length !== 0)
      posts = productsStore.products.map((post, index) => {
        return {
          ...post,
          key: index
        }
      });

    postsGrid = _.groupBy(posts, ({ element, key }) => {
      return Math.floor(key / 3);
    });
    postsGrid = _.toArray(postsGrid);
    return postsGrid;
  }
  getMoreProducts() {
    productsStore.page = productsStore.page + 1;
    productsStore.testproducts.length !== 0 ?
      productsStore.info_id == 0 ? productsStore.getListProductsNew(productsStore.page)
        : productsStore.getListProducts(productsStore.data_id, productsStore.page)
      : null
  }
  loadMore() {
    if (productsStore.isLoading && productsStore.page >= 1)
      return (<Loading />)
    else
      return null
  }
  // refreshList() {
  //   productsStore.page = 1;
  //   productsStore.info_id == 0 ? productsStore.getListProductsNew(1)
  //     : productsStore.getListProducts(productsStore.data_id, 1)
  // }

  render() {
    const { navigate } = this.props.navigation;
    return <Container style={{ backgroundColor: COLORS.LIGHT_COLOR }}>
      <Header title={STRINGS.PRODUCTS} navigate={navigate} />
      <View style={{ flexDirection: 'row' }}>
        <Select haveInfo functionInfo={() => this.pickInfo()} />
        <Select haveDate={productsStore.info_id == 0 ? null : 'haveDate'} functionDate={() => this.pickDate()} />
      </View>
      {productsStore.products.length === 0 || productsStore.isLoadingBegin ? <Loading />
        :
        <View style={styles.wrapperContent}>
          <FlatList
            keyExtractor={(item, key) => key}
            showsVerticalScrollIndicator={false}
            data={this.gridPost()}
            onEndReached={() => this.getMoreProducts()}
            refreshControl={
              <RefreshControl
                refreshing={productsStore.isLoadingRefresh}
              // onRefresh={
              //   () => this.refreshList()
              // }
              />
            }
            ListFooterComponent={
              this.loadMore()
            }
            renderItem={({ item }) => {
              return (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  {
                    item.map((post, index) => {
                      return (
                        <Text> {index}</Text>
                        // <TouchableOpacity activeOpacity={0.8}
                        //   key={index}
                        //   onPress={() => {
                        //     this.props.navigation.navigate('DetailBlog', { slug: post.slug, kind: post.kind })
                        //     Analytics.trackEvent(`${STRINGS.ACTION_GO_DETAIL_PRODUCT} -> ${post.name}`, {});
                        //   }}>
                        //   <Image resizeMode={"cover"} source={{ uri: formatImageLink(post.thumb_url) }} style={styles.imageFeature2} />
                        // </TouchableOpacity>
                      )
                    })
                  }
                </View>

              )
            }

            }
          />
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
