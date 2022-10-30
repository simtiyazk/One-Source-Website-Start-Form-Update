export function Android() {
  return navigator.userAgent.match(/Android/i);
}

export function BlackBerry() {
  return navigator.userAgent.match(/BlackBerry/i);
}

export function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
}

export function Opera() {
  return navigator.userAgent.match(/Opera Mini/i);
}

export function Windows() {
  return navigator.userAgent.match(/IEMobile/i);
}

export function isAnyMobile() {
  return Android() || BlackBerry() || iOS() || Opera() || Windows();
}
