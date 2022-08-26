import { View } from 'react-native';
import { Audio } from 'expo-av';
import { Provider } from 'react-redux'
import { store } from './store';
import Game from './Game';

async function playSound() {
  const { sound } = await Audio.Sound.createAsync(
     require('./assets/audio/rain.mp3')
  );
  await sound.playAsync();
}

export default function App() {


  return (
    <Provider store={store}>
      <View style={{flex:1}}>
        <Game/>
     </View>
  </Provider>
  );
}
