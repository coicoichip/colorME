import React from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, Image, ScrollView } from "react-native";
import { Container } from "native-base";
import { STRINGS, COLORS, SIZES } from "../../constants";
import Header from "../../commons/Header";
import { observer } from "mobx-react";
import { observable } from "mobx";
import GetProfileStore from "./profileStore";
import loginStore from "../login/loginStore";
import ListPortfolio from "./ListItem/portfolioItem"
import Loading from "../../commons/Loading";
import { formatImageLink } from "../../helper/index";




@observer
class PortfolioContaier extends React.Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    GetProfileStore.getPortfolio();
    //console.log(getProfileStore.portfolioData);

    
  }
  refreshList() {
    // GetProfileStore.getPortfolio();
  }
  loadMore() {
        if (GetProfileStore.isLoadingMore )
            return (<Loading />)
        else
            return null
    }
    work(data) {
            let u =[];
            let dataPortfolio = [];
            for(let blog of data ) {
                
                { u = { u,blog }; }
                console.log(u);
            }
            console.log(dataPortfolio);
    }

  render() {
    console.log(1);
    return <Container style={{ backgroundColor: COLORS.LIGHT_COLOR }}>
        <View style={styles.wrapperContent}>
          {/* <FlatList
                    keyExtractor={item => item.id + ''}
                    showsVerticalScrollIndicator={false}
                    data={this.work(GetProfileStore.blogs)}
                    refreshControl={
                        <RefreshControl
                            refreshing={GetProfileStore.isLoadingRefresh}
                            onRefresh={
                                () => this.refreshList()
                            }
                        />
                    }
                    ListFooterComponent={
                        this.loadMore()
                    }
                    renderItem={({ item }) =>
                         <ListPortfolio item={item} navigation={this.props.navigation} />

                    }
                /> */}
        <ScrollView>
          <View style={{ flexDirection: "row", justifyContent: "center", flex: 1 }}>
            {GetProfileStore.blogs1.map((item, id) => {
              return <View>
                  <Image resizeMode={"cover"} source={{ uri: formatImageLink(item.url) }} style={styles.imageFeature1} />
                </View>;
            })}
            {GetProfileStore.blogs2.map((item, id) => {
              return <View>
                  <Image resizeMode={"cover"} source={{ uri: formatImageLink(item.url) }} style={styles.imageFeature2} />
                </View>;
            })}
            {GetProfileStore.blogs3.map((item, id) => {
              return <View>
                  <Image resizeMode={"cover"} source={{ uri: formatImageLink(item.url) }} style={styles.imageFeature3} />
                </View>;
            })}
          </View>
          </ScrollView>
        </View>
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
    width: SIZES.DEVICE_WIDTH_SIZE / 3 - 4
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
    marginBottom: 2,
  }
});

export default PortfolioContaier;
