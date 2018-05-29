import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Container } from "native-base";
import { STRINGS, COLORS, SIZES } from "../../../constants";
import { formatImageLink } from "../../../helper/index";

class ListPortfolio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;
    console.log(item);
    return (
      <View>
          <Text> {item.id_render}</Text>
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
    backgroundColor: COLORS.GRA
  },
  wrapperCenter: {
      ...wrapperCenter,
  },
});

export default ListPortfolio;