import axios from 'axios';
import {CART_DISPLAY, GET_ERRORS, ORDER_DISPLAY} from './types'

export const displayCart = (id) => dispatch => {
    axios.get('http://192.168.1.102:3000/api/cartitems/getcart'+id).then(
        res => {
            dispatch({
                type : CART_DISPLAY,
                payload : res.data
            })
        }
    ).catch(err => dispatch({
        type : GET_ERRORS,
        payload : err.res.data
    }))
    
}