import axios from 'axios';
import {CART_DISPLAY, GET_ERRORS, ORDER_DISPLAY} from './types'

export const displayOrder = () => dispatch => {
    axios.get('http://192.168.1.102:3000/api/orders/myorder').then(
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

export const placeOrder = () => dispatch => {
    axios.get('http://192.168.1.102:3000/api/orders/placeorder').then(
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