import Matter from "matter-js"
import { getPipeSizePosPair } from "./utils/random";
import { Dimensions, Vibration } from "react-native";
import { Audio } from 'expo-av';
import { useState } from "react";

const windowWidth  = Dimensions.get('window').width
const windowHeight  = Dimensions.get('window').height

async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/audio/press.mp3')
    );
    await sound.playAsync();
}

const Physics = (entities, {touches, time, dispatch}) => {
    let engine = entities.physics.engine
    Matter.Engine.update(engine, time.delta)

    touches.filter(t => t.type === 'press')
    .forEach(t => {
        Vibration.vibrate(30)
        Matter.Body.setVelocity(entities.Monkey.body, {
            x:0,
            y:-5
        })
    });

    for (let index = 1; index <= 2; index++) {
        if(entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 && !entities[`ObstacleTop${index}`].point){
            entities[`ObstacleTop${index}`].point = true
            dispatch({type: 'new_point'})
            playSound()
        }

        if(entities[`ObstacleTop${index}`].body.bounds.max.x <= 0){
            const pipeSizePos = getPipeSizePosPair(windowWidth * 0.5)
            
            Matter.Body.setPosition(entities[`ObstacleTop${index}`].body, pipeSizePos.pipeTop.pos)
            Matter.Body.setPosition(entities[`ObstacleBottom${index}`].body, pipeSizePos.pipeBottom.pos)
            entities[`ObstacleTop${index}`].point = false
        }

        Matter.Body.translate(entities[`ObstacleTop${index}`].body, { x: -5, y: 0})
        Matter.Body.translate(entities[`ObstacleBottom${index}`].body, { x: -5, y: 0})  
    }

    if(entities[`Monkey`].body.bounds.max.y > 420 || entities[`Monkey`].body.bounds.max.y < -30){
        dispatch({type: 'game_over'})
    }

    Matter.Events.on(engine, 'collisionStart', () => {
        dispatch({type: 'game_over'})
    })
  

    return entities
}

export default Physics