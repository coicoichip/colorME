import React from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, Image, TouchableOpacity, Dimensions, Modal, PanResponder, Platform } from "react-native";
import { Container, Button, Content } from "native-base";
import { STRINGS, COLORS, SIZES, FONTS } from "../../constants";
import Header from "../../commons/Header";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { productsStore } from "./productsStore";
import Select, { returnInfo, returnDate } from "./Select";
import Loading from "../../commons/Loading";

import blogStore from "../blogs/blogStore";
import ModalCheckInStudent from '../blogs/ModalCheckInStudent';
import ModalAcceptCheckIn from '../blogs/ModalAcceptCheckIn';
import OneSignal from "react-native-onesignal";
import RenderItem from "./RenderItem";
import ListProducts from "./listItem/ListProducts";
import ListProductsNew from "./listItem/ListProductsNew";
@observer
class ProductsContainer extends React.Component {
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
    productsStore.getListProductsNew(1);
    productsStore.getListProducts(1, 1);
    productsStore.getListProducts(7, 1);
    productsStore.getListProducts(30, 1);
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
    postsGrid = posts.filter((value, key) => key > 0)
    postsGrid = _.groupBy(postsGrid, ({ element, key }) => {
      return Math.floor((key - 1) / 3);
    });
    postsGrid = [posts[0], ..._.toArray(postsGrid)];
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
  scrollList() {
    this.refs.flatlist.scrollToOffset({ x: 0, y: 0, animated: true })
  }
  _renderItem = ({ item }) => (
    <RenderItem item={item} navigate={this.props.navigation.navigate} gridPost={this.gridPost()} />
  );
  render() {
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
      <Header title={STRINGS.PRODUCTS} navigate={navigate} onPress={this.scrollList.bind(this)} />
      <Content style={{ backgroundColor: COLORS.BACKGROUND_GRAY }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10 }}>
            <Text style={styles.text}> Mới nhất </Text>
            <View> </View>
            <Text style={styles.text}> Xem tất cả </Text>
          </View>
          {productsStore.productsNew.length === 0 ? <Loading />
            :
            <View>
              <View style={styles.wrapperContent}>

                <FlatList
                  style={{ marginTop: 15, flex: 1 }}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={productsStore.productsNew}
                  renderItem={({ item }) =>
                    <ListProductsNew item={item} navigate={navigate} />
                  }

                />
              </View>
            </View>
          }
        </View>
        <View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
            <Text style={styles.text}> Nổi bật hôm nay </Text>
            <View> </View>
            <Text style={styles.text}> Xem tất cả </Text>
          </View>
          {productsStore.products1.length === 0 ? <Loading />
            :
            <View>
              <View style={styles.wrapperContent}>
                <FlatList
                  style={{ marginTop: 15, flex: 1 }}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={productsStore.products1}
                  renderItem={({ item }) =>
                    <ListProducts item={item} navigate={navigate} />
                  }

                />
              </View>
            </View>
          }
        </View>
        <View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
            <Text style={styles.text}> Nổi bật tuần qua </Text>
            <View> </View>
            <Text style={styles.text}> Xem tất cả </Text>
          </View>
          {productsStore.products7.length === 0 ? <Loading />
            :
            <View>
              <View style={styles.wrapperContent}>
                <FlatList
                  style={{ marginTop: 15, flex: 1 }}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={productsStore.products7}
                  renderItem={({ item }) =>
                    <ListProducts item={item} navigate={navigate} />
                  }

                />
              </View>
            </View>
          }
        </View>
        <View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
            <Text style={styles.text}> Nổi bật tháng qua </Text>
            <View> </View>
            <Text style={styles.text}> Xem tất cả </Text>
          </View>
          {productsStore.products30.length === 0 ? <Loading />
            :
            <View>

              <View style={styles.wrapperContent}>

                <FlatList
                  style={{ marginTop: 15, flex: 1 }}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={productsStore.products30}
                  renderItem={({ item }) =>
                    <ListProducts item={item} navigate={navigate} />
                  }

                />
              </View>
            </View>
          }
        </View>
      </Content>
    </Container>;
  }
  componentDidMount() {
    OneSignal.inFocusDisplaying(2);
  }
}

const wrapperCenter = {
  justifyContent: "center",
  alignItems: "center"
};

const styles = StyleSheet.create({
  wrapperContent: {
    flex: 1,
    flexDirection: "row"
  },
  wrapperCenter: {
    ...wrapperCenter
  },
  imageFeature: {
    height: SIZES.DEVICE_WIDTH_SIZE / 1.5 - 2,
    width: SIZES.DEVICE_WIDTH_SIZE - 1.5,
    marginLeft: 1,
    marginRight: 1,
    marginBottom: 2,
    alignItems: 'center',
  },
  imageFeature2: {
    height: SIZES.DEVICE_WIDTH_SIZE / 3 - 2,
    width: SIZES.DEVICE_WIDTH_SIZE / 3 - 1.5,
    marginBottom: 2,
    marginLeft: 1,
  },
  describeLight: {
    fontSize: SIZES.DESCRIPTION_SIZE,
    color: COLORS.MAIN_COLOR,
    fontWeight: (Platform.OS === 'ios') ? '400' : 'normal',

  },
  text: {
    fontSize: 12,
    fontFamily: FONTS.MAIN_FONT_BOLD,
  },
  paddingLeft: {
    paddingLeft: 5,
  },
});

export default ProductsContainer;