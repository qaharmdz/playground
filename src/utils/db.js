import { openDB } from 'idb';

const CONFIG = process.env.CONFIG;

const dbInit = async () => {
  return openDB(CONFIG.database.name, CONFIG.database.schemaVersion, {
    upgrade(db) {
      const postStore = db.createObjectStore('posts', { keyPath: 'compositeId' });
      postStore.createIndex('category', 'categories', { multiEntry: true });
      postStore.createIndex('tags', 'tags', { multiEntry: true });
      postStore.createIndex('priority', 'priority');

      const categoryStore = db.createObjectStore('categories', { keyPath: 'id' });
      categoryStore.createIndex('priority', 'priority');

      const tagStore = db.createObjectStore('tags', { keyPath: 'id' });
      tagStore.createIndex('priority', 'priority');

      db.createObjectStore('meta', { keyPath: 'name' });
      db.createObjectStore('settings', { keyPath: 'key' });
    },
  });
};

const clearStore = async (storeName) => {
  const db = await dbInit();
  const tx = db.transaction(storeName, 'readwrite');
  await tx.store.clear();
  await tx.done;
};

const getDbData = async (storeName, key) => {
  const db = await dbInit();
  return db.get(storeName, key);
};

const setDbData = async (storeName, data) => {
  const db = await dbInit();
  const tx = db.transaction(storeName, 'readwrite');
  data.forEach(item => tx.store.put(item));
  await tx.done;
};

const getAllDbData = async (storeName) => {
  const db = await dbInit();
  return db.getAll(storeName);
};

const getAllDbDataByIndex = async (storeName, indexName, indexValue) => {
  const db = await dbInit();
  const tx = db.transaction(storeName, 'readonly');
  const index = tx.store.index(indexName);
  return index.getAll(indexValue);
};

export { dbInit, getDbData, setDbData, clearStore, getAllDbData, getAllDbDataByIndex };
