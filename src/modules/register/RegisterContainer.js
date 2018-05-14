import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View, ActivityIndicator, Alert, StatusBar, TouchableWithoutFeedback, Keyboard, SafeAreaView
} from 'react-native';
import { Container, Button, Text } from 'native-base';
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import * as color from '../../styles/colors';
import { InputCommon, ButtonCommon } from '../../commons';
import { resetScreen } from '../../helper';
import { observer } from 'mobx-react';
import registerStore from './registerStore';
import { observable } from 'mobx';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { dispatch } from 'react-navigation';
import { BackButton } from '../../commons';


@observer
export default class RegisterContainer extends Component {
    @observable register = {
        username: '',
        email: '',
        name: '',
        password: '',
    }
    constructor(props) {
        super(props);
    }

    onChangeData = field => value => { this.register[field] = value };

    onRegister = () => {
        const { register } = this;
        const { navigation } = this.props;
        registerStore.register(register, navigation);
        registerStore.saveData(register);
    }

    render() {
        const { register } = this;
        const { goBack } = this.props.navigation;
        return (
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, backgroundColor: COLORS.LIGHT_COLOR }}
                enableOnAndroid={true}
                extraHeight={100}
                scrollEnabled={false}
            >
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                    <Container>
                        <StatusBar
                            barStyle={COLORS.BAR_STYLE_LOGIN}
                            backgroundColor={COLORS.MAIN_COLOR}
                        />

                        {/* logo */}
                        <View style={styles.wrapperLogo}>
                            <View style={{ alignItems: 'flex-end', marginTop: -40 }}>
                                <Text style={styles.textLogoColor}>{STRINGS.LOGO_COLOR}</Text>
                                <Text style={styles.textLogoMe}>{STRINGS.LOGO_ME}</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, backgroundColor: COLORS.LIGHT_COLOR }} />

                        {/* form input */}
                        <View style={styles.contentForm}>
                            <InputCommon
                                
                                returnKeyType={'next'}
                                size={styles.input}
                                value={register.name}
                                label={STRINGS.NAME.toUpperCase()}
                                onChangeText={this.onChangeData('name')}
                            />
                            <InputCommon
                                
                                returnKeyType={'next'}
                                size={styles.input}
                                value={register.email}
                                label={STRINGS.EMAIL.toUpperCase()}
                                onChangeText={this.onChangeData('email')}
                            />
                            <InputCommon
                                returnKeyType={'send'}
                                secureTextEntry={true}
                                size={styles.input}
                                value={register.password}
                                label={STRINGS.PASSWORD.toUpperCase()}
                                onChangeText={this.onChangeData('password')}
                                onSubmitEditing = {this.onRegister}
                            />
                            <View height={30} />
                        </View>
                        <View style={styles.wrapperButton}>
                            <ButtonCommon
                                isLoading={registerStore.isLoading}
                                onPress={this.onRegister}
                                label={STRINGS.REGISTER_ACCOUNT}
                                text={{fontFamily: 'Roboto-Bold',
                                fontSize: SIZES.SUBTITLE_SIZE}}
                                style={{ elevation: 6 , shadowColor: COLORS.SHADOW_COLOR,
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.4,}}
                            />
                        </View>
                    </Container>

                </TouchableWithoutFeedback>

                <BackButton
                    goBack={goBack}
                    color={COLORS.LIGHT_COLOR}
                />

            </KeyboardAwareScrollView>
        );
    }
}

const wrapperCenter = {
    justifyContent: 'center',
    alignItems: 'center',
}

const textLogo = {
    fontFamily: FONTS.LOGO_FONT,
    backgroundColor: COLORS.NONE_COLOR,
    color: COLORS.LIGHT_COLOR,
}

const styles = StyleSheet.create({
    textLogoColor: {
        ...textLogo,
        fontSize: SIZES.LOGO_COLOR_SIZE,
    },
    textLogoMe: {
        ...textLogo,
        fontSize: SIZES.LOGO_ME_SIZE,
        marginTop: -40,
    },
    wrapperButton: {
        ...wrapperCenter,
        width: SIZES.DEVICE_WIDTH_SIZE,
        position: 'absolute',
        bottom: 40,
        paddingHorizontal: 80,
    },
    wrapperLogo: {
        ...wrapperCenter,
        flex: 1,
        backgroundColor: COLORS.MAIN_COLOR,
    },
    contentForm: {
        ...wrapperCenter,
        backgroundColor: COLORS.LIGHT_COLOR,
        width: SIZES.FORM_LOGIN_WIDTH_SIZE,
        borderRadius: SIZES.BORDER_RADIUS_CARD_SIZE,
        elevation: 5,
        bottom: 60,
        shadowColor: COLORS.SHADOW_COLOR,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        marginHorizontal: SIZES.DEVICE_WIDTH_SIZE * 0.1,
        padding: SIZES.PADDING_ELEMENT_IN_CARD,
        position: 'absolute',
    },
    input: {
        width: SIZES.DEVICE_WIDTH_SIZE * 0.7,
        marginBottom: 10,
    }

});
