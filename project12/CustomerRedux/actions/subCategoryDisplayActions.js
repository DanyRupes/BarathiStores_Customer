import axios from 'axios';
import port from '../../port'

import { PRODUCT_DISPLAY, GET_ERRORS, CATEGORY_DISPLAY, SUBCATEGORY_DISPLAY,SUBCATEGORY_PRODUCT_REPLACE } from './types';



export const displaySubCategories = (categoryid) => dispatch => {
    console.log("Category Id is : "+categoryid);
    axios.get(port+'/api/subcategory/listsubcategoryoncategory/'+categoryid,{headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}).then(
        res => {
             console.log("res.data------------",res.data)
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



export const subcategory_product_replace = () => dispatch => {
    dispatch({
        type : SUBCATEGORY_PRODUCT_REPLACE,
        payload : []
    })
    
}
