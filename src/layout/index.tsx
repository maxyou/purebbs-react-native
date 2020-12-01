import React, { Fragment } from 'react';
import PostScreen from '../biz/post'
import {post as DetailPost, comment as DetailComment} from '../biz/detail'
import {Modal} from '../biz/try'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
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

const StyledView = styled.View`
  background-color: yellow;
`

const StyledText = styled.Text`
  color: red;
`
interface Props{
  navigation:any
}
const HomeScreen:React.FC<Props> = ({ navigation }) => {



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StyledView>
        <StyledText>Hello World!</StyledText>
      </StyledView>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

// const DetailScreen:React.FC<Props> = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Post">
        <Stack.Screen name="Post" component={PostScreen} options={{ title: 'PureBBS' }} />
        <Stack.Screen name="DetailPost" component={DetailPost} options={{ title: 'DetailPost' }}/>        
        <Stack.Screen name="DetailComment" component={DetailComment} options={{ title: 'DetailComment' }}/>        
        <Stack.Screen name="Modal" component={Modal} options={{ title: 'Modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
