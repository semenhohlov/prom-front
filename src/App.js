import {Provider} from 'react-redux';
import store from './redux/store';

import './App.css';
import ButtonAppBar from './components/appbar/AppBar';

function App() {
  return (
    <Provider store={store}>
      <div>
        <ButtonAppBar />
      </div>
    </Provider>
  );
}

export default App;
