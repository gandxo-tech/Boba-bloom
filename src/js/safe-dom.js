/**
 * Safe DOM Manipulation Utilities
 * Eliminates direct unsafe innerHTML assignments to prevent XSS vulnerabilities.
 */

export function el(tag, attributes = {}, ...children) {
  const element = document.createElement(tag);
  
  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'className' || key === 'class') {
      element.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(element.style, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else if (key.startsWith('data-')) {
      element.setAttribute(key, value);
    } else if (key === 'dataset' && typeof value === 'object') {
      Object.assign(element.dataset, value);
    } else if (typeof value === 'boolean') {
      if (value) element.setAttribute(key, '');
    } else if (value !== null && value !== undefined) {
      element.setAttribute(key, String(value));
    }
  }

  for (const child of children.flat()) {
    if (child === null || child === undefined || child === false) continue;
    if (typeof child === 'string' || typeof child === 'number') {
      element.appendChild(document.createTextNode(String(child)));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  }

  return element;
}

export function clearChildren(parent) {
  if (!parent) return;
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export function setSafeContent(parent, ...children) {
  if (!parent) return;
  clearChildren(parent);
  for (const child of children.flat()) {
    if (child === null || child === undefined || child === false) continue;
    if (typeof child === 'string' || typeof child === 'number') {
      parent.appendChild(document.createTextNode(String(child)));
    } else if (child instanceof Node) {
      parent.appendChild(child);
    }
  }
}
