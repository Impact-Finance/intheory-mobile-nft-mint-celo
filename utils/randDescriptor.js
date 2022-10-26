const settings = [
  // 'exploding volcano',
  'outer space',
  'saturn',
  'event horizon',
  // 'mountain top',
  'laboratory',
  'spaceship',
  // 'mars',
  'moon',
  // 'underwater',
  'underground lair',
  'mechanical cave',
  'utopia',
  'dystopia',
  'year 3000',
  'black hole',
  'supernova',
  'nebula',
];
const styles = [
  'surrealist',
  'realistic',
  '3d graphic',
  'anime',
  // 'pixel art',
  'isometric',
  'abstract',
  'cartoon',
  'graffiti',
  // 'impressionist',
  'neoclassical',
  'psychedelic',
  'retrofuturism',
  'synthwave',
  'cinematic 4K',
];
const colors = [
  'red',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'neon',
  'vibrant',
  'black',
  'white',
  'rainbow',
  'aurora',
];
const adjectives = [
  'cloudy',
  'sunny',
  'abandoned',
  'rainy',
  'foggy',
  'mystical',
  'futuristic',
  'malevolent',
  'melancholy',
  'jubilant',
  'arcane',
  'epic',
  'fantastic',
  'monumental',
  'rule of thirds',
  'atmospheric',
];
// const subjects = [
//   'robots',
//   'aliens',
//   'scientists',
//   'researchers',
//   'cyborgs',
//   'machines',
// ];
// const ingVerbs = [
//   'discovering',
//   'advancing',
//   'finding',
//   'creating',
//   'building',
//   'destroying',
//   'studying',
//   'synthesizing',
//   'titrating',
//   'fabricating',
// ];

function randomDescriptor(type) {
  if (type === 'setting') {
    const descriptor = settings[Math.floor(Math.random() * settings.length)];
    return descriptor;
  } else if (type === 'style') {
    const descriptor = styles[Math.floor(Math.random() * styles.length)];
    return descriptor;
  } else if (type === 'color') {
    const descriptor = colors[Math.floor(Math.random() * colors.length)];
    return descriptor;
  } else if (type === 'adjective') {
    const descriptor =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    return descriptor;
  } else if (type === 'subject') {
    const descriptor = subjects[Math.floor(Math.random() * subjects.length)];
    return descriptor;
  } else if (type === 'ingVerb') {
    const descriptor = ingVerbs[Math.floor(Math.random() * ingVerbs.length)];
    return descriptor;
  } else {
    return 'futuristic';
  }
}

module.exports = randomDescriptor;
