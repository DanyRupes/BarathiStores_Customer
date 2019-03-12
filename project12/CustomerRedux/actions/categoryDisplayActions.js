import axios from 'axios';

import { PRODUCT_DISPLAY, GET_ERRORS, CATEGORY_DISPLAY, SUBCATEGORY_DISPLAY } from './types';


export const displayCategories = () => dispatch => {
    console.log("in redux category");
    axios.get('http://192.168.29.137:3000/api/categories/listcategory').then(
        res => {
            console.log(" I recieved - "+res.data);
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

