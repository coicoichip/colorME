import React from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, Image, TouchableOpacity, Dimensions, Modal, PanResponder, Platform } from "react-native";
import { Container } from "native-base";
import { STRINGS, COLORS, SIZES } from "../../constants";
import Header from "../../commons/Header";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { productsStore } from "./productsStore";
import Select, { returnInfo, returnDate } from "./Select";
import Loading from "../../commons/Loading";
import { formatImageLink } from "../../helper/index";
import blogStore from "../blogs/blogStore";
import ModalCheckInStudent from '../blogs/ModalCheckInStudent';
import ModalAcceptCheckIn from '../blogs/ModalAcceptCheckIn';
import TextNullData from "../../commons/TextNullData";

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
class RenderItem extends React.Component {
  render() {
    const { item } = this.props;
    const { navigate } = this.props;
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {
          item.map((post, index) => {
            return (
              <TouchableOpacity activeOpacity={0.8}
                key={index}
                onPress={() => blogStore.isLoadingDetail == false ? navigate('DetailBlog', { slug: post.slug, kind: post.kind }) : {}}>
                <Image resizeMode={"cover"} source={{ uri: formatImageLink(post.thumb_url) }} style={styles.imageFeature2} />
              </TouchableOpacity>
            )
          })
        }
      </View>
    )

  }
}
@observer
class ProductsContainer extends React.PureComponent {
  @observable info_id = "";
  constructor() {
    super();
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderGrant: this.onPanResponderGrant.bind(this),
    });
  }

  UNSAFE_componentWillMount() {
    productsStore.page = 1;
    productsStore.getListProducts(7, 1);
    //console.log(getProfileStore.portfolioData);
    blogStore.checkAttendance()

  }
  onPanResponderGrant(event, gestureState) {
    if (event.nativeEvent.locationX === event.nativeEvent.pageX) {
      blogStore.modalVisible = false;
      blogStore.modalVisible1 = false;
    }
  }
  setModalContact = (visible) => {
    blogStore.modalVisible = visible;
  }
  async pickInfo() {
    productsStore.products = [];
    productsStore.page = 1;
    if (productsStore.products.length == 0) {
      await returnInfo(info_value => { productsStore.info_id = info_value; });
      productsStore.info_id == 7 ? productsStore.getListProducts(productsStore.data_id, 1)
        : productsStore.getListProductsNew(1);
    }
  }
  async pickDate() {
    productsStore.products = [];
    productsStore.page = 1;
    if (productsStore.products.length == 0) {
      await returnInfo(date_value => { productsStore.data_id = date_value });
      productsStore.getListProducts(productsStore.data_id, 1);
    }
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
    if (productsStore.testproducts.length !== 0) {
      productsStore.page = productsStore.page + 1;
      productsStore.info_id == 0 ? productsStore.getListProductsNew(productsStore.page)
        : productsStore.getListProducts(productsStore.data_id, productsStore.page)
    }
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
  _renderItem = ({ item }) => (
    <RenderItem item={item} navigate={this.props.navigation.navigate} />
  );
  render() {
    console.log("render" + productsStore.data.id);
    const { navigate } = this.props.navigation;
    return <Container style={{ backgroundColor: COLORS.LIGHT_COLOR }}>
      <Modal
        onRequestClose={() => {
          blogStore.modalVisible = false;
        }}
        presentationStyle="overFullScreen"
        animationType="fade"
        transparent
        visible={blogStore.modalVisible}
      >
        <View
          style={{ flex: 1, backgroundColor: '#00000040', justifyContent: 'center', alignItems: 'center' }}
          {...this.panResponder.panHandlers}
        >
          <ModalCheckInStudent />
        </View>
      </Modal>
      <Modal
        onRequestClose={() => {
          blogStore.modalVisible1 = false;
        }}
        presentationStyle="overFullScreen"
        animationType="fade"
        transparent
        visible={blogStore.modalVisible1}
      >
        <View
          style={{ flex: 1, backgroundColor: '#00000040', justifyContent: 'center', alignItems: 'center' }}
          {...this.panResponder.panHandlers}
        >
          <ModalAcceptCheckIn />
        </View>
      </Modal>
      <Header title={STRINGS.PRODUCTS} navigate={navigate} />
      <View style={{ flexDirection: 'row' }}>
        <Select haveInfo functionInfo={() => this.pickInfo()} />
        <Select haveDate={productsStore.info_id == 0 ? null : 'haveDate'} functionDate={() => this.pickDate()} />
      </View>
      {productsStore.products.length === 0 || productsStore.isLoadingBegin ? <Loading />
        :
        <View style={styles.wrapperContent}>
          <FlatList
            removeClippedSubviews
            // disableVirtualization
            keyExtractor={(item, key) => key}
            initialNumToRender={1}
            showsVerticalScrollIndicator={false}
            data={this.gridPost()}
            onEndReachedThreshold={50}
            onEndReached={() => this.getMoreProducts()}
            refreshControl={
              <RefreshControl
                refreshing={false}
              // onRefresh={
              //   () => this.refreshList()
              // }
              />
            }
            ListHeaderComponent= {() => {return(
              <TouchableOpacity activeOpacity={0.8} style={{alignItems: 'center'}}
                onPress={() => blogStore.isLoadingDetail == false ? navigate('DetailBlog', { slug: productsStore.data.slug, kind: productsStore.data.kind }) : {}}>
                <Image resizeMode={"cover"} source={{ uri: formatImageLink(productsStore.data.thumb_url) }} style={styles.imageFeature} />
              </TouchableOpacity>
            )}}
            ListFooterComponent={
              this.loadMore()
            }
            renderItem={this._renderItem}
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
  imageFeature: {
    height: SIZES.DEVICE_WIDTH_SIZE / 1.5 - 2,
    width: SIZES.DEVICE_WIDTH_SIZE/1.5 - 1.5,
    marginBottom: 10,
    marginLeft: 1,
    alignItems: 'center',
  },
  imageFeature2: {
    height: SIZES.DEVICE_WIDTH_SIZE / 3 - 2,
    width: SIZES.DEVICE_WIDTH_SIZE / 3 - 1.5,
    marginBottom: 2,
    marginLeft: 1,
  },
});

export default ProductsContainer;