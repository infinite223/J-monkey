import Matter from "matter-js"
import Monkey from "../components/Monkey";
import Obstacle from "../components/Obstacle";
import { getPipeSizePosPair, getRandom } from "../utils/random";

export default restart = (mode) => {
    let engine = Matter.Engine.create({
        enableSleeping:false,
    })

    let world = engine.world
    world.gravity.y = 0.4;
    const pipeSizePosA = getPipeSizePosPair(-300, mode)
    const pipeSizePosB = getPipeSizePosPair(300, mode)

    const randomTree = getRandom(0,2)

    return {
        physics: {engine, world},   
        mode: {mode: mode}, 
        Monkey: Monkey(world, 'green', {x:50, y:200}, {height:40, width:40}),

        ObstacleTop1: Obstacle(mode, randomTree, world, 'ObstacleTop1', 'red', pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size),
        ObstacleBottom1: Obstacle(mode, randomTree, world, 'ObstacleBottom1', 'red', pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size),
        ObstacleTop2: Obstacle(mode, randomTree, world, 'ObstacleTop2', 'red', pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size),
        ObstacleBottom2: Obstacle(mode, randomTree, world, 'ObstacleBottom2', 'red', pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size),
    }
}