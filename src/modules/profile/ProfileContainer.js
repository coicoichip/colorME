import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Button, Text, Container, Item, Content } from "native-base";
import Header from "../../commons/Header";
import styles from "../../styles/styles";
import Loading from '../../commons/Loading';
import { observer } from "mobx-react";
import getProfileStore from "./profileStore";
import { InputCommon } from '../../commons';
import { formatImageLink } from "../../helper/index"
import { STRINGS, SIZES, COLORS } from "../../constants";

@observer
class ProfileContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      category: 0,
      categogyArr: [
        { title: "Tiến độ", index: 0 },
        { title: "Thông tin", index: 1 },
        { title: "Điểm danh", index: 2 },
      ]
    }
  }
  componentWillMount() {
    getProfileStore.getProfile();

  }
  onChangeData = field => value => {
    getProfileStore.user[field] = value;
  };
  chooseCategory(index) {
    this.setState({ category: index })
    if (index === 0) {
      this.setState({ isLoading: true })
      setTimeout(() => this.setState({ isLoading: false }), 500)
      // coursesStore.data = coursesStore.subjects.filter(e =>
      //   e.categories[0].id === 1
      // )
    }
    if (index === 1) {
      this.setState({ isLoading: true })
      setTimeout(() => this.setState({ isLoading: false }), 500)
    }
    else {
      this.setState({ isLoading: true })
      setTimeout(() => this.setState({ isLoading: false }), 500)
      // coursesStore.data = coursesStore.subjects.filter(e =>
      //   e.categories[0].id === 2
      // )
    }
  }
  __renderCategory = () => {
    return (
      <View height={40} >
        <Content
          horizontal={true}
          style={[styles.paddingLeftRight]}>
          {
            this.state.categogyArr.map((item, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.9}
                  onPress={() => this.chooseCategory(item.index)}
                >
                  <View style={{ marginRight: 10 }}>
                    <Text style={this.state.category == item.index ? styles.buttonSelected : styles.buttonNotSelect}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </Content>
      </View>
    )
  }
  renderProfile() {
    const { user } = getProfileStore;
    return (

      <View style={[styles.paddingLeftRight, { flex: 1, marginTop: 10 }]}>
        <TouchableOpacity style={{ alignItems: 'center' }} activeOpacity={0.8}>
          <View >
            <Image source={{ uri: formatImageLink(getProfileStore.user.avatar_url) }} style={{ width: 100, height: 100, borderRadius: 50 }} />
          </View>
          <Text style={{ marginTop: 15 }}>Thay đổi ảnh đại diện </Text>
        </TouchableOpacity>
        <View style={styles.contentForm}>
          <InputCommon
            returnKeyType={'next'}
            size={styles.input}
            value={getProfileStore.user.name}
            onChangeText={this.onChangeData('name')}
          />

          <InputCommon
            returnKeyType={'go'}
            size={styles.input}
            value={getProfileStore.user.phone}
            onChangeText={this.onChangeData('phone')}
            onSubmitEditing={this.signInWithAccount}
          />
          <View height={30} />
        </View>
      </View>
    )

  }
  render() {
    console.log(formatImageLink(getProfileStore.user.avatar_url));
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.wrapperContainer}>
        <Header title={STRINGS.PROFILE_TITLE_HEADER} navigate={navigate} />
        {this.__renderCategory()}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          {this.renderProfile()}
        </View>
      </View>
    );
  }
}
export default ProfileContainer;
