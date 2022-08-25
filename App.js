import { View, ImageBackground, TouchableOpacity, Text, Vibration } from 'react-native';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import { Audio } from 'expo-av';

async function playSound() {
  const { sound } = await Audio.Sound.createAsync(
     require('./assets/audio/rain.mp3')
  );
  await sound.playAsync();
}

export default function App() {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [points, setPoints] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  useEffect(()=>{
    setRunning(false)
  }, [])

  useEffect(()=> {
    async function playSound() {
      const { sound } = await Audio.Sound.createAsync(
         require('./assets/audio/rain.mp3')
      );

      if(running){
        await sound.playAsync()
      }
      else {
        console.log(running)
        await sound.pauseAsync();
      }
    }

    playSound()
  }, [running])

  return (
    <View style={{flex:1}}>
      <ImageBackground style={{
        backgroundColor: '#ccc',
        resizeMode: 'stretch', 
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',}}
          source={require('./assets/background.jpg')}
    > 
      {running && <Text style={{  
          position:'absolute',
          top:15,
          left:15,
          zIndex:2,
          backgroundColor:'rgba(8, 8, 8, .5)', 
          paddingHorizontal:15,
          borderRadius:10,
          paddingVertical:5,
          textAlign:'center',
          color:"white", 
          fontSize:25}
        }>
          {points}
        </Text>}
      <GameEngine
        ref={(ref)=>setGameEngine(ref)}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e)=>{
          switch(e.type) {
            case 'game_over':
              setRunning(false)
              if(points>bestScore){
                setBestScore(points)
              }
              gameEngine.stop()
              break;
            case 'new_point':
              setPoints(points + 1)
              break;
          }
        }}
        style={{
          position:'absolute', top:0, left:0, right:0, bottom:0
        }}
      >

      </GameEngine>

        {!running && 
          <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"rgba(18, 18, 18,.5)", borderRadius:0}}>
            <TouchableOpacity onPress={()=>{ setPoints(0); setRunning(true); gameEngine.swap(entities())}}>
                <Text style={{color:"white", fontSize:40, letterSpacing:2}}>Start game</Text>
            </TouchableOpacity>
            <View style={{alignItems:'center', flexDirection:'row'}}>
              <Text style={{color:"white", textAlign:'center'}}>Best score</Text>
              <Text style={{color:"lightgreen", fontSize:25, fontWeight:'bold', marginLeft:10}}>{bestScore}</Text>
            </View>
          </View>
        }

      <StatusBar style="auto" hidden={true}/>
    </ImageBackground>
   </View>
  );
}
