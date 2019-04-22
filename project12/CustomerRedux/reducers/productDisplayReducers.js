import { PRODUCT_DISPLAY } from '../actions/types';



const initialstate = {
    products : []
};
export default function(state = initialstate, action){
    switch(action.type){
        case PRODUCT_DISPLAY:
            return{
                products : action.payload
            }
            default :
                return state;
            }
        }