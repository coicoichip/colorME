
// import React, { Component } from 'react'
// import {
//     ActivityIndicator,
//     Alert,
//     Image,
//     KeyboardAvoidingView,
//     Platform,
//     StatusBar,
//     Text,
//     TouchableOpacity, Keyboard,
//     View, TouchableWithoutFeedback
// } from 'react-native';
// import * as size from '../../styles/sizes';
// import { CheckBox, Container, Content, Form, Header, Input, Item, Label } from 'native-base';
// import { bindActionCreators } from 'redux';
// import * as registerAction from './registerAction';
// import { connect } from 'react-redux'
// import TextNullData from '../../commons/TextNullData'
// import * as color from '../../styles/colors';
// import IconDefault from '../../commons/IconDefault';
// import { WELCOME_TITLE, PR_TITLE } from '../../constants/text';
// import { NavigationActions } from 'react-navigation';
// import styles from '../../styles/styles';
// import * as loginAction from '../login/loginActions';


// class RegisterContainer extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: '',
//             name: '',
//             username: '',
//             password: '',
//             checkRules: true,
//         }
//     }
//     register(value) {
//         let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//         if (this.state.email === '' || this.state.name === '' || this.state.username === '' || this.state.password === '') {
//             Alert.alert('Có lỗi xảy ra', 'Bạn chưa nhập đủ thông tin.');
//         }
//         else if (reg.test(this.state.email) == false) {
//             Alert.alert("Có lỗi xảy ra", "Địa chỉ email không hợp lệ")
//         }
//         else if (!this.state.checkRules) {
//             Alert.alert('Có lỗi xảy ra', 'Bạn chưa đồng ý với điều khoản sử dụng.');
//         }
//         else {
//             this.props.registerAction.registerUser(value);
//         }
//     }
//     saveData(login){
//         this.props.loginAction.setDataLogin(login);
//     }
//     componentWillReceiveProps(nextProps){
//         if(nextProps.status === 200){
//             let login = {"email": this.state.email, "password": this.state.password}
//             this.saveData(login);
//             const resetAction = NavigationActions.reset({
//                 index: 0,
//                 actions: [
//                     NavigationActions.navigate({routeName: 'Login'})
//                 ]
//             })
//             this.props.navigation.dispatch(resetAction);
//         }
//     }


//     render() {
//         const { navigate } = this.props.navigation;
//         return (

//             <View style={styles.wrapperContainer}>
//                 <TouchableWithoutFeedback style={styles.wrapperContainer} onPress={Keyboard.dismiss}>

//                     <View style={{ alignItems: 'center', flex: 1 }}>

//                         <View style={[styles.wrapperCenter, { flex: 3, flexDirection: 'row' }]}>
//                             <View style={{
//                                 height: 40,
//                                 position: 'absolute',
//                                 right: -60,
//                                 top: 20
//                             }}>
//                                 <TouchableOpacity
//                                     onPress={() => this.props.navigation.goBack()}
//                                 >
//                                     <IconDefault
//                                         name={'Ionicons|md-close'}
//                                         style={{ paddingLeft: 0 }}
//                                         color={this.props.color ? this.props.color : null}
//                                     />
//                                 </TouchableOpacity>
//                             </View>
//                             <Image
//                                 resizeMode={'contain'}
//                                 source={require('../../../assets/image/colorMe.jpg')}
//                                 style={[styles.imageLogin]}
//                             />

//                         </View>

