import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { STRINGS, COLORS, SIZES } from '../../constants';
import Header from '../../commons/Header';
class NewsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={{ backgroundColor: COLORS.LIGHT_COLOR }}>
                <Header title={STRINGS.NEWS_TITLE_HEADER} navigate={navigate} />
                <View style={styles.wrapperContent}>
                </View>

            </Container>
        );
    }
}

const wrapperCenter = {
    justifyContent: 'center',
    alignItems: 'center',
}



const styles = StyleSheet.create({
    wrapperContent: {
        flex: 1,
        backgroundColor: COLORS.LIGHT_COLOR
    },
})

export default NewsContainer