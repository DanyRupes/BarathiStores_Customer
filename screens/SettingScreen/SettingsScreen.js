import React from 'react';
import {View,ScrollView,TouchableOpacity, TextInput, Picker, StyleSheet, AsyncStorage,Text,ImageBackground} from "react-native";
import { Avatar,Input,Icon} from 'react-native-elements';  
import {Content,Left,Card,Container, Header, Body, Right,Title, Tabs,Tab,Spinner,Button} from 'native-base';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import ToggleSwitch from 'toggle-switch-react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DeliveryScreen from './DeliveryScreen';

import axios from 'axios'
import port from '../../port'
import MyOrders from './MyOrders';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Best Basket',
  };
  constructor(){
    super();
    this.state = {
      userdetail : '',
      name:'',
      option: true,
      pincode:'',
      address:'',
      landmark:''

    }
  }
 async componentDidMount(){
  const token = await AsyncStorage.getItem("jwtToken")
  console.log("hai",token)
   await axios.get(port+'/api/users/getuser',{headers : {
      token : token
    }}).then(res =>{
      console.log("Profile details",res.data)
      let {name,email,landmark,pincode,address}=res.data
      this.setState({name,email,landmark,pincode,address})
    }).catch(err => console.log(err))
  }

  onSubmit = () => { 
   console.log("haijj")
    const updateitems=  {
      landmark:this.state.landmark,
      address :this.state.address,
      pincode:this.state.pincode,
      name:this.state.name,

    }
    var j=1
    axios.post(port+'/api/users/updateuser',updateitems,{headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      token : token
    }}).then(res=>{
      console.log("j",j++)
      this.setState({userdetail:res.data})
    }).catch(err=>console.log(err))
  }
  
  render() {
    return (
      <Container>
    <Tabs>
       <Tab heading="My Profile"  tabStyle={{backgroundColor: 'white'}} textStyle={{color: 'black'}} activeTabStyle={{backgroundColor: 'white',borderColor:'yellow'}} activeTextStyle={{color: 'green', fontWeight: 'normal'}} tabBarUnderlineStyle={{borderBottomWidth:2,borderBottomColor:'green'}} >
       <ScrollView>
      
 <View style={{flex:1, marginBottom:10}}>

  <View style={{display:'flex',
                flexDirection:'column',
                paddingTop:heightPercentageToDP('5%'),
                justifyContent:"space-evenly"}}>
  <View style={{display:'flex',
                justifyContent:'center',
                alignItems:'center',
                alignContent:'center'}}>             
       <Avatar
       rounded={true}
       size={100}
       source={{uri:'https://parivahan.gov.in/analytics/resources/images/avatar1_small.png'}}
       showEditButton size={100}/>
       </View>

   <Text style={{fontWeight:'bold',
                 fontSize:25,
                 color:'white',
                 textAlign:'center',
                 alignItems:'center',
                 alignContent:'center'}}>
   {this.state.userdetail.name}
   </Text>
  </View>
 

<Card style={{opacity:0.8,backgroundColor:'white'}}>
<View style={{flexDirection:'row',justifyContent:'space-between',padding:'3%'}}>
<Button rounded bordered block success 
   style={{width:widthPercentageToDP('30%'),
           height:heightPercentageToDP('4%')}}>
           <Text style={{color:'green',fontWeight:'700'}}>
               Profile
           </Text>
           </Button>
           <Button rounded block success 
   style={{width:widthPercentageToDP('30%'),
           height:heightPercentageToDP('4%')}}>
           <Text style={{color:'white',fontWeight:'700'}}>
               Logout
           </Text>
           </Button>
</View>
  <View style={{flexDirection:'column'}}>
  <View style={{paddingLeft:widthPercentageToDP('3%'),
                paddingTop:widthPercentageToDP('5%'),
                flexDirection:'row'}}>
              
     <View style={{paddingTop:widthPercentageToDP('0.5%')}}> 
      <Icon 
            name='person-outline'
            size={18}
            color='black'/>
            </View>
      <Text style={{paddingLeft:widthPercentageToDP('0.8%'),color:'black'}}>
        Name
      </Text>
      </View>
      <TextInput disabled={this.state.option}
          onChangeText={(name)=>this.setState({name})}
        //  style={[styles.subTextStyle,{color:Textcolor}]}  
        //  editable={!this.state.disable}
         value={this.state.name} 
        //  value= {this.state.name}
         />
      </View>
      <View style={{flexDirection:'column'}}>
  <View style={{paddingLeft:widthPercentageToDP('3%'),
                paddingTop:widthPercentageToDP('5%'),
                flexDirection:'row'}}>
              
     <View style={{paddingTop:widthPercentageToDP('0.5%')}}> 
      <Icon 
            name='mail-outline'
            size={18}
            color='black'/>
            </View>
      <Text style={{paddingLeft:widthPercentageToDP('0.8%'),color:'black'}}>
       E-mail
      </Text>
      </View>
      <TextInput disabled={true}
        //  onChangeText={(email)=>this.setState({email})}
        //  style={[styles.subTextStyle,{color:Textcolor}]}  
        //  editable={!this.state.disable}
         value={this.state.email} 
        //  value= {this.state.name}
         />
      </View>
      <View style={{flexDirection:'column'}}>
  <View style={{paddingLeft:widthPercentageToDP('3%'),
                paddingTop:widthPercentageToDP('5%'),
                flexDirection:'row'}}>
              
     <View style={{paddingTop:widthPercentageToDP('0.5%')}}> 
      <Icon 
            name='location-on'
            size={18}
            color='black'/>
            </View>
      <Text style={{paddingLeft:widthPercentageToDP('0.8%'),color:'black'}}>
        Landmark
      </Text>
      </View>
      <TextInput disable={this.state.option} 
          onChangeText={(landmark)=>this.setState({landmark})}
        //  style={[styles.subTextStyle,{color:Textcolor}]}  
        //  editable={!this.state.disable}
         value={this.state.landmark} 
        //  value= {this.state.name}
         />
      </View>
      <View style={{flexDirection:'column'}}>
         <View style={{paddingLeft:widthPercentageToDP('3%'),
                       paddingTop:widthPercentageToDP('5%'),
                       flexDirection:'row'}}>
                         
         <View style={{paddingTop:widthPercentageToDP('0.5%')}}> 
             <Icon 
                   name='map'
                   size={15}
                   color='black'/>
         </View>
         <Text style={{paddingLeft:widthPercentageToDP('0.8%'),color:'black'}}>
           Address
         </Text>
      </View>
      <TextInput disabled={this.state.option}
         onChangeText={(address)=>this.setState({address})}
        //  style={[styles.subTextStyle,{color:Textcolor}]}  
        //  editable={!this.state.disable}
         value={this.state.address}//{this.state.userdetail.address} 
        //  value= {this.state.name}
         />
      </View>
      <View style={{flexDirection:'column'}}>
         <View style={{paddingLeft:widthPercentageToDP('3%'),
                       paddingTop:widthPercentageToDP('5%'),
                       flexDirection:'row'}}>
                         
         <View style={{paddingTop:widthPercentageToDP('0.5%')}}> 
             <Icon 
                   name='bookmark-pin'
                   size={15}
                   color='black'/>
         </View>
         <Text style={{paddingLeft:widthPercentageToDP('0.8%'),color:'black'}}>
           Pincode
         </Text>
      </View>
      <TextInput disabled={this.state.option} 
         onChangeText={(pincode)=>this.setState({pincode})}
        //  style={[styles.subTextStyle,{color:Textcolor}]}  
        //  editable={!this.state.disable}
         value={this.state.pincode} 
        //  value= {this.state.name}
         />
      </View>
 
        <View style={{display:"flex",flexDirection:'row',paddingLeft:widthPercentageToDP('3%'),
                       paddingTop:widthPercentageToDP('5%')}}>
    
                     
         <Text style={{paddingLeft:widthPercentageToDP('1%'),color:'black'}}>SMS Notification </Text>
         <View style={{paddingLeft:'50%'}}>
         <ToggleSwitch   value ={1}
               onColor='#5d79ea'
               offColor='gray'
               size='small'/>
         </View>
      </View>  
         <View style={{justifyContent:'center',alignSelf:'center',paddingTop:'5%'}}>
   <Button rounded block  
     onPress={this.onSubmit}
    //    disabled={this.state.disable}
           style={{width:widthPercentageToDP('80%'),
                   height:heightPercentageToDP('5%')}}>
     <Text style={{color:'white',fontWeight:'700'}}>Update</Text>
   </Button>
   </View>
   <View style={{justifyContent:'center',alignSelf:'center',paddingTop:'3%'}}>
   <Button bordered rounded block success 
    // onPress={this.onSubmit}
    //    disabled={this.state.disable}
           style={{width:widthPercentageToDP('50%'),
                   height:heightPercentageToDP('5%')}}>
     <Text style={{color:'green',fontWeight:'700'}}>Change Password</Text>
   </Button>
   </View>
   <View style={{flexDirection:'column'}}>
  <View style={{paddingLeft:widthPercentageToDP('3%'),
                paddingTop:widthPercentageToDP('5%'),
                flexDirection:'row'}}>
      <Text style={{paddingLeft:widthPercentageToDP('0.8%'),color:'black'}}>
        Current Password
      </Text>
      </View>
      <TextInput 
        //  onChangeText={(name)=>this.setState({name})}
        //  style={[styles.subTextStyle,{color:Textcolor}]}  
        //  editable={!this.state.disable}
         placeholder='' 
        //  value= {this.state.name}
         />
          <View style={{paddingLeft:widthPercentageToDP('3%'),
                paddingTop:widthPercentageToDP('5%'),
                flexDirection:'row'}}>
      <Text style={{paddingLeft:widthPercentageToDP('0.8%'),color:'black'}}>
        New Password
      </Text>
      </View>
      <TextInput 
        //  onChangeText={(name)=>this.setState({name})}
        //  style={[styles.subTextStyle,{color:Textcolor}]}  
        //  editable={!this.state.disable}
         placeholder='' 
        //  value= {this.state.name}
         />
          <View style={{paddingLeft:widthPercentageToDP('3%'),
                paddingTop:widthPercentageToDP('5%'),
                flexDirection:'row'}}>
      <Text style={{paddingLeft:widthPercentageToDP('0.8%'),color:'black'}}>
        Confirm Password
      </Text>
      </View>
      <TextInput 
        //  onChangeText={(name)=>this.setState({name})}
        //  style={[styles.subTextStyle,{color:Textcolor}]}  
        //  editable={!this.state.disable}
         placeholder='' 
        //  value= {this.state.name}
         />
      </View>
      <View style={{justifyContent:'center',alignSelf:'center',padding:'3%'}}>
   <Button rounded block success 
    // onPress={this.onSubmit}
    //    disabled={this.state.disable}
           style={{width:widthPercentageToDP('80%'),
                   height:heightPercentageToDP('5%')}}>
     <Text style={{color:'white',fontWeight:'700'}}>Submit</Text>
   </Button>
   </View>
     </Card>
 </View>

 </ScrollView>
 </Tab>
    
    <Tab heading="My Orders" tabStyle={{backgroundColor: 'white'}} textStyle={{color: 'black'}} activeTabStyle={{backgroundColor: 'white',borderBottomColor:'green'}} activeTextStyle={{color: 'green', fontWeight: 'normal'}}>
        <MyOrders navigation={this.props.navigation} />
    </Tab>
    </Tabs>

 </Container>
    );
  }
}

const stemstack = createStackNavigator({
  setting:SettingsScreen,
  delivery:DeliveryScreen,
},
{
  initialRouteName: 'setting',
}

);


const AppContainer = createAppContainer(stemstack);

export default class App extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return <AppContainer />;
  }
}


const styles = StyleSheet.create({
  tabdesign: {
   
  },
})