//                         <KeyboardAvoidingView
//                             behavior={Platform.OS === "ios" ? "position" : ""}
//                             style={[styles.wrapperLogin,{flex: 9.5}]}>
//                             <View style={[styles.wrapperFormLogin, styles.shadow,{paddingVertical:20}]}>
//                                 <Text style={[styles.textDescriptionDarkBold, { textAlign: 'center' }]}>{WELCOME_TITLE}</Text>
//                                 <View style={[styles.wrapperInput, { marginTop: 20 }]}>
//                                     <Text style={[styles.textDescriptionGray, { marginLeft: 30 }]}>Name</Text>
//                                     <Item style={styles.itemInputInBox}>
//                                         <Input
//                                             underlineColorAndroid="transparent"
//                                             style={[styles.inputTheme02]}
//                                             returnKeyType={'next'}
//                                             autoCorrect={false}
//                                             onChangeText={(name) => {
//                                                 this.setState({ name })
//                                             }}
//                                             value={this.state.name}
//                                         />
//                                     </Item>
//                                 </View>

//                                 <View style={[styles.wrapperInput, { marginTop: 20 }]}>
//                                     <Text style={[styles.textDescriptionGray, { marginLeft: 30 }]}>Email</Text>
//                                     <Item style={styles.itemInputInBox}>
//                                         <Input
//                                             underlineColorAndroid='rgba(0,0,0,0)'
//                                             style={[styles.inputTheme02]}
//                                             keyboardType={'email-address'}
//                                             returnKeyType={'next'}
//                                             autoCorrect={false}
//                                             onChangeText={(email) => {
//                                                 this.setState({ email })
//                                             }}
//                                             value={this.state.email}

//                                         />
//                                     </Item>
//                                 </View>

//                                 <View style={[styles.wrapperInput, { marginTop: 20 }]}>
//                                     <Text style={[styles.textDescriptionGray, { marginLeft: 30 }]}>Password</Text>
//                                     <Item style={styles.itemInputInBox}>
//                                         <Input
//                                             underlineColorAndroid='rgba(0,0,0,0)'
//                                             style={styles.inputTheme02}
//                                             returnKeyType={'next'}
//                                             autoCorrect={false}
//                                             secureTextEntry={true}
//                                             onChangeText={(password) => {
//                                                 this.setState({ password })
//                                             }}
//                                             value={this.state.password}
//                                         // onSubmitEditing={() => {
//                                         //     this.signIn()
//                                         // }}
//                                         // autoCorrect={false}
//                                         // onChangeText={(password) => {
//                                         //     this.updateData('password', password);
//                                         // }}
//                                         // value={this.props.login.password}
//                                         />
//                                     </Item>
//                                 </View>
//                                 <View style={[styles.wrapperInput, { marginTop: 20 }]}>
//                                     <Text style={[styles.textDescriptionGray, { marginLeft: 30 }]}>Username</Text>
//                                     <Item style={styles.itemInputInBox}>
//                                         <Input
//                                             underlineColorAndroid="transparent"
//                                             style={[styles.inputTheme02]}
//                                             returnKeyType={'done'}
//                                             autoCorrect={false}
//                                             onChangeText={(username) => {
//                                                 this.setState({ username })
//                                             }}
//                                             value={this.state.username}
//                                         />
//                                     </Item>
//                                 </View>
                                
//                                 <TouchableOpacity
//                                     activeOpacity={1}
//                                     style={[styles.buttonLogin, styles.shadow]}
//                                     onPress={() => {
//                                         this.register(this.state)
//                                     }}
//                                 >
//                                     {(this.props.isLoading) ? (
//                                         <ActivityIndicator
//                                             animated={true}
//                                             color={"#FFF"}
//                                             size='small'
//                                         />
//                                     ) : (
//                                             <Text style={styles.textDescriptionLightBold}>ĐĂNG KÍ</Text>
//                                         )
//                                     }
//                                 </TouchableOpacity>

//                             </View>

//                         </KeyboardAvoidingView>
//                     </View>
//                 </TouchableWithoutFeedback>

//             </View>
//         )
//     }
// }

// function mapStateToProps(state) {
//     return {
//         isLoading: state.register.isLoading,
//         status: state.register.status,
//         error: state.register.error,
       
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         registerAction: bindActionCreators(registerAction, dispatch),
//         loginAction: bindActionCreators(loginAction, dispatch),
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
