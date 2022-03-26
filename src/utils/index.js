export function getSubCats(root, source, begin = '') {
  // console.log(begin, root.group_name, root.group_id);
  begin += '-';
  root.subCats = source.filter(item => {
    if (root.group_id && (root.group_id === item.group_parent_id))
      return item;
    return null;
    });
  // root.subCats = source.filter(item => (root.group_id && (
  //   root.group_id === item.group_parent_id
  // )));
  // console.log('SubCats: ', root.subCats.length);
  root.subCats.forEach(item => getSubCats(item, source, begin));
}

export function makeCategories(source) {
  const tmp = source.map(item => {
    return {...item};
  });
  const result = tmp.filter(item => {
    if (!item.group_parent_id) {
      return item;
    }
    return null;
  });
  result.forEach((item) => getSubCats(item, tmp));
  return result;
}

export function searchFilter(item, search){
  // console.log('searchFilter');
  if (item.group_name.includes(search)) {
    return true;
  }
  for (let i = 0; i < item.subCats.length; i++) {
    if (searchFilter(item.subCats[i], search)) {
      return true;
    }
  }
  return false
}

export function sortCats() {
  return;
}
