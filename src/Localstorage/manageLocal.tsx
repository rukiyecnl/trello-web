const handleLocalStorage = (key: string) => {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, JSON.stringify([]));
  }
};

const getLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default handleLocalStorage;
export { getLocalStorage, setLocalStorage };