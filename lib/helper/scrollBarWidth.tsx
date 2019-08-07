export default function scrollbarWidth() {
  if (typeof document === 'undefined') return 0;

  const divElement = document.createElement('div');
  const divElementStyle = divElement.style;

  divElementStyle.position = 'fixed';
  divElementStyle.left = 0;
  divElementStyle.visibility = 'hidden';
  divElementStyle.overflowY = 'scroll';

  document.body.appendChild(divElement);

  const width = divElement.getBoundingClientRect().right;

  document.body.removeChild(divElement);

  return width;
}
