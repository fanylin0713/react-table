import Weather from './components/Weather';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './redux/reducers';
import Box from '@material-ui/core/Box';

const store = createStore(reducers)

function App() {
  return (
    <Box m={0} p={0} height="100%">
      <Provider store={store}>
        <Weather />
      </Provider>
    </Box>
  );
}

export default App;
