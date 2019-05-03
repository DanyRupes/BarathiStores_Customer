import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, TextInput, Picker, 
  StyleSheet, AsyncStorage, Text, ImageBackground }
 from "react-native";
 import {Card} from 'native-base';
 import {displayOrder} from '../../project12/CustomerRedux/actions/orderDisplayActions';
import {connect} from 'react-redux'

class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount(){
    console.log("MyOrders Did MOunt")
    this.props.displayOrder()
  }
  // componentWillReceiveProps
  componentWillReceiveProps(){
    // console.log("this.props.myOrders", this.props.myOrders)
    
  }
 
  render() {
    // console.log("this.props.myOrders", this.props.myOrders)
    return (
      <View>
          {
            this.props.myOrders.map((p,i)=>{
              return(<TouchableOpacity onPress={() => this.props.navigation.navigate('delivery', {
                'item':p
              })}>
              <Card>
                  <View style={{flexDirection:'column'}}>
                  <View style={{flexDirection:'row',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                  
                      <Text style={{fontWeight:'bold'}}>
                        8754743609
                      </Text>
        
                      <Text style={{fontWeight:'bold'}}>
                        -
                      </Text>
                      <Text style={{fontWeight:'bold'}}> {'\u20B9'} {p.totalamount} </Text>  
                  </View>
                  <View style={{flexDirection:'row',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                    <Text style={{fontWeight:'bold'}}>
                      Date
                    </Text>
                    <Text style={{fontWeight:'bold'}}>
                      /
                    </Text>
                    <Text style={{fontWeight:'bold'}}>
                      Mode Of Payment - Cash
                    </Text>
                  </View>
                  </View>
              </Card>
            </TouchableOpacity>)
            })
          }
     </View>
    );
  }
}
const mapStateToProps = (state) => ({
  myOrders : state.orders.orders,

});
export default connect(mapStateToProps, {displayOrder})(MyOrders);
