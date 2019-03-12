import React from 'react';
import { View,StyleSheet, AsyncStorage } from "react-native";
import { Input,Button,Card } from 'react-native-elements';
import {loginUser} from '../project12/CustomerRedux/actions/authActions';
import {connect} from 'react-redux';
 class Login extends React.Component {
   constructor(){
     super();
     this.state = {
       mobilenumber : "",
       password : "",
       errors : {}
     };
    //  this._bootstrapAsync();
   }


  //  _bootstrapAsync = async () => {
  //   const userToken = await AsyncStorage.getItem('jwtToken');
  //   console.log(userToken);
  //   // This will switch to the App screen or Auth screen and this loading
  //   // screen will be unmounted and thrown away.
  //   this.props.navigation.navigate(userToken ? 'Main' : 'Login');
  //  }

    handlepress = () => {
     console.log("I entered login function");
     const userLogin = {
       mobilenumber : this.state.mobilenumber,
       password : this.state.password
     }
      this.props.loginUser(userLogin);
    
     setTimeout(() =>this.props.navigation.navigate('Main'), 2000);
   }
   

    render() {
      const { navigate } = this.props.navigation;
      return (
        <View>
            <Card>
             <View style={{flexDirection: 'row',justifyContent:'center'
            }}>
             <Button style={styles.Button}
              title="Bharati Stores"
              type="outline"/>
             </View>
             <Input onChangeText={mobilenumber => this.setState({ mobilenumber })}
              placeholder='Mobile Number'/>

             <Input secureTextEntry={true} onChangeText={password => this.setState({ password })}
              placeholder='Password'/>
             <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
             <Button onPress={() => this.handlepress()} style={styles.Button}
              title="Login"
              type="solid"/>
             <Button style={styles.Button}
              title="ForgetPassword.?"
              type="clear"/>
             </View>
             </Card>
             </View>
        
      
        
      );
    }
}
  const styles = StyleSheet.create({
  
       Button: {
       height:10,
        width:20,
      padding:5,
  marginRight:20
 }
});
  const mapStateToProps = (state) => ({
    auth : state.auth,
  });
  export default connect(mapStateToProps, {loginUser})(Login);