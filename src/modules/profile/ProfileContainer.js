import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
    Text,
    View,
} from 'react-native';
import styles from '../../styles/styles';
import { CheckBox, Container, Content, Form, Input, Item, Left } from 'native-base';
import Header from '../../commons/Header';
import * as text from '../../constants/text';
import {formatImageLink} from '../../helper';
import { connect } from "react-redux";
import ProfilePerson from "./ProfilePerson";

class ProfileContainer extends Component {
    constructor() {
        super();
        this.state = {
                
            
        };
    }
    
    setRole(){
        if(this.props.user.role === 2) return <ProfilePerson />  ;
        else return null;
    } 
    
    render() {
        const { navigate } = this.props.navigation;
        const { user } = this.props;
        
        return (

            <Container style={styles.wrapperContainer}>
                <Header title="Hồ sơ" navigate={navigate} />
                <View style={[styles.wrapperContainer, styles.paddingLeftRight]}>
                    {this.setRole()}
                    {/* <Text style={styles.textDescriptionDark}>Cảm ơn bạn đã gửi phản hồi đến KEE Academy. Chúng tôi sẽ hỗ trợ bạn trong thời gian sớm nhất.</Text> */}
                    {/* <View style={[styles.shadow, styles.cardItem, { flexDirection: 'row', marginTop: 15 },]}>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                style={styles.avatarUserImage}
                                source={{ uri: user.avatar_url ? user.avatar_url : null}}
                            />
                        </View>
                    
                        <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10 }}>
                            <Text style={[styles.textDescriptionDark]}>{user.name ? user.name : null}</Text>
                            <Text style={{ height: 3 }} />
                            <Text style={[styles.textDescriptionGray]}>{role}</Text>
                            <Text style={{ height: 3 }} />
                            <Text style={[styles.textDescriptionGray]}>{user.email ? user.email : null}</Text>
                            <Text style={{ height: 5 }} />
                            <Text style={[styles.textNumberPhone]}>{user.phone ? user.phone : null}</Text>
                        </View>
                    </View> */}

                    {/* <View style={{ marginTop: 30 }}>
                        <Item style={styles.itemInput}>
                            <Input
                                style={[styles.inputTheme02, styles.textDescriptionCard, { fontSize: 13 }]}
                                underlineColorAndroid={"transparent"}
                                placeholder="Tiêu đề"
                                returnKeyType={'next'}
                                autoCorrect={false}
                                onChangeText={(title) => {
                                    this.setState({ title });
                                }}
                            />
                        </Item>

                        <Item style={[styles.itemInput, { marginTop: 20 }]}>
                            <Input
                                style={[styles.inputTheme02, styles.textDescriptionCard, { fontSize: 13 }]}
                                underlineColorAndroid={"transparent"}
                                placeholder="Nôi dung"
                                returnKeyType={'next'}
                                autoCorrect={false}
                                onChangeText={(content) => {
                                    this.setState({ content });
                                }}
                            />
                        </Item>
                    </View> */}
                </View>

                {/* <View style={[styles.wrapperButtonBottom, styles.shadow, { bottom: 20 }]}>
                    <TouchableOpacity style={[styles.buttonBottom, styles.shadow]}>
                        <Text style={styles.textDescriptionLight}>GỬI</Text>
                    </TouchableOpacity>
                </View> */}
            </Container>

        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.login.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileContainer)

