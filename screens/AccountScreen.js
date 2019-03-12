import React from 'react';
import { ExpoConfigView } from '@expo/samples';


import {
    View,
    Text,
    StyleSheet, AsyncStorage
  } from "react-native";
  import {logoutUser} from '../project11/CustomerRedux/actions/authActions';
import { connect } from 'react-redux';
import { Button,Header } from 'react-native-elements';
  
 class AccountScreen extends React.Component {
constructor(){
  super();
  //this._bootstrapAsync();
}
  // _bootstrapAsync = async () => {
  //   const userToken = await AsyncStorage.getItem('jwtToken');

  //   // This will switch to the App screen or Auth screen and this loading
  //   // screen will be unmounted and thrown away.
  //   this.props.navigation.navigate(userToken ? 'Main' : 'Login');
  //  }

logout(){
  this.props.logoutUser();
  this.props.navigation.navigate('Login');
}
    render() {
      return (
        <View style={styles.container}>
          <Text>Settings</Text>
          <Button onPress={() => this.logout()} style={styles.Button}
         title="Logout"
         type="solid"
        />
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

const mapStateToProps = (state) => ({
  auth : state.auth
})

export default connect(mapStateToProps, {logoutUser})(AccountScreen);
