import React, { Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Button,
    Text,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import styled from 'styled-components/native'

const Btn: React.FC<{ onPress: () => void, title: string, toStyle: {}, txtStyle: {} }> = ({ onPress, title, toStyle, txtStyle }) => {

    return (
        <TouchableOpacity
            style={toStyle}
            onPress={onPress}>
            <Text style={txtStyle}>{title}</Text>
        </TouchableOpacity>
    )

}

const StyledButton: React.FC<{ onPress: () => void, title: string, Outer: React.FC, Inner: React.FC }>
    = ({ onPress, title, Outer, Inner }) => {
        return (
            <Outer>
                <Inner>{title}</Inner>
            </Outer>
        )
    }


export default Btn