import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Button, Text } from "native-base";
import Header from "../../commons/Header";
import styles from "../../styles/styles";
import { STRINGS, SIZES, COLORS } from "../../constants";

class ProfileContainer extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.wrapperContainer}>
        <Header title={STRINGS.PROFILE_TITLE_HEADER} navigate={navigate} />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            width: SIZES.DEVICE_WIDTH_SIZE / 3
          }}
        >
        </View>
      </View>
    );
  }
}
export default ProfileContainer;
