import Matter from 'matter-js'
import React from 'react'
import { Image } from 'react-native'
import { getRandom } from './../utils/random';

const Obstacle = props => {
   
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    return (
        <Image   
            style={{
                borderWidth:1,  
                position:'absolute',
                left:xBody,
                top:yBody, 
                height:heightBody,
                width:widthBody
              }
            }
            source={
            require('../assets/Easy/treeEasy2.jpg')}
         //    source={props.mode.obstacle[1]}
          />
    )
}

export default (mode, randomTree, world, label, color, pos, size) => {
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label, isStatic:true }
  )
  
  Matter.World.add(world, initialObstacle)
  return {
    mode,
    randomTree,
    body: initialObstacle,
    color,
    pos,
    renderer:<Obstacle/>
  }
}
