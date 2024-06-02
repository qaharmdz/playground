import { openDB } from 'idb';

const getDbConfig = () => {
  const CONFIG = process.env.CONFIG;
  return CONFIG.Database;
};

const dbPromise = async () => {
  const { name, VERSION } = getDbConfig();
  return openDB(name, VERSION, {
    upgrade(db) {
      db.createObjectStore('posts', { keyPath: 'compositeId' });
      db.createObjectStore('categories', { keyPath: 'id' });
      db.createObjectStore('tags', { keyPath: 'id' });
      db.createObjectStore('meta', { keyPath: 'name' });
    },
  });
};

export const getDbData = async (storeName, key) => {
  const db = await dbPromise();
  return db.get(storeName, key);
};

export const setDbData = async (storeName, data) => {
  const db = await dbPromise();
  const tx = db.transaction(storeName, 'readwrite');
  data.forEach(item => tx.store.put(item));
  await tx.done;
};

export const clearStore = async (storeName) => {
  const db = await dbPromise();
  const tx = db.transaction(storeName, 'readwrite');
  await tx.store.clear();
  await tx.done;
};
