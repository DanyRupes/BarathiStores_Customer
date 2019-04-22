import axios from 'axios';
import {AsyncStorage} from 'react-native';
import { GET_ERRORS, ADD_TO_CART, CART_DISPLAY, REMOVE_FROM_CART } from './types';


import port from '../../port'
import { cart_load_setter} from '../../../screens/actions_control/controller'

export const addToCart =  ({_id,sellingprice,productname, quantity}) =>async dispatch => {
  let cart = [],items=[];
  
  try{
    
     cart_load_setter({choice:'reset', key:'bsc_cart_load'})
  
        let valued = []
        let pro = {productname, sellingprice, _id, quantity}
        
        AsyncStorage.getItem('bsc_cart')
        .then((resa)=>{
          if(resa){ // if cart has items
            console.log("step B")
              let Res = JSON.parse(resa)
              var total = parseFloat(sellingprice)+parseFloat(Res.total)
              console.log("total+parseInt(Res.total) ", parseFloat(sellingprice)+parseFloat(Res.total))
              
              let finalArr = []
              var notChange = true
              var continueChange = true
              
                  Res.items.forEach((dim, index) => {
                    // console.log(index)
                    if(dim._id==_id) {
                      notChange = false
                      continueChange = false
                      // console.log(index,"here")
                      // const {_id,} = dim
                      finalArr.push({...dim,quantity:dim.quantity+1})
                    }
                    if(index==Res.items.length-1 && notChange){
                      console.log("finally")
                      continueChange = false
                      finalArr.push(dim)
                      finalArr.push(pro)
                    }
                    if(continueChange) {
                      console.log("continueChange")
                      finalArr.push(dim)
                    }
                    // continueChange = true
                  })
                
                let finalProcess=  {
                    items: finalArr,
                    total: total
                }
                console.log("finalProcess",finalProcess)
                AsyncStorage.setItem('bsc_cart',JSON.stringify(finalProcess)) 
                  // console.log("finalArr ", finalArr) //true is 1
                  
          }
          else {
            console.log("step A")
            let finalProcess=  {
                items: [pro],
                total: sellingprice*quantity //quan=1
            }
            console.log("finalProcess", finalProcess)
            AsyncStorage.setItem('bsc_cart', JSON.stringify(finalProcess)) //at first

          }
        })
      }catch(e){console.log(e)}
};

export const getCart = () => dispatch => {

    AsyncStorage.getItem("bsc_cart").then((out)=>{

        if(out){dispatch({
            type : CART_DISPLAY,
            payload : JSON.parse(out)
        })} else {
            dispatch({ type: CART_DISPLAY, payload:undefined})
        }
    });
}
export const minusCart = (id) => dispatch => {

  let cart = []
   cart_load_setter({choice:'reset', key:'bsc_cart_load'})
      
  AsyncStorage.getItem('bsc_cart').then((resa)=>{
    var total
    if(resa) {
      let Res = JSON.parse(resa)
      console.log("bsc_cart ", Res)
      let finalArr = []

          Res.items.forEach((dim, index) => {
            console.log(index)
            if(dim._id==id) {
                if(dim.quantity!=1){
                  finalArr.push({...dim,quantity:dim.quantity-1})
                  total =  Res.total -  dim.sellingprice
                }
            }
            else {
              finalArr.push(dim)
            }
          })
 
          let finalProcess=  {
            items: finalArr,
            total: total
        }
        console.log("finalProcess",finalProcess)
        AsyncStorage.setItem('bsc_cart',JSON.stringify(finalProcess)) 
    }
    

  })
}
export const cleanCart = () => dispatch => {

  AsyncStorage.removeItem("bsc_cart")
  cart_load_setter({choice:'reset', key:'bsc_cart_load'})
}