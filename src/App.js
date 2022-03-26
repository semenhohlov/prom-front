import {Provider} from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import store from './redux/store';
import WorkSpace from './components/WorkSpace';
import Cats from './components/cats/Cats';

import './App.css';
import ButtonAppBar from './components/appbar/AppBar';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ButtonAppBar />
        <Routes>
          <Route path="/" element={<WorkSpace />}/>
          <Route path="/cats" element={<Cats />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
