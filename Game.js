import { View, ImageBackground, TouchableOpacity, Text, Vibration, Animated } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import { Audio } from 'expo-av';
import { gameModes } from './utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { selectMode } from './slices/gameSlice';
import { AntDesign } from 'react-native-vector-icons';
import { setPointsInMode } from './slices/gameSlice';

async function playSoundPress() {
  const { sound } = await Audio.Sound.createAsync(
     require('./assets/audio/press.mp3')
  );
  await sound.playAsync();
}

export default function Game() {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [points, setPoints] = useState(0)
  const [selectModeNumber, setSelectModeNumber] = useState(0)

  const modes = useSelector(selectMode)
  const dispatch = useDispatch()

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      delay:.5,
      useNativeDriver: true
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  useEffect(()=>{
    setRunning(false)
    fadeIn()
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
        await sound.pauseAsync();
      }
    }

    playSound()
  }, [running])

  return (
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
              fadeIn(true)
              gameEngine.stop()
              if(points>modes[selectModeNumber].points){
                dispatch(setPointsInMode({id:selectModeNumber, points:points}))
              }
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
          <Animated.View style={{flex:1, justifyContent:"center", flexDirection:'row', alignItems:"center", backgroundColor:"rgba(18, 18, 18,.6)", borderRadius:0
            ,opacity: fadeAnim, zIndex:running?-1:2
          }}>
            <TouchableOpacity onPress={()=>{ playSoundPress(); selectModeNumber>0&&setSelectModeNumber(selectModeNumber-1)}}>
                <AntDesign name='left' size={42} color="white" style={{marginRight:40}}/>    
            </TouchableOpacity>
            <View style={{justifyContent:"center", alignItems:"center"}}>
                <TouchableOpacity onPress={()=>{ fadeOut(), setPoints(0); setRunning(true); gameEngine.swap(entities())}}>
                    <Text style={{color:"white", fontSize:40, letterSpacing:5, fontWeight:'bold', fontFamily: 'sans-serif-condensed'}}>Start game</Text>
                </TouchableOpacity>
                <Text style={{color:modes[selectModeNumber].color, fontWeight:'bold', fontSize:22, textAlign:'center', letterSpacing:3, fontFamily: 'sans-serif-condensed'}}>{modes[selectModeNumber].level} level</Text>
                <View style={{alignItems:'center', flexDirection:'row'}}>
                <Text style={{color:"white", textAlign:'center'}}>Best score</Text>
                <Text style={{color:modes[selectModeNumber].color, fontSize:25, fontWeight:'bold', marginLeft:10}}>{modes[selectModeNumber].points}</Text>
                </View>
            </View>   
            <TouchableOpacity onPress={()=>{ playSoundPress();selectModeNumber<2&&setSelectModeNumber(selectModeNumber+1)}}>
                <AntDesign name='right' size={42} color="white" style={{marginLeft:40}}/>
            </TouchableOpacity>
          </Animated.View> 
      <StatusBar style="auto" hidden={true}/>
    </ImageBackground>
  )
}
