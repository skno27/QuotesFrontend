export default function getOppositeColor(color) {
  const oppositeColors = {
    RED: "GREEN",
    GREEN: "RED",
    BLUE: "ORANGE",
    YELLOW: "PURPLE",
    ORANGE: "BLUE",
    PURPLE: "YELLOW",
    BLACK: "WHITE",
    WHITE: "BLACK",
  };

  return oppositeColors[color.toUpperCase()] || "WHITE"; // Default to white
}
