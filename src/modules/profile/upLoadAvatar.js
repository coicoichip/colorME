import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import {observer} from "mobx-react";
import {observable} from "mobx"
import getProfileStore from "./profileStore";
import {uploadImage, formatImageLink} from "../../helper/index";
import ImagePicker from 'react-native-image-crop-picker';
@observer
class Avatar extends React.Component {
    @observable percent = 0;
    @observable isUploading = false;
    @observable files_length = 0;
    @observable uploaded_image_quantity = 0;
constructor(props){
    super(props)
    this.completeHandler = this.completeHandler.bind(this);
    this.progressHandler = this.progressHandler.bind(this);
}
completeHandler(event) {
    
    const data = JSON.parse(event.target.responseText);
    // console.log(event.target.responseText);
    getProfileStore.user.avatar_url = data.url
    this.percent = 0;
    this.isUploading = !(this.uploaded_image_quantity + 1 === this.files_length);
    this.uploaded_image_quantity+=1;
}

progressHandler(event) {
    const percent = Math.round(100 * event.loaded / event.total);
    this.percent = percent
}
customUpload(file){ 
         let source = { uri: file.path,
    name: file.filename ? file.filename : 'image.png',
    type: 'image/*',}
    uploadImage(source, this.completeHandler, this.progressHandler, () => {
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
      }).then(image => {
        this.customUpload(image)
        this.percent = 0;
        this.isUploading = true;
        this.files_length = 1;
        this.uploaded_image_quantity = 0;
      });
}

render(){
    return(
        // getProfileStore.isLoading ?
        // null
        // :
        <TouchableOpacity style={{ alignItems: 'center' }} activeOpacity={0.8} onPress = {() => this.handleFileUpload()}>
        <View >
          <Image source={{ uri: formatImageLink(getProfileStore.user.avatar_url) }} style={{ width: 100, height: 100, borderRadius: 50 }} />
        </View>
        <Text style={{ marginTop: 15 }}>Thay đổi ảnh đại diện </Text>
      </TouchableOpacity>
    )
}
}
export default Avatar