import React from "react";
import {View, TouchableOpacity, Image, StyleSheet, Platform } from "react-native";
import { STRINGS, COLORS, SIZES } from "../../constants";
import {observer} from "mobx-react";
import {productsStore} from "./productsStore";
import {formatImageLink} from "../../helper"
@observer
export default class HeaderProducts extends React.Component {
    
    render() {
      const {navigate} = this.props;
      return (
        <View>
          <TouchableOpacity activeOpacity={0.8} style={{ alignItems: 'center' }}
            onPress={() => blogStore.isLoadingDetail == false ? navigate('DetailBlog', { slug: productsStore.data.slug, kind: productsStore.data.kind, id: productsStore.data.id }) : {}}>
            <Image resizeMode={"cover"} source={{ uri: formatImageLink(productsStore.data.thumb_url) }} style={styles.imageFeature} />
          </TouchableOpacity>
        </View>
      )
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
    imageFeature: {
      height: SIZES.DEVICE_WIDTH_SIZE / 1.5 - 2,
      width: SIZES.DEVICE_WIDTH_SIZE - 1.5,
      marginLeft: 1,
      marginRight: 1,
      marginBottom: 2,
      alignItems: 'center',
    },
    imageFeature2: {
      height: SIZES.DEVICE_WIDTH_SIZE / 3 - 2,
      width: SIZES.DEVICE_WIDTH_SIZE / 3 - 1.5,
      marginBottom: 2,
      marginLeft: 1,
    },
    describeLight: {
      fontSize: SIZES.DESCRIPTION_SIZE,
      color: COLORS.MAIN_COLOR,
      fontWeight: (Platform.OS === 'ios') ? '400' : 'normal',
  
    },
    paddingLeft: {
      paddingLeft: 5,
    },
  });
  