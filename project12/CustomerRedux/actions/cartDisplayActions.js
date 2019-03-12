import axios from 'axios';
import {AsyncStorage} from 'react-native';
import { GET_ERRORS, ADD_TO_CART, CART_DISPLAY } from './types';




export const addToCart = (product) => dispatch => {
    console.log("I'm in addto cart redux"+ product);
   // const userid = AsyncStorage.getItem('decoded');
    axios.post('http://192.168.29.137:3000/api/cartitems/addtocart',product)
    .then(res => {
        console.log(res.data);
        })
    .catch(err => dispatch({
        type : GET_ERRORS,
        payload : err.response.data
    })        
    );
};

export const getCart = () => dispatch => {
    //console.log("Sub category in redux - "+subcategoryid);
    axios.post('http://192.168.29.137:3000/api/cartitems/getcart')
    .then(res => {
      //  console.log(res.data);
        dispatch({
        type : CART_DISPLAY,
        payload : res.data
    })})
    .catch(err => dispatch({
        type : GET_ERRORS,
        payload : err.response.data
    })        
    );
};