export function createElement(tag, className = null, attributes = {}) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  for (const key in attributes) {
    if (Object.prototype.hasOwnProperty.call(attributes, key)) {
      element[key] = attributes[key];
    }
  }
  return element;
}

export function appendChildren(parent, ...children) {
  children.forEach((child) => parent.appendChild(child));
}
