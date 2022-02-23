import {Provider} from 'react-redux';
import store from './redux/store';
import WorkSpace from './components/WorkSpace';

import './App.css';
import ButtonAppBar from './components/appbar/AppBar';

function App() {
  return (
    <Provider store={store}>
      <ButtonAppBar />
      <WorkSpace />
    </Provider>
  );
}

export default App;
