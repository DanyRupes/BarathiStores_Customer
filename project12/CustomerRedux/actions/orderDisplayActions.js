import axios from 'axios';
import {CART_DISPLAY, GET_ERRORS, ORDER_DISPLAY} from './types'
import port from '../../port'


export const displayOrder = () => dispatch => {
    axios.get(port+'/api/orders/myorder',{headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}).then(
        res => {
            dispatch({
                type : ORDER_DISPLAY,
                payload : res.data
            })
        }
    ).catch(err => dispatch({
        type : GET_ERRORS,
        payload : err.res.data
    })
    )   
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