import React from "react";
import {View, TouchableOpacity, Image, StyleSheet, Platform } from "react-native";
import { STRINGS, COLORS, SIZES } from "../../constants";
import {formatImageLink} from "../../helper";
import _ from "lodash";
import blogStore from "../blogs/blogStore";
class RenderItem extends React.Component {
    renderItem() {
      const { item } = this.props;
      const { navigate } = this.props;
      if(_.isEqual(item, this.props.gridPost[0])){
        return (
          <View>
          <TouchableOpacity activeOpacity={0.8} style={{ alignItems: 'center' }}
            onPress={() => blogStore.isLoadingDetail == false ? navigate('DetailBlog', { slug: item.slug, kind: item.kind, id: item.id }) : {}}>
            <Image resizeMode={"cover"} source={{ uri: formatImageLink(item.thumb_url) }} style={styles.imageFeature} />
          </TouchableOpacity>
        </View>
        )
      }
     else return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {
            item.map((post, index) => {
              return (
                <TouchableOpacity activeOpacity={0.8}
                  key={index}
                  onPress={() => blogStore.isLoadingDetail == false ? navigate('DetailBlog', { slug: post.slug, kind: post.kind, id: post.id }) : {}}>
                  <Image resizeMode={"cover"} source={{ uri: formatImageLink(post.thumb_url) }} style={styles.imageFeature2} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      )
    }
    
    render(){
        return (
            <View>
                {this.renderItem()}
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
  export default RenderItem;