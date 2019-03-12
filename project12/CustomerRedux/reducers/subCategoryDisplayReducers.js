import { SUBCATEGORY_DISPLAY } from '../actions/types';



const initialstate = {
    subcategory : []
};
export default function(state = initialstate, action){
    switch(action.type){
        case SUBCATEGORY_DISPLAY:
            return{
                subcategory : action.payload
            }
            default :
                return state;
            }
        }