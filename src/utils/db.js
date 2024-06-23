import { openDB } from 'idb';
import CONFIG from '../config';

import { fuzzySearch } from './dataSearch';

const dbInitSchema = async (db) => {
  const storeNames = db.objectStoreNames;

  if (!storeNames.contains('posts')) {
    const postStore = db.createObjectStore('posts', { keyPath: 'compositeId' });
    postStore.createIndex('categories', 'categories', { multiEntry: true });
    postStore.createIndex('tags', 'tags', { multiEntry: true });
    postStore.createIndex('priority', 'priority');
  }

  if (!storeNames.contains('categories')) {
    const categoryStore = db.createObjectStore('categories', { keyPath: 'id' });
    categoryStore.createIndex('priority', 'priority');
  }

  if (!storeNames.contains('tags')) {
    const tagStore = db.createObjectStore('tags', { keyPath: 'id' });
    tagStore.createIndex('priority', 'priority');
  }

  if (!storeNames.contains('meta')) {
    db.createObjectStore('meta', { keyPath: 'name' });
  }

  if (!storeNames.contains('settings')) {
    db.createObjectStore('settings', { keyPath: 'key' });
  }
};

const dbGetConnection = async () => {
  return openDB(CONFIG.database.name, CONFIG.database.schemaVersion, {
    upgrade(db, oldVersion, newVersion, transaction) {
      console.log(`Upgrading DB from version ${oldVersion} to ${newVersion}`);
      dbInitSchema(db);  // Reinitialize schema
    },
  });
};

const clearStore = async (storeName) => {
  const db = await dbGetConnection();
  const tx = db.transaction(storeName, 'readwrite');
  await tx.store.clear();
  await tx.done;
};

const dbGetData = async (storeName, key) => {
  const db = await dbGetConnection();
  return db.get(storeName, key);
};

const dbSetData = async (storeName, data) => {
  const db = await dbGetConnection();
  const tx = db.transaction(storeName, 'readwrite');
  data.forEach(item => tx.store.put(item));
  await tx.done;
};

const searchData = async (query, storeMap) => {
  const db = await dbGetConnection();
  const results = [];

  for (const storeName of Object.keys(storeMap)) {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.store;
    let cursor = await store.openCursor();

    while (cursor) {
      const record = cursor.value;

      for (const field of storeMap[storeName]) {
        const matchScore = fuzzySearch(record[field], query);
        if (matchScore > 0) {
          results.push({ storeName, record, score: matchScore });
          break;
        }
      }

      cursor = await cursor.continue();
    }
  }

  // Sort results by score in descending order
  results.sort((a, b) => b.score - a.score);

  return results;
};

const dbGetAllData = async (storeName) => {
  const db = await dbGetConnection();
  return db.getAll(storeName);
};

const dbGetAllDataByIndex = async (storeName, indexName, indexValue) => {
  const db = await dbGetConnection();
  const tx = db.transaction(storeName, 'readonly');
  const index = tx.store.index(indexName);
  return index.getAll(indexValue);
};

export {
  dbGetConnection, clearStore,
  dbGetData, dbSetData, searchData,
  dbGetAllData, dbGetAllDataByIndex
};
