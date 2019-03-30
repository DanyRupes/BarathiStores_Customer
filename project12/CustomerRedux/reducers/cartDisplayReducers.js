import { CART_DISPLAY } from '../actions/types';




const initialstate = {
    cart : undefined
};
export default function(state = initialstate, action){
    switch(action.type){
        case CART_DISPLAY:
                if(action.payload){
                    console.log("REducers second -----------------------")
                    return{
                        cart : {
                            items:action.payload.items,
                            total: action.payload.total
                        } 
                    };
                }else {
                    console.log("REducers First -----------------------")
                    return {cart:undefined}  
                } 
            default :
                return state;
            }
        }