import React, {Component} from 'react';
import {
    TouchableOpacity, Alert, View,Image,ActivityIndicator, Platform, FlatList, StyleSheet
} from 'react-native';
import {Content, Text} from "native-base"
import Icon from './Icon';
import * as color from '../styles/colors';
import ImagePicker from 'react-native-image-crop-picker'; 
import {uploadImage, formatImageLink,} from "../helper/index";
import { STRINGS, COLORS, SIZES, FONTS } from '../constants/';
class UpLoadImage extends Component{
    constructor() {
        super();
        this.state = {
             percent: 0,
             isUploading: false,
             files_length: 0,
             uploaded_image_quantity: 0
    };
    this.completeHandler = this.completeHandler.bind(this);
    this.progressHandler = this.progressHandler.bind(this);
}

completeHandler(event) {
    console.log(event.target.responseText);
    const data = JSON.parse(event.target.responseText);
    console.log(event.target.responseText);
    let uploaded_image_quantity = 1 + this.state.uploaded_image_quantity;
    this.props.handleFileUpload([ data.url,...this.props.image_urls ]);
    this.setState({
        percent: 0,
        isUploading: !(uploaded_image_quantity === this.state.files_length),
        uploaded_image_quantity : uploaded_image_quantity
    });
}

progressHandler(event) {
    const percent = Math.round(100 * event.loaded / event.total);
    this.setState({
        percent : percent
    });
}
customUpload(file){ 
         let source = { uri: file.path,
    name: file.filename ? file.filename : 'image.png',
    type: 'image/*',}
    uploadImage( this.props.token, source, this.completeHandler, this.progressHandler, () => {
        Alert.alert("Thông báo", "Có lỗi xảy ra")
    })
}
handleFileUpload() {
    ImagePicker.openPicker({
        compressImageMaxWidth : 1000,
        compressImageMaxHeight : 1000,
        multiple: true,
        includeBase64 : true,
        includeExif: true,
      }).then(images => {
          console.log(images)
        this.setState({
            percent: 0,
            isUploading: true,
            files_length: images.length,
            uploaded_image_quantity: 0
        });
        images.map((file) => this.customUpload(file)
       );
      });
}
deleteImage(item) {
   let image_urls = this.props.image_urls.filter(i => i !== item)
   this.props.handleFileUpload(image_urls);
}
    render(){
        const{image_urls} = this.props;
        return(
            <View style = {{marginTop : 10, marginLeft : 20}}>
                <Content  showsVerticalScrollIndicator = {false}>
                  {image_urls && image_urls.length !== 0 ? 
                  <FlatList
                     style = {{flex : 1}}
                     showsVerticalScrollIndicator = {false}
                     data = {image_urls}
                     renderItem = {({item}) => 
                    <TouchableOpacity
                    activeOpacity={0.9}
                    style={[ styles.marginTopBottom, {marginTop : 20, borderRadius : 15}]}
                >
                    <View style={[styles.imageFeature, styles.shadow, {marginRight : 20}]}>
                        <Image
                            source={{uri: formatImageLink(item)}}
                            style={[styles.imageFeature]}
                        />
                    </View>
                    <TouchableOpacity 
                     onPress = {() => this.deleteImage(item)}
                     style={[ styles.shadow, {
                        position : 'absolute',
                        backgroundColor : color.MAIN_COLOR,
                        justifyContent : 'center', alignItems :'center',
                        borderRadius : 10,
                        height : 20, 
                        width : 20,
                        right: 15,
                        top: -10}]}>
                    <Icon name="Ionicons|ios-close-outline"
                                  size={25}
                                  color={"#FFF"}
                            />
                        </TouchableOpacity>
                </TouchableOpacity>
                     }/>
                :null     
            }     
                    </Content>
                    <TouchableOpacity
                    style={[styles.buttonCheckin, styles.shadow, {marginTop : 30, width : 150}]}
                    onPress={() => {
                        this.handleFileUpload()
                    }}
                >
                 {(this.state.isUploading || this.state.percent > 0) ? (
                            <ActivityIndicator
                                animated={true}
                                color={"#FFF"}
                                style={{
                                    height: 20,
                                }}
                                size='small'
                            />
                        ) : (
                            <Text style={[styles.paddingRight, styles.textDescriptionLight]}>Thêm ảnh mô tả</Text>
                        )
                        }
                </TouchableOpacity>
                </View>
        );
    }
}

export default UpLoadImage
const wrapperCenter = {
    justifyContent: 'center',
    alignItems: 'center',
}
const text = {
    fontFamily: 'Roboto-Regular',
    backgroundColor: 'transparent',
    color: COLORS.DARK_COLOR,
    fontSize: SIZES.TEXT_BUTTON_SIZE,
}
const shadowOpt = {
    width: 160,
    height: 170,
    color: "#000",
    border: 2,
    radius: 3,
    opacity: 0.2,
    x: 0,
    y: 3,
    style: { marginVertical: 5 }
};
const buttonFull = {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    padding: 10,
};
const styles = StyleSheet.create({
    wrapperContainer: {
        flex: 1,
        backgroundColor: COLORS.LIGHT_COLOR,
    },
    paddingLeftRight: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    imageFeature: {
        borderRadius: 15,
        height: SIZES.DEVICE_HEIGHT_SIZE / 3,
        backgroundColor: "#FFF",
    },
    buttonCheckin: {
        ...buttonFull,
        borderRadius: 5,
        height: 40,
        marginTop: 20,
        width: SIZES.DEVICE_WIDTH_SIZE * 0.9,
        backgroundColor: COLORS.MAIN_COLOR,
    },
    textDescriptionLight: {
        color: '#FFF',
        fontFamily: FONTS.MAIN_FONT,
        fontSize: 14,
    },
});