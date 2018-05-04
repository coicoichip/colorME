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

class ProfilePerson extends Component {
    constructor() {
        super();
        this.state = {
                
            
        };
    }
    
    
    
    render() { 
        const { user } = this.props;
        return (

            <View style={[styles.shadow, styles.cardItem, { flexDirection: 'row', marginTop: 15 },]}>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                style={styles.avatarUserImage}
                                source={{ uri: user.avatar_url ? user.avatar_url : null}}
                            />
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10 }}>
                            <Text style={[styles.textDescriptionDark]}>{user.name ? user.name : null}</Text>
                            <Text style={{ height: 3 }} />
                            <Text style={[styles.textDescriptionGray]}>CEO</Text>
                            <Text style={{ height: 3 }} />
                            <Text style={[styles.textDescriptionGray]}>{user.email ? user.email : null}</Text>
                            <Text style={{ height: 5 }} />
                            <Text style={[styles.textNumberPhone]}>{user.phone ? user.phone : null}</Text>
                        </View>
                    </View>

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

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePerson)

