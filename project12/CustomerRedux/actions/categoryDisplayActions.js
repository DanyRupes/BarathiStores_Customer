import axios from 'axios';

import { PRODUCT_DISPLAY, GET_ERRORS, CATEGORY_DISPLAY, SUBCATEGORY_DISPLAY } from './types';
import port from '../../port'


export const displayCategories = () => dispatch => {
    console.log("in redux category");
    axios.get(port+'/api/categories/listcategory',{headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}).then(
        res => {
            //console.log(" I recieved - "+res.data);
            dispatch({
                type : CATEGORY_DISPLAY,
                payload : res.data
            })
        }
    ).catch(err => dispatch({
        type : GET_ERRORS,
        payload : err.res.data
    }))
    
}

