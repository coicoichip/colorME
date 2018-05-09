import React, { Component } from 'react'
import {
    View, StyleSheet, Modal, Text, PanResponder
} from 'react-native';
import { COLORS, SIZES, STRINGS, FONTS } from '../../constants';
import { Input, Form, Label } from 'native-base';
import { InputCommon, ButtonCommon } from '../../commons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { observer } from "mobx-react";
import { observable } from 'mobx';

@observer
class FormFirstLoginModal extends Component {
    @observable updateInformation = {
        username: '',
        email: '',
        name: '',
        password: '',
    }
    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderGrant: this._onPanResponderGrant.bind(this),
        })
    }


    _onPanResponderGrant(event, gestureState) {
        if (event.nativeEvent.locationX === event.nativeEvent.pageX) {
            this.setState({
            });
        }
    }

    onChangeData = field => value => { this.register[field] = value };

    
    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
            >
                <View
                    style={styles.wrapperModal}
                    {...this.panResponder.panHandlers}
                >
                    {
                        <View style={styles.modal}>
                            <Text style={styles.title}>{STRINGS.UPDATE_INFORMATION}</Text>
                            <InputCommon
                                 returnKeyType={'next'}
                                 size={styles.input}
                                //  value={register.email}
                                 label={STRINGS.EMAIL.toUpperCase()}
                                 onChangeText={this.onChangeData('email')}
                            />
                        </View>
                    }
                </View>
            </Modal>

        );
    }
}

const wrapperCenter = {
    justifyContent: 'center',
    alignItems: 'center',
}

const text = {
    fontFamily: FONTS.MAIN_FONT,
    backgroundColor: COLORS.NONE_COLOR,
    color: COLORS.DARK_COLOR,
}

const styles = StyleSheet.create({
    wrapperModal: {
        ...wrapperCenter,
        flex: 1,
        backgroundColor: COLORS.BACKGROUND_MODAL
    },
    title: {
        ...text,
        fontSize: SIZES.TITLE_SIZE
    },
    modal: {
        ...wrapperCenter,
        width: SIZES.DEVICE_WIDTH_SIZE * 0.8,
        backgroundColor: COLORS.LIGHT_COLOR,
        padding: 20,
    }
});
export default FormFirstLoginModal;
