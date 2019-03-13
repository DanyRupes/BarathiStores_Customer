import { ORDER_DISPLAY } from '../actions/types';



const initialstate = {
    order : []
};
export default function(state = initialstate, action){
    switch(action.type){
        case ORDER_DISPLAY:
            return{
                order : action.payload
            };
            default :
                return state;
            }
        }