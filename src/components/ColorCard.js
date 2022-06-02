const ColorCard = (type) => {
  if (type === "normal" || type === 1) {
    return "#4B88A2";
  } else if (type === "fighting" || type === 2) {
    return "#E06D06";
  } else if (type === "flying" || type === 3) {
    return "#48677b";
  } else if (type === "poison" || type === 4) {
    return "#392759";
  } else if (type === "ground" || type === 5) {
    return "#a37324";
  } else if (type === "rock" || type === 6) {
    return "#533E2D";
  } else if (type === "bug" || type === 7) {
    return "#009B72";
  } else if (type === "ghost" || type === 8) {
    return "#3B3561";
  } else if (type === "steel" || type === 9) {
    return "#7C7C7C";
  } else if (type === "fire" || type === 10) {
    return "#DF2935";
  } else if (type === "water" || type === 11) {
    return "#258EA6";
  } else if (type === "grass" || type === 12) {
    return "#16C172";
  } else if (type === "electric" || type === 13) {
    return "#FDE12D";
  } else if (type === "psychic" || type === 14) {
    return "#E85F5C";
  } else if (type === "ice" || type === 15) {
    return "#86d2f4";
  } else if (type === "dragon" || type === 16) {
    return "#D62839";
  } else if (type === "dark" || type === 17) {
    return "#2A2D34";
  } else if (type === "fairy" || type === 18) {
    return "#F42272";
  } else if (type === "shadow" || type === 19) {
    return "#000000";
  } else {
    return "#ffeb3b";
  }
};

export default ColorCard;
