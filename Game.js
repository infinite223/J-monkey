import { View, ImageBackground, TouchableOpacity, Text, Vibration, Animated } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import { Audio } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux';
import { selectMode } from './slices/gameSlice';
import { AntDesign } from 'react-native-vector-icons';
import { setPointsInMode, setSelectMode, setSavedModes } from './slices/gameSlice';
import { style } from './styles/gameStyle';
import AsyncStorage  from '@react-native-async-storage/async-storage'

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

  const storeModes = async () => {
    try {
      const jsonValue = JSON.stringify(modes)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      console.log(e, "error")
    }
  }

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
    const getModes = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key')
        if(jsonValue != null){
          dispatch(setSavedModes(JSON.parse(jsonValue)))
          console.log(JSON.parse(jsonValue))
        }
      } catch(e) {
        // error reading value
      }
    }
    getModes()
    setRunning(false)
    fadeIn()
  }, [])

  useEffect(()=> {
    console.log(modes)
    storeModes()
  },[setPointsInMode()])


  return (
    <ImageBackground 
        style={style.imageBackground}
        source={require('./assets/background.jpg')}
    > 
      {running && <Text style={style.scoreInGameText}> {points} </Text>}
      <GameEngine
        ref={(ref)=>setGameEngine(ref)}
        systems={[Physics]}
        entities={entities(modes[selectModeNumber])}   
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
          <Animated.View style={[style.mainContainer, {opacity: fadeAnim, zIndex:running?-1:2}]}>
            <TouchableOpacity onPress={()=>{ playSoundPress(); selectModeNumber>0&&(setSelectModeNumber(selectModeNumber-1),dispatch(setSelectMode(selectModeNumber)))}}>
                <AntDesign name='left' size={42} color="white" style={{marginRight:40}}/>    
            </TouchableOpacity>
            <View style={{justifyContent:"center", alignItems:"center"}}>
                <TouchableOpacity onPress={()=>{ fadeOut(), setPoints(0); setRunning(true); gameEngine.swap(entities(modes[selectModeNumber]))}}>
                    <Text style={style.startGameText}>Start game</Text>
                </TouchableOpacity>
                    <Text style={[style.levelText, {color:modes[selectModeNumber].color}]}>{modes[selectModeNumber].level} level</Text>
                <View style={{alignItems:'center', flexDirection:'row'}}>
                <Text style={{color:"white", textAlign:'center'}}>Best score</Text>
                <Text style={[style.scoreText, {color:modes[selectModeNumber].color}]}>{modes[selectModeNumber].points}</Text>
                </View>
            </View>   
            <TouchableOpacity onPress={()=>{ playSoundPress(); selectModeNumber<2&&(setSelectModeNumber(selectModeNumber+1), dispatch(setSelectMode(selectModeNumber)))}}>
                <AntDesign name='right' size={42} color="white" style={{marginLeft:40}}/>
            </TouchableOpacity>
          </Animated.View> 
      <StatusBar style="auto" hidden={true}/>
    </ImageBackground>
  )
}
