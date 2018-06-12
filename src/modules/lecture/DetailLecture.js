import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Linking, Picker } from 'react-native';
import { Container } from 'native-base';
import Loading from '../../commons/Loading';
import { STRINGS, COLORS, SIZES, FONTS } from '../../constants';
import WebViewAutoHeight from '../../commons/WebViewAutoHeight';
import styles from '../../styles/styles';
import * as size from '../../styles/sizes';
import { lectureStore } from "./lectureStore";
import IconDefault from '../../commons/IconDefault';
import { observer } from "mobx-react"

@observer
class DetailLecture extends Component {
    constructor(props) {
        super(props);
        const { lessons } = this.props.navigation.state.params;
        this.state = { lessons, choose: '' };
    }

    componentDidMount() {
        const { lessons } = this.props.navigation.state.params;
        lectureStore.getDetailLecture(lessons[0].id);
    }

    render() {
        const { goBack } = this.props.navigation;
        const { lessons } = this.state;
        return (
            <Container style={styles.wrapperContainer}>
                <View style={[styles.wrapperHeader, styles.paddingLeftRight, { flexDirection: 'row' }]}>
                    {/* <View >
                        <Text style={[styles.textHeaderScreen, { fontSize: 17 }]} numberOfLines={1} onPress={() => this.refs.detailLecture.scrollTo({ x: 0, y: 0, animated: true })} >
                            {lectureStore.detailLectureLession.name}
                        </Text>
                    </View> */}
                    <Picker
                        selectedValue={this.state.choose}
                        style={{ flex: 8, justifyContent: 'center' }}
                        onValueChange={(itemValue, itemIndex) => {
                            console.log(itemValue);
                            lectureStore.getDetailLecture(itemValue);
                            this.setState({ choose: itemValue })
                        }}>
                        {
                            lessons.map((item) => (
                                <Picker.Item label={item.name} value={item.id} />
                            ))
                        }
                    </Picker>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
                        onPress={() => goBack()}
                    >
                        <View style={{ alignItems: 'flex-end' }}>
                            <IconDefault
                                name={'Ionicons|md-close'}
                                style={{ padding: 0 }}
                                color={this.props.color ? this.props.color : null}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView ref={'detailLecture'} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    {
                        lectureStore.isLoadingDetailLecture
                            ?
                            <Loading />
                            :

                            <View style={{ flex: 1 }}>


                                <WebViewAutoHeight source={lectureStore.detailLectureLession ? lectureStore.detailLectureLession.detail || '' : ''} />
                            </View>
                    }
                </ScrollView>
            </Container>
        );
    }
}



export default DetailLecture