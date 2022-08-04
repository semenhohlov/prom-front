import {API_LOADING,
  API_URL,
  LOAD_PROM_CATS,
  LOAD_FILE_CATS,
  SELECT_PROM_CAT,
  SET_SUPPLIER,
  SELECT_FILE_CAT,
  SET_ERROR,
  SAVE_ITEM,
  LOAD_PROM_CATEGORIES,
  UPDATE_ITEM} from './rootReducer';
import axios from 'axios';
// import {makeCategories} from '../utils';

function loading(payload){
  return {type: API_LOADING, payload};
}

function setSupplier(payload){
  return {type: SET_SUPPLIER, payload};
}

function setPromCats(payload){
  return {type: LOAD_PROM_CATS, payload};
}

function setPromCategories(payload){
  return {type: LOAD_PROM_CATEGORIES, payload};
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

function updateItem(payload){
  return {type: UPDATE_ITEM, payload};
}

export function loadPromCats(){
  return async dispatch => {
    dispatch(loading(true));
    try {
      const response = await axios.get(API_URL);
      const cats = response.data.map(item => {
        item.group_name = item.group_name.toLowerCase();
        return item;
      });
      // const cats = makeCategories(response.data.map(item => {
      //   item.group_name = item.group_name.toLowerCase();
      //   return item;
      // }));
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
    console.log(file);
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

export function loadPromCategories(){
  return async dispatch => {
    dispatch(loading(true));
    try {
      const response = await axios.get(API_URL + '/prom');
      const cats = response.data.prom.map(item => {
        item.category_1 = item.category_1.toLowerCase();
        item.category_2 = item.category_2.toLowerCase();
        item.category_3 = item.category_3.toLowerCase();
        item.category_4 = item.category_4.toLowerCase();
        return item;
      });
      dispatch(setPromCategories(cats));
    } catch (e) {
      dispatch(showError(e.message));
    } finally {
        dispatch(loading(false));
    }
  };
}

export function updateCategory(promCat, fileCat){
  return async dispatch => {
    // const form = new FormData();
    // form.append('prom_cat_1', fileCat.category_1);
    // form.append('prom_cat_2', fileCat.category_2);
    // form.append('prom_cat_3', fileCat.category_3);
    // form.append('prom_cat_4', fileCat.category_4);
    // form.append('prom_group_id', fileCat.category_id);
    // form.append('prom_cat_adress', fileCat.category_url);
    const req = {
      prom_cat_1: fileCat.category_1,
      prom_cat_2: fileCat.category_2,
      prom_cat_3: fileCat.category_3,
      prom_cat_4: fileCat.category_4,
      prom_group_id: fileCat.category_id,
      prom_cat_adress: fileCat.category_url,
    };
    try {
      await axios.patch(API_URL + '/prom/' + promCat.id, JSON.stringify(req),
      {
        headers: {
            'Content-Type': 'application/json',
        }
      });
      // await axios.patch(API_URL + '/prom/' + promCat.id, form);
      const item = {...promCat};
      item.prom_cat_1 = fileCat.category_1;
      item.prom_cat_2 = fileCat.category_2;
      item.prom_cat_3 = fileCat.category_3;
      item.prom_cat_4 = fileCat.category_4;
      item.prom_cat_adress = fileCat.category_url;
      item.prom_group_id = fileCat.category_id;
      dispatch(updateItem(item));
    } catch (e) {
      dispatch(showError(e.message));
    } finally {
      dispatch(selectPromCat({}));
      dispatch(selectFileCat({}));
    }
  };
}
