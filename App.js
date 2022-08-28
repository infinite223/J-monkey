import { View } from 'react-native';
import { Provider } from 'react-redux'
import { store } from './store';
import Game from './Game';


export default function App() {

  return (
    <Provider store={store}>
      <View style={{flex:1}}>
        <Game/>
     </View>
  </Provider>
  );
}
