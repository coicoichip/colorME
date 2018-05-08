import React, {Component} from 'react';
import {
    Text, View, Image, Platform
} from 'react-native';

import {
    Body, CardItem, Header, Container, Button,
    Left, Right, Spinner, Item
} from 'native-base';
import styles from '../../styles/styles';
// import BackButton from '../../commons/BackButton';
// import parallaxStyle from '../../styles/parallaxStyle';
// import * as color from '../../styles/color'
// import * as size from '../../styles/size';
// import WebViewAutoHeight from '../../commons/WebViewAutoHeight';
// import ParallaxScrollView from 'react-native-parallax-scroll-view';

class LearnRegisterContainer extends Component {
    // componentDidMount() {
    //     const {params} = this.props.navigation.state;
    //     this.props.courseAction.getCourseInformation(params.linkId);
    // }

    render() {
        // const {goBack, navigate} = this.props.navigation;
        // const {isLoadingCourseInformation, courseInformation} = this.props;
        return (
            <Container style={styles.wrapperContainer}>
                {/* {
                    isLoadingCourseInformation
                        ?
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Spinner
                                color={color.gray}/>
                        </View>
                        // courseInformation.image_url
                        :
                        <ParallaxScrollView
                            backgroundColor={color.backGround}
                            showsVerticalScrollIndicator={false}
                            headerBackgroundColor={color.backGround}
                            stickyHeaderHeight={size.STICKY_HEADER_HEIGHT}
                            parallaxHeaderHeight={110}
                            backgroundSpeed={10}
                            renderBackground={() => (
                                <View style={part.wrapperImageInGetFull}>
                                    <View key="background">
                                    </View>
                                </View>
                            )}
                            renderForeground={() => (
                                <View key="parallax-header" style={[parallaxStyle.parallaxHeaderTitle]}>
                                    <View style={{marginBottom: 20}}>
                                        <CardItem style={[part.cardHeader, part.noPaddingTopBottom]}>
                                            <Item style={part.noBorder}>
                                                <Text style={part.titlePost}>
                                                    {courseInformation.name}
                                                </Text>
                                            </Item>
                                        </CardItem>
                                    </View>
                                </View>
                            )}
                            renderStickyHeader={() => (
                                <View key="sticky-header" style={parallaxStyle.stickySection}>
                                    <View style={part.iconInDrawerNav}>
                                        <Left style={Platform.OS === 'ios' ? {marginTop: 20} : {marginTop: 0}}>
                                            <Body>
                                            <Text style={part.titleSmallDarkGrayBold}>
                                                {courseInformation.name}
                                            </Text>
                                            </Body>
                                        </Left>
                                    </View>
                                </View>
                            )}
                            renderFixedHeader={() => (
                                <View key="fixed-header" style={part.iconInDrawerNav}>
                                    <Left style={Platform.OS === 'ios' ? {marginTop: 20} : {marginTop: 10}}>
                                        <BackButton goBack={goBack}/>
                                    </Left>
                                </View>
                            )}
                        >
                            <View style={{marginBottom: 20}}>
                                <Image
                                    resizeMode={'cover'}
                                    source={{
                                        uri: courseInformation.image_url,
                                        width: size.wid,
                                        height: 180
                                    }}/>
                            </View>
                            <View>
                            <WebViewAutoHeight source={courseInformation.detail && courseInformation.detail != '' ? courseInformation.detail : ''}/>
                                </View>
                        </ParallaxScrollView>
                }

                <Button full style={{backgroundColor: color.main}}
                        onPress={
                            isLoadingCourseInformation
                                ?
                                () => {
                                }
                                :
                                () => navigate('LearnRegister', {classes: courseInformation.classes, avatar_url : courseInformation.icon_url})
                        }
                >
                    <Text style={part.titleNormalLight}>Đăng ký ngay</Text>
                </Button> */}
            </Container>
        );
    }
}


// function mapStateToProps(state) {
//     return {
//         token: state.login.token,
//         courseInformation: state.getCourse.courseInformation,
//         isLoadingCourseInformation: state.getCourse.isLoadingCourseInformation,
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         courseAction: bindActionCreators(courseAction, dispatch),
//     }
// }

export default LearnRegisterContainer;