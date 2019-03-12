import { CART_DISPLAY } from '../actions/types';



const initialstate = {
    cart : []
};
export default function(state = initialstate, action){
    switch(action.type){
        case CART_DISPLAY:
            return{
                cart : action.payload
            };
            default :
                return state;
            }
        }