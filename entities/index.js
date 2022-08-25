import Matter from "matter-js"
import Floor from "../components/Floor";
import Monkey from "../components/Monkey";
import { Dimensions, View } from "react-native";
import Obstacle from "../components/Obstacle";
import { getPipeSizePosPair } from "../utils/random";

const windowWidth  = Dimensions.get('window').width
const windowHeight  = Dimensions.get('window').height

export default restart = () => {
    let engine = Matter.Engine.create({
        enableSleeping:false,
    })

    let world = engine.world
    world.gravity.y = 0.4;
    const pipeSizePosA = getPipeSizePosPair(-300)
    const pipeSizePosB = getPipeSizePosPair(300)

    return {
        physics: {engine, world},
        Monkey: Monkey(world, 'green', {x:50, y:200}, {height:40, width:40}),

        ObstacleTop1: Obstacle(world, 'ObstacleTop1', 'red', pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size),
        ObstacleBottom1: Obstacle(world, 'ObstacleBottom1', 'red', pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size),
        ObstacleTop2: Obstacle(world, 'ObstacleTop2', 'red', pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size),
        ObstacleBottom2: Obstacle(world, 'ObstacleBottom2', 'red', pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size),
        // Floor: Floor(world, '#272727', {x: windowWidth/2 , y: windowHeight}, {height:40, width:windowWidth})
    }
}