import { PRODUCT_DISPLAY } from '../actions/types';



const initialstate = {
    product : []
};
export default function(state = initialstate, action){
    switch(action.type){
        case PRODUCT_DISPLAY:
            return{
                product : action.payload
            }
            default :
                return state;
            }
        }