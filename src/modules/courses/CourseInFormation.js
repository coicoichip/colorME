import React, { Component } from 'react';
import {
    Text, View, Image, Platform
} from 'react-native';

import {
    Body, CardItem, Header, Container, Button,
    Left, Right, Item
} from 'native-base';
import styles from '../../styles/styles';
import BackButton from '../../commons/BackButton';
import Loading from '../../commons/Loading';
import { coursesStore } from './coursesStore';
import { observer } from "mobx-react";
import * as color from '../../styles/colors'
import * as size from '../../styles/sizes';
import WebViewAutoHeight from '../../commons/WebViewAutoHeight';
// import ParallaxScrollView from 'react-native-parallax-scroll-view';
@observer
class CourseInformation extends Component {
    componentWillMount() {
        const { params } = this.props.navigation.state;
        coursesStore.getCourseInformation(params.linkId);
    } 

    render() {
        const { goBack, navigate } = this.props.navigation;
        return (
            coursesStore.isLoadingCoursesInformation
                ?
                <Container style={[styles.wrapperContainer, styles.wrapperCenter]}>
                    <Loading />
                </Container>
                :
                <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {/* <ParallaxScrollView
                        backgroundColor={color.BACKGROUND_COLOR}
                        showsVerticalScrollIndicator={false}
                        headerBackgroundColor={color.BACKGROUND_COLOR}
                        stickyHeaderHeight={size.STICKY_HEADER_HEIGHT}
                        parallaxHeaderHeight={110}
                        backgroundSpeed={10}
                        renderBackground={() => (
                            <View style={styles.wrapperImageInGetFull}>
                                <View key="background">
                                </View>
                            </View>
                        )}
                        renderForeground={() => (
                            <View key="parallax-header" style={[styles.parallaxHeaderTitle]}>
                                <View style={{ marginBottom: 20 }}>
                                    <CardItem style={[styles.cardHeader, styles.noPaddingTopBottom]}>
                                        <Item style={styles.noBorder}>
                                            <Text style={styles.titlePost}>
                                                {coursesStore.courseInformation.name}
                                            </Text>
                                        </Item>
                                    </CardItem>
                                </View>
                            </View>
                        )}
                        renderStickyHeader={() => (
                            <View key="sticky-header" style={styles.stickySection}>
                                <View style={styles.iconInDrawerNav}>
                                    <Left style={Platform.OS === 'ios' ? { marginTop: 20 } : { marginTop: 0 }}>
                                        <Body>
                                            <Text style={styles.titleSmallDarkGrayBold}>
                                                {coursesStore.courseInformation.name}
                                            </Text>
                                        </Body>
                                    </Left>
                                </View>
                            </View>
                        )}
                        renderFixedHeader={() => (
                            <View key="fixed-header" style={styles.iconInDrawerNav}>
                                <Left style={Platform.OS === 'ios' ? { marginTop: 20 } : { marginTop: 10 }}>
                                    <BackButton goBack={goBack} />
                                </Left>
                            </View>
                        )}
                    >
                        <View>
                            <Image
                                resizeMode={'cover'}
                                source={{
                                    uri: coursesStore.courseInformation.image_url,
                                    width: size.deviceWidth,
                                    height: 200
                                }} />
                        </View>
                        <View>
                            <WebViewAutoHeight source={coursesStore.courseInformation.detail && coursesStore.courseInformation.detail != '' ? coursesStore.courseInformation.detail : ''} />
                        </View>
                    </ParallaxScrollView> */}


                    <Button full style={{ backgroundColor: color.MAIN_COLOR }}
                        onPress={() => navigate('LearnRegister', { classes: coursesStore.courseInformation.classes, avatar_url: coursesStore.courseInformation.icon_url })}
                    >
                        <Text style={styles.titleNormalLight}>Đăng ký ngay</Text>
                    </Button>
                </Container>
        );
    }
}


export default CourseInformation;