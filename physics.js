import Matter from "matter-js";
import { getPipeSizePosPair, getRandom } from "./utils/random";
import { Dimensions, Vibration } from "react-native";
import { Audio } from "expo-av";
import { playSoundPress } from "./utils/soundPress";

const windowWidth = Dimensions.get("window").width;

let points = 0,
  speed = -5;

const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;
  let mode = entities.mode.mode;
  Matter.Engine.update(engine, time.delta);

  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Vibration.vibrate(30);
      Matter.Body.setVelocity(entities.Monkey.body, {
        x: 0,
        y: mode.strokeRange,
      });
    });

  for (let index = 1; index <= 2; index++) {
    if (
      entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 &&
      !entities[`ObstacleTop${index}`].point
    ) {
      entities[`ObstacleTop${index}`].point = true;
      dispatch({ type: "new_point" });
      points += 1;
      playSoundPress(Audio);
    }

    if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
      const pipeSizePos = getPipeSizePosPair(windowWidth * 0.5);

      Matter.Body.setPosition(
        entities[`ObstacleTop${index}`].body,
        pipeSizePos.pipeTop.pos
      );
      Matter.Body.setPosition(
        entities[`ObstacleBottom${index}`].body,
        pipeSizePos.pipeBottom.pos
      );
      entities[`ObstacleTop${index}`].point = false;
    }

    if (mode.level === "Epic" && points >= 1) {
      speed = -getRandom(3, 10);
    }

    Matter.Body.translate(entities[`ObstacleTop${index}`].body, {
      x: speed,
      y: 0,
    });
    Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {
      x: speed,
      y: 0,
    });
  }

  if (
    entities[`Monkey`].body.bounds.max.y > 420 ||
    entities[`Monkey`].body.bounds.max.y < -30
  ) {
    dispatch({ type: "game_over" });
    speed = -5;
    points = 0;
  }

  Matter.Events.on(engine, "collisionStart", () => {
    dispatch({ type: "game_over" });
    speed = -5;
    points = 0;
  });

  return entities;
};

export default Physics;
