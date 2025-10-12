// IndexedDB Configuration
const DB_NAME = 'WeatherAppDB';
const DB_VERSION = 1;
const USER_STORE = 'users';
let db;

// Initialize IndexedDB
export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      db = event.target.result;
      
      // Create user object store
      if (!db.objectStoreNames.contains(USER_STORE)) {
        const userStore = db.createObjectStore(USER_STORE, { keyPath: 'uuid' });
        userStore.createIndex('email', 'email', { unique: true });
        userStore.createIndex('name', 'name', { unique: false });
      }
    };
  });
};

// Generate UUID v4
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Save user to database
export const saveUser = async (userData) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([USER_STORE], 'readwrite');
    const store = transaction.objectStore(USER_STORE);
    
    const user = {
      uuid: generateUUID(),
      name: userData.name,
      email: userData.email,
      originCity: userData.originCity,
      createdAt: new Date().toISOString()
    };
    
    const request = store.add(user);
    
    request.onsuccess = () => resolve(user);
    request.onerror = () => reject(request.error);
  });
};

// Get current user (returns first user in DB)
export const getCurrentUser = async () => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([USER_STORE], 'readonly');
    const store = transaction.objectStore(USER_STORE);
    const request = store.getAll();
    
    request.onsuccess = () => {
      const users = request.result;
      resolve(users.length > 0 ? users[0] : null);
    };
    request.onerror = () => reject(request.error);
  });
};

// Delete user (logout)
export const deleteUser = async (uuid) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([USER_STORE], 'readwrite');
    const store = transaction.objectStore(USER_STORE);
    const request = store.delete(uuid);
    
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
