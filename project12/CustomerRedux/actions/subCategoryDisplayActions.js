import axios from 'axios';

import { PRODUCT_DISPLAY, GET_ERRORS, CATEGORY_DISPLAY, SUBCATEGORY_DISPLAY } from './types';



export const displaySubCategories = (categoryid) => dispatch => {
    console.log("Category Id is : "+categoryid);
    axios.get('http://192.168.29.137:3000/api/categories/listsubcategoryoncategory/'+categoryid,{
        headers: {
         'Content-Type':'application/json'
        }
       }).then(
        res => {
            dispatch({
                type : SUBCATEGORY_DISPLAY,
                payload : res.data
            })
        }
    ).catch(err => dispatch({
        type : GET_ERRORS,
        payload : err.response.data
    }))
    
}

