import { CATEGORY_DISPLAY } from '../actions/types';



const initialstate = {
    category : []
};
export default function(state = initialstate, action){
    switch(action.type){
        case CATEGORY_DISPLAY:
            return{
                category : action.payload
            };
            default :
                return state;
            }
        }