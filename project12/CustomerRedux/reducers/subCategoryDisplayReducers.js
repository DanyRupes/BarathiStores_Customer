import { SUBCATEGORY_DISPLAY,SUBCATEGORY_PRODUCT_REPLACE } from '../actions/types';



const initialstate = {
    subcategory : [],products:[]
};
export default function(state = initialstate, action){
    switch(action.type){
        case SUBCATEGORY_DISPLAY:
            // console.log(action.payload.products)
            return{
                subcategory : action.payload.subcategories,
                products:action.payload.products
            }
        case SUBCATEGORY_PRODUCT_REPLACE:
        // console.log("state***************",state)
            return {
                ...state, products:undefined
            }    
            default :
                return state;
            }
        }