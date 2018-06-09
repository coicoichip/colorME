import React from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";
import IconDefault from "../../commons/IconDefault";
import _ from "lodash";
import { formatImageLink } from "../../helper/index";
import { showLocation } from "react-native-map-link";
import { STRINGS, COLORS, SIZES, FONTS } from "../../constants";

class ListBase extends React.Component {
  constructor() {
    super();
  }
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.item, this.props.item);
  }

  render() {
    const { item } = this.props;
    //console.log(item);
    return (
      <View>
        <TouchableOpacity activeOpacity={1} style={[styles.marginLeftRight]}>
          <View style={[styles.imageFeature]}>
            <Image
              resizeMode={"cover"}
              source={{ uri: formatImageLink(item.avatar_url) }}
              style={styles.imageFeature}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              showLocation({
                latitude: item.latitude,
                longitude: item.longitude
              })
            }
            activeOpacity={0.8}
            style={[styles.categoryInImage]}
          >
            <IconDefault
              name="Entypo|direction"
              size={SIZES.ICON_SIZE}
              color="#FFF"
              style={[{ elevation: 5 }]}
            />
          </TouchableOpacity>
          <View style={{ marginTop: 15 }}>
            <Text numberOfLines={1} style={styles.textTitleCard}>
              {item.name}
            </Text>
            <Text style={styles.textDescriptionCard} numberOfLines={1}>
              {item.address !== null
                ? item.address.trim()
                : "Không có mô tả cho bài viết này"}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={[
            {
              width: SIZES.DEVICE_WIDTH_SIZE,
              height: 25,
              backgroundColor: "#f2efef"
            }
          ]}
        />
      </View>
    );
  }
}

const wrapperCenter = {
  justifyContent: "center",
  alignItems: "center"
};

const styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_COLOR
  },
  wrapperCenter: {
    ...wrapperCenter
  },
  textDescriptionDark: {
    color: "#000",
    fontFamily: FONTS.MAIN_FONT,
    fontSize: 12
  },
  marginLeftRight: {
    marginBottom: SIZES.DEVICE_HEIGHT_SIZE / 35
  },
  imageFeature: {
    height: SIZES.DEVICE_HEIGHT_SIZE / 3,
    backgroundColor: COLORS.BORDER_COLOR
  },
  categoryInImage: {
    ...wrapperCenter,
    position: "absolute",
    bottom: 30,
    right: SIZES.DEVICE_WIDTH_SIZE / 16,
    backgroundColor: COLORS.GREEN_COLOR,
    borderRadius: 50,
    height: SIZES.DEVICE_WIDTH_SIZE / 8,
    width: SIZES.DEVICE_WIDTH_SIZE / 8,
    overflow: "hidden"
  },
  textTitleCard: {
    color: COLORS.DARK_COLOR,
    fontFamily: FONTS.MAIN_FONT,
    fontSize: 20,
    marginLeft: SIZES.DEVICE_WIDTH_SIZE / 12
  },
  textDescriptionCard: {
    color: COLORS.GRAY_COLOR,
    fontFamily: FONTS.MAIN_FONT,
    fontSize: 12,
    marginLeft: SIZES.DEVICE_WIDTH_SIZE / 12,
    backgroundColor: COLORS.NONE_COLOR
  }
});
export default ListBase;
