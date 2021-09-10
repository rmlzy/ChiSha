let styleMap = {
  'transform-css': {
    webkitTransform: '-webkit-transform',
    MozTransform: '-moz-transform',
    OTransform: '-o-transform',
    msTransform: '-ms-transform',
    transform: 'transform',
  },
  'transform-js': {
    webkitTransform: 'webkitTransform',
    MozTransform: 'MozTransform',
    OTransform: 'OTransform',
    msTransform: 'msTransform',
    transform: 'transform',
  },
  transition: {
    WebkitTransition: 'WebkitTransition',
    MozTransition: 'MozTransition',
    OTransition: 'OTransition',
    transition: 'transition',
  },
  transitionend: {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'mozTransitionend',
    WebkitTransition: 'webkitTransitionEnd',
  },
};

export const prefixStyle = (style) => {
  let el = document.createElement('test');
  for (let key in styleMap[style]) {
    if (el.style[key] !== undefined) {
      return styleMap[style][key];
    }
  }
};

export const getDeg = (cssValue) => {
  let deg = cssValue.match(/([-]?\d*)deg/)
    ? cssValue.match(/([-]?\d*)deg/)[1]
    : 0;
  return parseInt(deg);
};

export const getDate = () => {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 0 && hour <= 10) {
    return '早饭';
  }
  if (hour > 10 && hour <= 14) {
    return '午饭';
  }
  if (hour > 14 && hour <= 18) {
    return '晚饭';
  }
  if (hour > 18 && hour <= 24) {
    return '夜宵';
  }
};

const DEFAULT_MENU = [
  '饺子锅',
  '泰国菜',
  '日本料理',
  '包子',
  '拉面',
  '饺子',
  '泰国菜',
  '日本料理',
  '不吃了',
  '拉面锅',
  '火锅底料',
  '包子',
];

export const getMenus = () => {
  return window.localStorage.getItem('CHI_SHA_MENU') || DEFAULT_MENU;
};

export const setMenus = (menus) => {
  window.localStorage.setItem('CHI_SHA_MENU', menus);
};

const RESULT_MAP = [
  { deg: [0, 15], index: 0 },
  { deg: [345, 360], index: 0 },
  { deg: [315, 345], index: 1 },
  { deg: [285, 315], index: 2 },
  { deg: [255, 285], index: 3 },
  { deg: [225, 255], index: 4 },
  { deg: [195, 225], index: 5 },
  { deg: [165, 195], index: 6 },
  { deg: [135, 165], index: 7 },
  { deg: [105, 135], index: 8 },
  { deg: [75, 105], index: 9 },
  { deg: [45, 75], index: 10 },
  { deg: [15, 45], index: 11 },
];

export const calcResult = (menus, deg) => {
  let result = '';
  for (let i = 0; i < RESULT_MAP.length; i++) {
    const item = RESULT_MAP[i];
    if (deg >= item.deg[0] && deg < item.deg[1]) {
      result = menus[item.index];
      break;
    }
  }
  return result;
};
