import {API_LOADING,
  API_URL,
  LOAD_PROM_CATS,
  LOAD_FILE_CATS,
  SELECT_PROM_CAT,
  SET_SUPPLIER,
  SELECT_FILE_CAT} from './rootReducer';
import axios from 'axios';
import {makeCategories} from '../utils';

export function loading(payload){
  return {type: API_LOADING, payload};
}

export function setSupplier(payload){
  return {type: SET_SUPPLIER, payload};
}

export function setPromCats(payload){
  return {type: LOAD_PROM_CATS, payload};
}

export function setFileCats(payload){
  return {type: LOAD_FILE_CATS, payload};
}

export function selectPromCat(payload){
  return {type: SELECT_PROM_CAT, payload};
}

export function selectFileCat(payload){
  return {type: SELECT_FILE_CAT, payload};
}

export function loadPromCats(){
  return async dispatch => {
    dispatch(loading(true));
    const response = await axios.get(API_URL);
    const cats = makeCategories(response.data);
    dispatch(setPromCats(cats));
    dispatch(loading(false));
  };
}

export function loadFileCats(file){
  return async dispatch => {
    const form = new FormData();
    form.append('filename', file);
    const response = await axios.post(API_URL, form)
    const supplier = response.data.supplier;
    const loaded = makeCategories(response.data.loaded);
    dispatch(setSupplier(supplier));
    dispatch(setFileCats(loaded));
  };
}

export function selectProm(item) {
  return dispatch => dispatch(selectPromCat(item));
}

export function selectFile(item) {
  return dispatch => dispatch(selectFileCat(item));
}
