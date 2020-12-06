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
import { StyledComponent } from 'styled-components'

const StyledTO = styled(TouchableOpacity)`
    height: ${props => props.theme.button.height};
    backgroundColor:${props => props.theme.button.backgroundColor};
    justifyContent: center;
    alignItems: center;
`
const StyleText = styled(Text)`
    color: ${props => props.theme.button.titleColor}
`
const Btn: React.FC<{ onPress: (e?:any) => void, title: string, toStyle?: {}, txtStyle?: {} }> = ({ onPress, title, toStyle, txtStyle }) => {

    return (
        <StyledTO
            style={toStyle}
            onPress={onPress}>
            <StyleText style={txtStyle}>{title}</StyleText>
        </StyledTO>
    )

}


const StyledBtn: React.FC<{ onPress: () => void, title: string, Outer: StyledComponent<typeof TouchableOpacity, any, {}, never>, Inner: React.FC }>
    = ({ onPress, title, Outer, Inner }) => {
        return (
            <Outer onPress={onPress}>
                <Inner>{title}</Inner>
            </Outer>
        )
    }


export {
    Btn,
    StyledBtn
} 