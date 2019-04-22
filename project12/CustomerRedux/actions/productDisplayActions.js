import axios from 'axios';

import { PRODUCT_DISPLAY, GET_ERRORS, CATEGORY_DISPLAY, SUBCATEGORY_DISPLAY } from './types';

import port from '../../port'


export const displayProducts = (subcategoryid) =>  dispatch => {
    //console.log("Sub category in redux - "+subcategoryid);
  axios.get(port+'/api/products/listproductonsubcategory/'+subcategoryid)
  .then(res=>{
    dispatch({
      type : PRODUCT_DISPLAY,
      payload : res.data
  })
  })  .catch(err=>console.log(err))      
};