import { View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';

export default function App() {
  const [running, setRunning] = useState(false)

  useEffect(()=>{
    setRunning(false)
  },[])

  return (
    <ImageBackground style={{backgroundColor: '#ccc',
      flex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',}}
        source={require('./assets/background.jpg')}
   > 
    <GameEngine
      systems={[Physics]}
      entities={entities()}
      running={running}
      style={{
        position:'absolute', top:0, left:0, right:0, bottom:0
      }}
    >

    </GameEngine>

      {!running && 
        <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"rgba(18, 18, 18,.5)", borderRadius:0}}>
          <TouchableOpacity onPress={()=>setRunning(true)}>
              <Text style={{color:"white", fontSize:40, letterSpacing:2}}>Start game</Text>
          </TouchableOpacity>
          <View style={{alignItems:'center', flexDirection:'row'}}>
            <Text style={{color:"white", textAlign:'center'}}>Best score</Text>
            <Text style={{color:"lightgreen", fontSize:25, fontWeight:'bold'}}> 12</Text>
          </View>
        </View>
      }

    <StatusBar style="auto" hidden={true}/>
   </ImageBackground>
  );
}
