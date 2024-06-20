export const gameModes = [
  {
    level: "Easy",
    color: "lightgreen",
    select: true,
    points: 0,
    strokeRange: -5,
    obstacleRange: { min: 20, max: 40 },
  },
  {
    level: "Medium",
    color: "blue",
    select: false,
    points: 0,
    strokeRange: -6,
    obstacleRange: { min: 0, max: 30 },
  },
  {
    level: "Hard",
    color: "red",
    select: false,
    points: 0,
    strokeRange: -6,
    obstacleRange: { min: -20, max: 10 },
  },
  {
    level: "Epic",
    color: "#aa00ff",
    select: false,
    points: 0,
    strokeRange: -7,
    obstacleRange: { min: -40, max: 10 },
  },
];
