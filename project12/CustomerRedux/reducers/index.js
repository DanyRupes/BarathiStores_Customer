import { combineReducers } from 'redux';
import authReducers from './authReducers'
//import errorReducers from './errorReducers';
//import userDisplayReducers from './userDisplayReducers';
//import adminCartReducers from './adminCartReducers';
import productDisplayReducers from './productDisplayReducers';
import categoryDisplayReducers from './categoryDisplayReducers';
import subCategoryDisplayReducers from './subCategoryDisplayReducers';
import cartDisplayReducers from './cartDisplayReducers';
export default combineReducers({
    auth : authReducers,
 //   error : errorReducers,
 //   displayuser : userDisplayReducers,
    displayproducts : productDisplayReducers,
    displaycategory : categoryDisplayReducers,
    displaysubcategory : subCategoryDisplayReducers,
    displaycart : cartDisplayReducers,
  //  searchproducts : adminCartReducers
    
});