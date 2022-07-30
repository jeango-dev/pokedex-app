const ColorCard = (type) => {
  if (type === 'normal' || type === 1) {
    return '#9499a4';
  } else if (type === 'fighting' || type === 2) {
    return '#db405c';
  } else if (type === 'flying' || type === 3) {
    return '#99b6e0';
  } else if (type === 'poison' || type === 4) {
    return '#ae64cd';
  } else if (type === 'ground' || type === 5) {
    return '#dd7f51';
  } else if (type === 'rock' || type === 6) {
    return '#b8a038';
  } else if (type === 'bug' || type === 7) {
    return '#9cc132';
  } else if (type === 'ghost' || type === 8) {
    return '#705898';
  } else if (type === 'steel' || type === 9) {
    return '#518b9e';
  } else if (type === 'fire' || type === 10) {
    return '#e37b2e';
  } else if (type === 'water' || type === 11) {
    return '#4995eb';
  } else if (type === 'grass' || type === 12) {
    return '#62bc5c';
  } else if (type === 'electric' || type === 13) {
    return '#f8d030';
  } else if (type === 'psychic' || type === 14) {
    return '#f85888';
  } else if (type === 'ice' || type === 15) {
    return '#80d1c8';
  } else if (type === 'dragon' || type === 16) {
    return '#0771c5';
  } else if (type === 'dark' || type === 17) {
    return '#5f5c69';
  } else if (type === 'fairy' || type === 18) {
    return '#ee99ac';
  } else if (type === 'shadow' || type === 19) {
    return '#000000';
  } else {
    return '#ffffff';
  }
};

export default ColorCard;
