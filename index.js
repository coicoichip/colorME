// import { AppRegistry } from 'react-native';
// import App from './src/App';


// console.disableYellowBox = true;
// console.disableRedBox = true;
// AppRegistry.registerComponent('colorMe', () => App);

import {AppRegistry, Modal, PanResponder, StyleSheet, Text, View, Dimensions, StatusBar} from 'react-native';
import App from './src/App';
import CodePush from 'react-native-code-push';
import React, {Component} from 'react';
import Loading from './src/commons/Loading'
import {SIZES} from "./src/constants"

export default class ColorME extends Component {
    constructor() {
        super()
        this.state = {
            isDownLoading: false,
            isInstalled: false,
            downloadUpdate: 0,
            modalUpdate: false,
        }
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderGrant: this._onPanResponderGrant.bind(this),
        })
    }

    componentDidMount() {
        CodePush.sync({
                updateDialog: true,
                installMode: CodePush.InstallMode.IMMEDIATE
            },
            (status) => {
                switch (status) {
                    case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                        this.setState({isDownLoading: true, isInstalled: false, modalUpdate: true});
                        break;
                    case CodePush.SyncStatus.INSTALLING_UPDATE :
                        this.setState({isDownLoading: false, isInstalled: true, modalUpdate: true});
                        break;
                    case CodePush.SyncStatus.UPDATE_INSTALLED :
                        this.setState({isDownLoading: true, isInstalled: true, modalUpdate: false});
                    default :
                        break;
                }
            },


            ({receivedBytes, totalBytes}) => {
                this.setState({downloadUpdate: (receivedBytes / totalBytes) * 100});
            }
        );
    }

    checkUpdate() {
        if (this.state.isDownLoading && this.state.isInstalled == false) {
            return "Đang tải..." + parseInt((this.state.downloadUpdate)) + "%";
        }
        if (this.state.isDownLoading == false && this.state.isInstalled) {
            return "Đang cài đặt...";
        }
        if (this.state.isDownLoading && this.state.isInstalled) {
            return "Cập nhật thành công "
        }
    }

    _onPanResponderGrant(event, gestureState) {
        if (event.nativeEvent.locationX === event.nativeEvent.pageX) {
            this.setState({
                modalUpdate: false,
            });
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor='#b2b2b2'
                />
                <App/>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalUpdate}
                    position={'center'}
                >
                    <View style={styles.wrapperModalUpdate}
                          {...this.panResponder.panHandlers}>
                        <View style={styles.modalUpdate}>
                            {
                                this.state.isDownLoading
                                    ?
                                    <Loading/>
                                    :
                                    <View/>
                            }
                            <Text style={[styles.textUpdate, {paddingBottom: 10}]}>{this.checkUpdate()}</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
let styles = StyleSheet.create({
    wrapperModalUpdate : {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalUpdate : {
        borderRadius: 10,
        width: SIZES.DEVICE_WIDTH_SIZE * 0.75,
        height: SIZES.DEVICE_HEIGHT_SIZE / 4,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textUpdate: {
        fontSize: 14,
        color: 'gray',
        fontFamily: 'Roboto-Regular',
    }
})
console.disableYellowBox = true;
console.disableRedBox = true;
let codePushOptions = {checkFrequency: CodePush.CheckFrequency.MANUAL};
ColorME = CodePush(codePushOptions)(ColorME);
AppRegistry.registerComponent('colorMe', () => ColorME);
