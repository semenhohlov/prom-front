export const API_LOADING = 'API_LOADING';
export const API_URL = 'http://localhost/php/laravel/prom/public/api/categories';
export const SET_SUPPLIER = 'SET_SUPPLIER';
export const LOAD_PROM_CATS = 'LOAD_PROM_CATS';
export const LOAD_FILE_CATS = 'LOAD_FILE_CATS';
export const SELECT_PROM_CAT = 'SELECT_PROM_CAT';
export const SELECT_FILE_CAT = 'SELECT_FILE_CAT';
export const SET_ERROR = 'SET_ERROR';
export const SAVE_ITEM = 'SAVE_ITEM';
export const LOAD_PROM_CATEGORIES = 'LOAD_PROM_CATEGORIES';
export const UPDATE_ITEM = 'UPDATE_ITEM';

const initialState = {
  isLoading: true,
  supplier: '',
  promCats: [],
  promCategories: [],
  fileCats: [],
  promCat: {},
  fileCat: {},
  error: '',
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
    case SET_ERROR:
      return {...state, error: action.payload};
    case LOAD_PROM_CATEGORIES:
        return {...state, promCategories: [...action.payload]};
    case SAVE_ITEM:
      return {...state, fileCats: [...state.fileCats.map(item => {
        if (item.group_id === action.payload.group_id) {
          item.group_prom_name = action.payload.group_prom_name;
          item.group_number = action.payload.group_number;
        }
        return item;
      })]};
    case UPDATE_ITEM:
      return {...state, promCats: [...state.promCats.map(item => {
        if (item.id === action.payload.id) {
          item.prom_cat_1 = action.payload.prom_cat_1;
          item.prom_cat_2 = action.payload.prom_cat_2;
          item.prom_cat_3 = action.payload.prom_cat_3;
          item.prom_cat_4 = action.payload.prom_cat_4;
          item.prom_cat_adress = action.payload.prom_cat_adress;
          item.prom_group_id = action.payload.prom_group_id;
        }
        return item;
      })]};
    default:
      return state;
  }
}

export default rootReducer;
