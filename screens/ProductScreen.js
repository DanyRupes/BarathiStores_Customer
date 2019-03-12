import React from 'react';

import {View,StyleSheet,SafeAreaView,ScrollView,Dimensions,TouchableOpacity} from "react-native";
import { Container, Content, List, ListItem, Left, Body, Thumbnail, Text,Button} from 'native-base';
import {Card} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import {  widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {displaySubCategories} from '../project12/CustomerRedux/actions/subCategoryDisplayActions';
import {displayProducts} from '../project12/CustomerRedux/actions/productDisplayActions';
import {addToCart} from '../project12/CustomerRedux/actions/cartDisplayActions';
import {connect} from 'react-redux';
import CartItem from './reuse/CartItem'
const { height, width } = Dimensions.get('window')

class ProductScreen extends React.Component {
  static navigationOptions = {
    title: 'Product',
  };

  state={isFocused:false,
    isClicked: false,
    clicks:0,
    pid:""
   }

   async componentDidMount(){
   //  console.log(this.props.categoryid);
  // await this.displayproducts;
   
     console.log(" Category in product is -"+this.props.navigation.state.params.categoryid);
     await this.props.displaySubCategories(this.props.navigation.state.params.categoryid);
     
   }
   async handleSubCategoryChange (subcategoryid) {

        await this.props.displayProducts(subcategoryid)
    //     setTimeout(() =>{
    //    return this.handleProducts()
    //     console.log("ok--------------"+this.state.isClicked);
    //     }, 3000);
    // this.handleProducts();
   //console.log(this.props);
   //setTimeout(this.handleProducts.bind(this), 5000);
      
    }
    

//     handleProducts(){
//      // this.setState({isClicked1:true});
//   //console.log(event);
//  // console.log("I'm in handle products");
//       return (
//         <View style={{}}>
//         <Text>Hai</Text>
//         {this.props.displayproducts.product.map((p) =>(
//           <List key={p._id}>
//           <ListItem avatar>
//             <Left>
//               <Thumbnail square source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgub0Qx-cwzk4spmt3OnZNnAKRkHk5AVytmuaG8Ef2gDDlXROaZw' }} />
//             </Left>
//             <Body>
//               <Text>{p.productname}</Text>
//               <View style={{flexDirection:'row'}}>
//               <Text style={{ textDecorationLine: 'line-through' }}>Rs.{p.originalprice}</Text>
//               <Text>Rs.{sellingprice}</Text>
           
//               </View>
//               <View style={{flexDirection:'row',   minWidth:wp('8%')}}>
//               <Icon name="ios-information-circle" size={27} />
//               <View style={{paddingLeft:wp('4%')}}>
//               <Icon name="ios-heart-empty" size={27} />
//               </View>
//               <View style={{flexDirection:'row',paddingLeft:wp('38%')}}>
//               <View style={{flexDirection:'row',paddingLeft:wp('2%')}}>
//               {this.state.clicks?<TouchableOpacity onPress={() =>this.setState({clicks: this.state.clicks - 1})}>
//               <Icon name="ios-remove-circle" size={27} />
//               </TouchableOpacity>:<Text></Text>}
//               </View>
//               <View style={{flexDirection:'row',paddingLeft:wp('2%'),paddingTop:hp('0.4%')}}>
//               <Text> { this.state.clicks ?  this.state.clicks : '1' }</Text>
//               </View>
//               <TouchableOpacity onPress={() => this.handleAddChange}>
//               <Icon name="ios-add-circle" size={27} />
//               </TouchableOpacity>
//               </View>
//               </View>
//             </Body>
//           </ListItem>
//           </List>     
//         ))}
       
//      </View>
//       );
//      case 'Oil':
//       return(
// <Container>
// <View>
// <List>
// <ListItem avatar>

// <Body>
// <Text>Oil</Text>
// <Text note>1-Ltr</Text>

// </Body>
// </ListItem>
// </List>
// </View>
// </Container>
// )
// //    default:
// //    return(
// //     <View style={{backgroundColor:'red'}}>
// //     <Text>HI</Text>
// //  </View>
// //   )
// }
   
  //  }
    // handleSubmit2=event=>{
    //   this.setState({isClicked2:true});
   
    // }
    // handleSubmit3=event=>{
    //   this.setState({isClicked3:true});
   
    // }
    // handleSubmit4=event=>{
    //   this.setState({isClicked4:true});
   
    // }


  handleFocus=event=>{
    this.setState({isFocused:true});

    if(this.props.onFocus)
      this.props.onFocus(event)
  }
render() {
    const{isFocused}=this.state;
    const {onFocus}=this.props;
    return (
        <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    scrollEventThrottle={16}>
                        <View style={{justifyContent: "space-between", marginTop: 20 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                            {this.props.displaysubcategory.subcategory && this.props.displaysubcategory.subcategory.map(p => (
                            <TouchableOpacity key= {p._id} onPress={()=>this.handleSubCategoryChange(p._id)} >
                             <Card>
                             <Body>
                             <Thumbnail square source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREGC_BlPgj8VGJJzsmlD3OHa2Nv5uDPUPdJFRbIVXb8eezd6Up' }} />
                             <Text >{p.subcategoryname}</Text>  
                             </Body>
                             </Card>
                             </TouchableOpacity>))}
                            </ScrollView>
                           
                        </View>
                        <View>
                        <View style={{}}>
      
        {this.props.displayproducts.product && this.props.displayproducts.product.map((p) =>(
          <List key={p._id}>
            <CartItem item={p} />
          </List>     
        ))}
       
     </View>
                        </View>
                </ScrollView>
                 
        </SafeAreaView>
    );
}}

const mapStateToProps = (state) => ({
  // categoryid: props.navigation.state.params.categoryid,
   displaysubcategory : state.displaysubcategory || [],
   displayproducts : state.displayproducts || []
 });
 
 
 
 const styles = StyleSheet.create({
     container: {
         flex: 1,
         alignItems: 'center',
         paddingTop: 15,
         backgroundColor: '#fff',
         justifyContent: 'center'
     },
     cards:{
       borderColor:'transparent'
     }
    
 });
 
 export default connect(mapStateToProps, {displaySubCategories, displayProducts, addToCart})(ProductScreen);
