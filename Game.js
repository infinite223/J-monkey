import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Vibration,
  Animated,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./physics";
import { Audio } from "expo-av";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "react-native-vector-icons";
import {
  setPointsInMode,
  setSelectMode,
  setSavedModes,
  selectMode,
} from "./slices/gameSlice";
import { style } from "./styles/gameStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { playSoundPress } from "./utils/soundPress";
import { gameModes } from "./utils/constants";

export default function Game() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [points, setPoints] = useState(0);
  const [selectModeNumber, setSelectModeNumber] = useState(0);
  const [background, setBackground] = useState("background.jpg");

  const modes = useSelector(selectMode);
  const dispatch = useDispatch();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const storeModes = async () => {
    try {
      const jsonValue = JSON.stringify(modes);

      console.log(modes);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      console.log(e, "error");
    }
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      delay: 0.5,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const getModes = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@storage_Key");
        console.log(JSON.parse(jsonValue), "tutaj");
        if (jsonValue != null) {
          dispatch(setSavedModes(JSON.parse(jsonValue)));
        }
      } catch (e) {
        console.log(e);
      }
    };
    getModes();
    setRunning(false);
    fadeIn();
  }, []);

  useEffect(() => {
    storeModes();
  }, [setPointsInMode()]);

  return (
    <ImageBackground
      style={style.imageBackground}
      source={require("./assets/background_2.png")}
    >
      {running && <Text style={style.scoreInGameText}> {points} </Text>}
      <GameEngine
        ref={(ref) => setGameEngine(ref)}
        systems={[Physics]}
        entities={entities(modes[selectModeNumber])}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case "game_over":
              setRunning(false);
              fadeIn(true);
              gameEngine.stop();
              if (points > modes[selectModeNumber].points) {
                dispatch(
                  setPointsInMode({ id: selectModeNumber, points: points })
                );
              }
              break;
            case "new_point":
              setPoints(points + 1);
              break;
          }
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></GameEngine>
      <Animated.View
        style={[
          style.mainContainer,
          { opacity: fadeAnim, zIndex: running ? -1 : 2 },
        ]}
      >
        <TouchableOpacity
          style={{ opacity: selectModeNumber > 0 ? 1 : 0 }}
          onPress={() => {
            selectModeNumber > 0 &&
              (playSoundPress(Audio),
              setSelectModeNumber(selectModeNumber - 1),
              dispatch(setSelectMode(selectModeNumber)));
          }}
        >
          <AntDesign
            name="left"
            size={42}
            color="white"
            style={{ marginRight: 40 }}
          />
        </TouchableOpacity>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              fadeOut(), setPoints(0);
              setRunning(true);
              gameEngine.swap(entities(modes[selectModeNumber]));
            }}
          >
            <Text style={style.startGameText}>Start game</Text>
          </TouchableOpacity>
          <Text
            style={[style.levelText, { color: modes[selectModeNumber].color }]}
          >
            {modes[selectModeNumber].level} level
          </Text>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Text style={{ color: "white", textAlign: "center" }}>
              Best score
            </Text>
            <Text
              style={[
                style.scoreText,
                { color: modes[selectModeNumber].color },
              ]}
            >
              {modes[selectModeNumber].points}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ opacity: selectModeNumber < 3 ? 1 : 0 }}
          onPress={() => {
            selectModeNumber < 3 &&
              (playSoundPress(Audio),
              setSelectModeNumber(selectModeNumber + 1),
              dispatch(setSelectMode(selectModeNumber)));
          }}
        >
          <AntDesign
            name="right"
            size={42}
            color="white"
            style={{ marginLeft: 40 }}
          />
        </TouchableOpacity>
        {!running && (
          <TouchableOpacity
            style={{
              alignItems: "center",
              position: "absolute",
              bottom: 20,
              left: 20,
              zIndex: 100,
            }}
            onPress={async () => {
              await AsyncStorage.removeItem("@storage_Key");
              dispatch(setSavedModes(gameModes));
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "red",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              Reset stats
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
      <StatusBar style="auto" hidden={true} />
    </ImageBackground>
  );
}
