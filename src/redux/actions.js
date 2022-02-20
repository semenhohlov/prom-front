import {API_LOADING,
  LOAD_PROM_CATS,
  LOAD_FILE_CATS,
  SELECT_PROM_CAT,
  SET_SUPPLIER,
  SELECT_FILE_CAT} from './rootReducer';

export function loading(payload){
  return {type: API_LOADING, payload};
}

export function setSupplier(payload){
  return {type: SET_SUPPLIER, payload};
}

export function loadPromCats(payload){
  return {type: LOAD_PROM_CATS, payload};
}

export function loadFileCats(payload){
  return {type: LOAD_FILE_CATS, payload};
}

export function selectPromCat(payload){
  return {type: SELECT_PROM_CAT, payload};
}

export function selectFileCat(payload){
  return {type: SELECT_FILE_CAT, payload};
}
