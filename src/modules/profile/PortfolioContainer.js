import React from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, Image, ScrollView, TouchableOpacity } from "react-native";
import { Container } from "native-base";
import { STRINGS, COLORS, SIZES } from "../../constants";
import Header from "../../commons/Header";
import { observer } from "mobx-react";
import { observable } from "mobx";
import getProfileStore from "./profileStore";
import TextNullData from "../../commons/TextNullData";
// import ListPortfolio from "./ListItem/portfolioItem"
import Loading from "../../commons/Loading";
import { formatImageLink } from "../../helper/index";




@observer
class PortfolioContaier extends React.Component {
  constructor(props) {
    super(props);
  }
  gridPost() {
    if (getProfileStore.blogs.length !== 0)
      posts = getProfileStore.blogs.map((post, index) => {
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
  refreshList() {
    // GetProfileStore.getPortfolio();
  }
  loadMore() {
    if (getProfileStore.isLoadingMore)
      return (<Loading />)
    else
      return null
  }
  render() {
    // console.log(getProfileStore.posts)

    return <Container style={{ backgroundColor: COLORS.LIGHT_COLOR }}>
      {getProfileStore.isLoadingPortfolio ?
        <Loading />
        :
        getProfileStore.blogs.length !== 0
          ?
          <View style={styles.wrapperContent}>
            <FlatList
              keyExtractor={(item, key) => key}
              showsVerticalScrollIndicator={false}
              data={this.gridPost()}
              refreshControl={
                <RefreshControl
                  refreshing={getProfileStore.isLoadingRefresh}
                  onRefresh={
                    () => this.refreshList()
                  }
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
                          <TouchableOpacity activeOpacity={0.8}
                            key={index}
                            onPress={() => this.props.navigation.navigate('DetailBlog', { slug: post.slug, kind: post.kind })}>
                            <Image resizeMode={"cover"} source={{ uri: formatImageLink(post.url) }} style={styles.imageFeature2} />

                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>

                )
              }

              }
            />
          </View>
          :
          <TextNullData text={"Bạn chưa tham gia khoá học nào"} />
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
    height: SIZES.DEVICE_WIDTH_SIZE / 3 - 4,
    width: SIZES.DEVICE_WIDTH_SIZE / 3 - 4,
    marginBottom: 2
  },
  imageFeature2: {
    height: SIZES.DEVICE_WIDTH_SIZE / 3 - 4,
    width: SIZES.DEVICE_WIDTH_SIZE / 3 - 4,
    marginLeft: 2,
    marginBottom: 2
  },
  imageFeature3: {
    height: SIZES.DEVICE_WIDTH_SIZE / 3 - 4,
    width: SIZES.DEVICE_WIDTH_SIZE / 3 - 4,
    marginLeft: 2,
    marginBottom: 2
  }
});

export default PortfolioContaier;