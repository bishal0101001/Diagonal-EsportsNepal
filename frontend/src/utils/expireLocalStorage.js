export function setWithExpiryDate(key, value, time) {
  const date = new Date();

  const item = {
    ...value,
    expiryDate: date.getTime() + time,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiryDate(key) {
  const itemString = localStorage.getItem(key);

  if (!itemString) return null;

  const item = JSON.parse(itemString);

  const date = new Date();

  if (date.getTime() > item.expiryDate) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}
