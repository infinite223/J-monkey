import Matter from 'matter-js'
import React from 'react'
import { Image } from 'react-native'
import { getRandom } from './../utils/random';

const Obstacle = props => {
   
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    console.log(props.mode.obstacle)
    const randomTreeSource = props.mode.obstacle[getRandom(0,2)]

    return (
        <Image   
            style={{
                borderWidth:1,  
                position:'absolute',
                left:xBody,
                top:yBody, 
                height:heightBody
              }
            }
            source={require(`../assets/${props.mode.level}/${randomTreeSource}`)}
          />
    )
}

export default (world, label, color, pos, size) => {
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label, isStatic:true }
  )
  
  Matter.World.add(world, initialObstacle)
  return {
    body: initialObstacle,
    color,
    pos,
    renderer:<Obstacle/>
  }
}
