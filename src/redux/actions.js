import {API_LOADING,
  API_URL,
  LOAD_PROM_CATS,
  LOAD_FILE_CATS,
  SELECT_PROM_CAT,
  SET_SUPPLIER,
  SELECT_FILE_CAT,
  SET_ERROR,
  SAVE_ITEM} from './rootReducer';
import axios from 'axios';
import {makeCategories} from '../utils';

function loading(payload){
  return {type: API_LOADING, payload};
}

function setSupplier(payload){
  return {type: SET_SUPPLIER, payload};
}

function setPromCats(payload){
  return {type: LOAD_PROM_CATS, payload};
}

function setFileCats(payload){
  return {type: LOAD_FILE_CATS, payload};
}

function selectPromCat(payload){
  return {type: SELECT_PROM_CAT, payload};
}

function selectFileCat(payload){
  return {type: SELECT_FILE_CAT, payload};
}

function setError(payload){
  return {type: SET_ERROR, payload};
}

export function showError(message){
  return dispatch => {
    dispatch(setError(message));
    setTimeout(() => {
      dispatch(setError(''))
    }, 5000);
  };
}

function saveItem(payload){
  return {type: SAVE_ITEM, payload};
}

export function loadPromCats(){
  return async dispatch => {
    dispatch(loading(true));
    try {
      const response = await axios.get(API_URL);
      const cats = makeCategories(response.data.map(item => {
        item.group_name = item.group_name.toLowerCase();
        return item;
      }));
      dispatch(setPromCats(cats));
    } catch (e) {
      dispatch(showError(e.message));
    } finally {
        dispatch(loading(false));
    }
  };
}

export function loadFileCats(file){
  return async dispatch => {
    const form = new FormData();
    form.append('filename', file);
    try {
      const response = await axios.post(API_URL, form);
      const supplier = response.data.supplier;
      const loaded = response.data.loaded;
      // const loaded = makeCategories(response.data.loaded);
      dispatch(setSupplier(supplier));
      dispatch(setFileCats(loaded));
    } catch (e) {
      dispatch(showError(e.message));
    }
  };
}

export function selectProm(item){
  return dispatch => dispatch(selectPromCat(item));
}

export function selectFile(item){
  return dispatch => dispatch(selectFileCat(item));
}

export function saveCategory(supplier, promCat, fileCat){
  return async dispatch => {
    const form = new FormData();
    form.append('supplier', supplier);
    form.append('group_number', promCat.group_number);
    form.append('group_id', fileCat.group_id);
    form.append('group_parent_id', fileCat.group_parent_id);
    form.append('group_name', fileCat.group_name);
    form.append('group_prom_name', promCat.group_name);
    try {
      const response = await axios.post(API_URL + '/add', form);
      const item = response.data.data;
      dispatch(saveItem(item));
    } catch (e) {
      dispatch(showError(e.message));
    } finally {
      dispatch(selectPromCat({}));
      dispatch(selectFileCat({}));
    }
  };
}
