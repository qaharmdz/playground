import { openDB } from 'idb';

const DATABASE_NAME = 'dbTonggo';
const DATABASE_VERSION = 1;
const STORE_NAMES = {
  posts: 'posts',
  categories: 'categories',
  tags: 'tags',
};

async function initDB() {
  const db = await openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAMES.posts)) {
        db.createObjectStore(STORE_NAMES.posts, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(STORE_NAMES.categories)) {
        db.createObjectStore(STORE_NAMES.categories, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(STORE_NAMES.tags)) {
        db.createObjectStore(STORE_NAMES.tags, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
}

async function getStore(storeName, mode = 'readonly') {
  const db = await initDB();
  return db.transaction(storeName, mode).objectStore(storeName);
}

async function addData(storeName, data) {
  const store = await getStore(storeName, 'readwrite');
  return store.add(data);
}

async function getData(storeName, key) {
  const store = await getStore(storeName);
  return store.get(key);
}

async function getAllData(storeName) {
  const store = await getStore(storeName);
  return store.getAll();
}

async function updateData(storeName, data) {
  const store = await getStore(storeName, 'readwrite');
  return store.put(data);
}

async function deleteData(storeName, key) {
  const store = await getStore(storeName, 'readwrite');
  return store.delete(key);
}

async function clearStore(storeName) {
  const store = await getStore(storeName, 'readwrite');
  return store.clear();
}

export {
  initDB,
  addData,
  getData,
  getAllData,
  updateData,
  deleteData,
  clearStore,
  STORE_NAMES,
};
