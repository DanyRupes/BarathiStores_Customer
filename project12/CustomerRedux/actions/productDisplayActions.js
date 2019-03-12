import axios from 'axios';

import { PRODUCT_DISPLAY, GET_ERRORS, CATEGORY_DISPLAY, SUBCATEGORY_DISPLAY } from './types';



export const displayProducts = (subcategoryid) => dispatch => {
    //console.log("Sub category in redux - "+subcategoryid);
    axios.get('http://192.168.29.137:3000/api/products/listproductonsubcategory/'+subcategoryid,{
        headers: {
         'Content-Type':'application/json'
        }
       })
    .then(res => {
      //  console.log(res.data);
        dispatch({
        type : PRODUCT_DISPLAY,
        payload : res.data
    })})
    .catch(err => dispatch({
        type : GET_ERRORS,
        payload : err.response.data
    })        
    );
};