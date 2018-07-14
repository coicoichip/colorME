import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    StyleSheet, PanResponder, Modal, Platform
} from 'react-native';
import * as color from '../../styles/colors';
import * as size from '../../styles/sizes';
import { Container } from 'native-base';
import Header from '../../commons/Header';
import { STRINGS, COLORS, SIZES, FONTS } from "../../constants";
import Loading from '../../commons/Loading';
import { observer } from "mobx-react";
import { observable } from "mobx"
import Error from '../../commons/Error';
import TextNullData from '../../commons/TextNullData';
import {productsStore} from './productsStore';
import ListDetailProducts from './ListDetailProducts';
import IconDefault from '../../commons/IconDefault';

@observer
class DetailProductsContainer extends Component {

    UNSAFE_componentWillMount() {
        const { params } = this.props.navigation.state;
        console.log(params.filter + "<<<");
        params.filter !== 0 ? productsStore.getListDetailProducts(params.filter, 1)
        : productsStore.getListDetailProductsNew(1);
    }
    getMoreProducts() {
        const { params } = this.props.navigation.state;
        if (productsStore.testproducts.length !== 0) {
          productsStore.page = productsStore.page + 1;
          params.filter == 0 ? productsStore.getListDetailProductsNew(productsStore.page)
            : productsStore.getListDetailProducts(params.filter, productsStore.page)
        }
      }
      loadMore() {
        if (productsStore.isLoading && productsStore.page >= 1)
          return (<Loading />)
        else
          return null
      }
    renderSubject() {
        if (productsStore.isLoading == true) {
            return <Loading />
        }
        // if (blogStore.error) {
        //     return (
        //         <Error onPress={() => blogStore.getBlog(params.kind, 1, this.tag)} />
        //     )
        // }
        if (productsStore.products.length !== 0 && productsStore.isLoading == false) {
            return (
                <FlatList
                    ref={'listBlog'}
                    keyExtractor={item => item.id + ''}
                    showsVerticalScrollIndicator={false}
                    data={productsStore.products}
                    onEndReached={() => this.getMoreProducts()}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={productsStore.isLoading && productsStore.products.length == 0}
                    //         onRefresh={
                    //             () => productsStore.getListDetailProductsNew(1)
                    //         }
                    //     />
                    // }
                    renderItem={({ item }) =>
                        <ListDetailProducts item={item} navigation={this.props.navigation}/>
                    }
                    ListFooterComponent={
                        this.loadMore()
                    }
                />
            )
        }
        // if (blogStore.blogs.length == 0 && blogStore.isLoading == false && blogStore.error == false) {
        //     return (
        //         <TextNullData text={NULL_DATA} />
        //     )
        // }
    }
    scrollList() {
        this.refs.listBlog.scrollToOffset({ x: 0, y: 0, animated: true })
    }
    titleProducts(){
        const { params } = this.props.navigation.state;
        switch(params.filter){
            case 0 : {
                return('Mới nhất');
                break;
            }
            case 1 : {
                return('Nổi bật hôm nay');
                break;
            }
            case 7 : {
                return('Nổi bật tuần qua');
                break;
            }
            case 30 : {
                return('Nổi bật tháng qua');
                break;
            }
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        
        return (
            <Container style={styles.wrapperContainer}>
                <View style={[styles.wrapperHeader, styles.paddingLeftRight, { flexDirection: 'row' }]}>
                    <TouchableOpacity style={{ flex: 8, justifyContent: 'center' }}>
                        <Text style={[styles.textHeaderScreen, { fontSize: 20, fontWeight: 'bold' }]} >{this.titleProducts()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <View style={{ alignItems: 'flex-end' }}>
                            <IconDefault
                                name={'Ionicons|md-close'}
                                style={{ padding: 0 }}
                                color={this.props.color ? this.props.color : null}
                            />
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 1}}>
                    {this.renderSubject()}
                </View>
            </Container>
        );
    }
}
export default DetailProductsContainer
const isIOS = Platform.OS === 'ios';
const wrapperCenter = {
    alignItems: 'center',
    justifyContent: 'center',
};


const styles = StyleSheet.create({
    wrapperContainer: {
        flex: 1,
        backgroundColor: color.BACKGROUND_COLOR,
    },
    paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    wrapperHeader: {
        height: isIOS ? 80 : 60,
        paddingTop: isIOS ? 20 : 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: color.BACKGROUND_COLOR,
    },
    textHeaderScreen: {
        color: color.TEXT_COLOR,
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 25,
    },
});