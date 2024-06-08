import CONFIG from '../config';
import { dbGetData, dbSetData, dbGetConnection } from './db';

const userSetSetting = async (key, value) => {
  await dbSetData('settings', [{ key, value }]);
};

const userGetSetting = async (key, fallbackValue = null) => {
  const value = await dbGetData('settings', key);
  if (value === undefined) {
    return CONFIG.settings[key] !== undefined ? CONFIG.settings[key] : fallbackValue;
  }
  return value;
};

const userGetAllSettings = async () => {
  const db = await dbGetConnection();
  const tx = db.transaction('settings', 'readonly');
  const settings = await tx.store.getAll();
  await tx.done;

  const settingsMap = new Map(settings.map(setting => [setting.key, setting.value]));
  const allSettings = { ...CONFIG.settings };

  for (const [key, value] of settingsMap) {
    allSettings[key] = value;
  }

  return allSettings;
};

const userDeleteSetting = async (key) => {
  const db = await dbGetConnection();
  const tx = db.transaction('settings', 'readwrite');
  await tx.store.delete(key);
  await tx.done;
};

export { userGetAllSettings, userGetSetting, userSetSetting, userDeleteSetting };
