import Matter from 'matter-js'
import React from 'react'
import { Image } from 'react-native'

const Monkey = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    return (    
        <Image 
            style={{
                borderWith:1,
                position:'absolute',
                left:xBody,
                top:yBody,
                width:widthBody,    
                height:heightBody}}
                source={require('../assets/monkey.png')}
          /> 
    )
}

export default (world, color, pos, size) => {
  const initialMonkey = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {label: 'Monkey'}
  )
  
  Matter.World.add(world, initialMonkey)
  return {
    body: initialMonkey,
    color,
    pos,
    renderer:<Monkey/>
  }
}
