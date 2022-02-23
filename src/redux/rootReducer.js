export const API_LOADING = 'API_LOADING';
export const API_URL = 'http://localhost/php/laravel/prom/public/api/categories';
export const SET_SUPPLIER = 'SET_SUPPLIER';
export const LOAD_PROM_CATS = 'LOAD_PROM_CATS';
export const LOAD_FILE_CATS = 'LOAD_FILE_CATS';
export const SELECT_PROM_CAT = 'SELECT_PROM_CAT';
export const SELECT_FILE_CAT = 'SELECT_FILE_CAT';

const initialState = {
  isLoading: true,
  supplier: '',
  promCats: [],
  fileCats: [],
  promCat: null,
  fileCat: null,
};

function rootReducer(state = initialState, action){
  switch (action.type) {
    case API_LOADING:
      return {...state, isLoading: action.payload};
    case SET_SUPPLIER:
      return {...state, supplier: action.payload};
    case LOAD_PROM_CATS:
      return {...state, promCats: [...action.payload]};
    case LOAD_FILE_CATS:
      return {...state, fileCats: [...action.payload]};
    case SELECT_PROM_CAT:
      return {...state, promCat: {...action.payload}};
    case SELECT_FILE_CAT:
      return {...state, fileCat: {...action.payload}};
    default:
      return state;
  }
}

export default rootReducer;
