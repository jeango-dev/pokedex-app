const ColorCard = (type) => {
  if (type === 'normal' || type === 1) {
    return '#a8a878';
  } else if (type === 'fighting' || type === 2) {
    return '#c02038';
  } else if (type === 'flying' || type === 3) {
    return '#a890f0';
  } else if (type === 'poison' || type === 4) {
    return '#a040a0';
  } else if (type === 'ground' || type === 5) {
    return '#e0c068';
  } else if (type === 'rock' || type === 6) {
    return '#b8a038';
  } else if (type === 'bug' || type === 7) {
    return '#a8b820';
  } else if (type === 'ghost' || type === 8) {
    return '#705898';
  } else if (type === 'steel' || type === 9) {
    return '#ababc7';
  } else if (type === 'fire' || type === 10) {
    return '#f08030';
  } else if (type === 'water' || type === 11) {
    return '#6890f0';
  } else if (type === 'grass' || type === 12) {
    return '#78c850';
  } else if (type === 'electric' || type === 13) {
    return '#f8d030';
  } else if (type === 'psychic' || type === 14) {
    return '#f85888';
  } else if (type === 'ice' || type === 15) {
    return '#98d8d8';
  } else if (type === 'dragon' || type === 16) {
    return '#7038f8';
  } else if (type === 'dark' || type === 17) {
    return '#705848';
  } else if (type === 'fairy' || type === 18) {
    return '#ee99ac';
  } else if (type === 'shadow' || type === 19) {
    return '#000000';
  } else {
    return '#ffffff';
  }
};

export default ColorCard;
