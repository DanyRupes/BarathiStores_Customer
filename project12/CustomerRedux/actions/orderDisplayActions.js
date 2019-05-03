import axios from 'axios';
import { AsyncStorage } from 'react-native'
import {CART_DISPLAY, GET_ERRORS, ORDER_DISPLAY} from './types'
import port from '../../port'


export const displayOrder = () =>async dispatch => {
    const token =await AsyncStorage.getItem('jwtToken')
    if(token){
        axios.get(port+'/api/orders/myorders',{headers: {
            token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(
            res => {
                dispatch({
                    type : ORDER_DISPLAY,
                    payload : res.data
                })
            }
        ).catch(err =>{ 
            console.log(err)
            dispatch({
            type : GET_ERRORS,
            payload : err   
        })}
        )   
    }
} 

export const placeOrder = (cart) => dispatch => {
    console.log("I'm in place order redux",cart);
    axios.post(port+'/api/orders/placeorder',{headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },cart}).then(
        res => {
            console.log(",,;;,,;;,,;;;;,,,;,;,;;,;,;,;,;,,,,;;,", res.data);
        }
    ).catch(err => dispatch({
        type : GET_ERRORS,
        payload : err.res.data
    })
    )   
}