import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
} from 'react-native';
import styled from 'styled-components/native'

const StyledButton:React.FC<{ onPress: () => void, title: string, Outer:React.FC, Inner:React.FC }> = ({ onPress, title, Outer, Inner })=>{
    return(
        <Outer>
            <Inner>{title}</Inner>
        </Outer>
    )
}


export default StyledButton