import { ORDER_DISPLAY } from '../actions/types';



const initialstate = {
    orders : []
};
export default function(state = initialstate, action){
    switch(action.type){
        case ORDER_DISPLAY:
            return{
                orders : action.payload
            };
            default :
                return state;
            }
        }