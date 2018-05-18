import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Button, Text, Container, Item, Content } from "native-base";
import Header from "../../commons/Header";
import styles from "../../styles/styles";
import Loading from '../../commons/Loading';
import { STRINGS, SIZES, COLORS } from "../../constants";

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
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.wrapperContainer}>
        <Header title={STRINGS.PROFILE_TITLE_HEADER} navigate={navigate} />
        {this.__renderCategory()}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          {
            this.state.isLoading ?
              <Loading />
              :
              <View>

                <TouchableOpacity activeOpacity={0.8} style={{ marginBottom: 15 }}>

                  <Image source={{ uri: 'http://i.9mobi.vn/cf/images/2015/03/nkk/nhung-hinh-anh-dep-20.jpg' }} style={{width : 400, height: 300}}/>
                  
                  <View style={[styles.contentCardImageInformation, styles.paddingLeftRight]}>
                    <Text numberOfLines={1} style={styles.emailNameModuleEmail}>PS 33.1</Text>
                    <Text style={styles.textDescriptionDark}>4/8 buổi</Text>
                    <TouchableOpacity style={{ justifyContent: 'center' }}>
                      <View style={{
                        justifyContent: 'center', alignItems: 'flex-end'
                      }}>
                        <Text style={[styles.textDescriptionDark, styles.buttonRegister]}>Bảo lưu</Text>
                      </View>
                    </TouchableOpacity>

                  </View>
                </TouchableOpacity>
                <View style={styles.footerCard}>
                </View>
              </View>
          }
        </View>
      </View>
    );
  }
}
export default ProfileContainer;
