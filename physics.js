import Matter from "matter-js"

const Physics = (entities, {touches, time, dispatch}) => {
    let engine = entities.physics.engine
    Matter.Engine.update(engine, time.delta)
    touches.filter(t => t.type === 'press')
    .forEach(t => {
        Matter.Body.setVelocity(entities.Moonkey.body, {
            x:0,
            y:-8
        })
    });

    return entities
}

export default Physics