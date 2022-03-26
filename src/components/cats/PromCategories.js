import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loadPromCategories, selectFile} from '../../redux/actions';

const PromCategories = () => {
  const promCategories = useSelector(state => state.promCategories);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    cat1: '',
    cat2: '',
    cat3: '',
    cat4: '',
  });
  // const [cats, setCats] = useState([...useSelector(state => state.promCategories)]);
  const [cats, setCats] = useState([]);
  // const [cats, setCats] = useState(promCategories.length ? [...promCategories] : []);
  // let categories = promCategories.length ? [...promCategories] : [];

  useEffect(() => {
    if (promCategories.length) {
      return;
    }
    dispatch(loadPromCategories());
  });
  useEffect(() => {
    setCats([...promCategories]);
  }, [promCategories]);

  const inputHandler = (event) => {
    event.preventDefault();
    setInput(prev => ({...prev,
      [event.target.name]: event.target.value.toLowerCase()
    }));
  };

  const clickHandler = (event) => {
    event.preventDefault();
    // setCats([...promCategories]);
    if (input.cat1.length > 3) {
      setCats(cats.filter(item => {
        if (item.category_1.includes(input.cat1)) {
          return item;
        }
        return null;
      }));
    }
    if (input.cat2.length > 3) {
      setCats(cats.filter(item => {
        if (item.category_2.includes(input.cat2)) {
          return item;
        }
        return null;
      }));
    }
    if (input.cat3.length > 3) {
      setCats(cats.filter(item => {
        if (item.category_3.includes(input.cat3)) {
          return item;
        }
        return null;
      }));
    }
    if (input.cat4.length > 3) {
      setCats(cats.filter(item => {
        if (item.category_4.includes(input.cat4)) {
          return item;
        }
        return null;
      }));
    }
  };

  const clearHandler = (event) => {
    event.preventDefault();
    setCats([...promCategories]);
  };

  return (
    <>
      <h4 className="center">Категории прома</h4>
      <input type="text" name="cat1"
        placeholder="Категория 1"
        onChange={inputHandler}
        value={input.cat1}
      />
      <input type="text" name="cat2"
        placeholder="Категория 2"
        onChange={inputHandler}
        value={input.cat2}
      />
      <input type="text" name="cat3"
        placeholder="Категория 3"
        onChange={inputHandler}
        value={input.cat3}
      />
      <input type="text" name="cat4"
        placeholder="Категория 4"
        onChange={inputHandler}
        value={input.cat4}
      />
      <button onClick={clickHandler}>Поиск</button>
      <button onClick={clearHandler}>&times;</button>
      <div className="overflow cats">
        <table className="prom_cats">
          <thead>
            <tr>
              <th>Категория 1</th>
              <th>Категория 2</th>
              <th>Категория 3</th>
              <th>Категория 4</th>
            </tr>
          </thead>
          <tbody>
          {cats.map(item => {
            return (
              <tr className="cat_item"
                key={item.id}
                onClick={()=>{dispatch(selectFile(item))}}
              >
                <td>{item.category_1}</td>
                <td>{item.category_2}</td>
                <td>{item.category_3}</td>
                <td>{item.category_4}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PromCategories;
