import { MPSDK } from './types';

// PENDING: 这里补泛型
export const promisifyMPApi = <R = any>(api: (params: any) => any) => {
  return (params: Record<string, any>) => {
    return new Promise<R>((resolve, reject) => {
      api({
        ...params,
        success(res: any) {
          resolve(res);
        },
        fail(err: any) {
          reject(err);
        },
      });
    });
  };
};

export const joinQuery = (args: Record<string, unknown>) => {
  const arr: string[] = [];
  Object.entries(args).forEach(([k, v]) => {
    arr.push(`${k}=${v}`);
  });
  return arr.join('&');
};

let mpSDK: MPSDK;

export const getMPSDK = () => {
  if (!mpSDK) {
    throw Error('the mp sdk is not set');
  }
  return mpSDK;
};

export const setMPSDK = (SDK: MPSDK) => {
  mpSDK = SDK;
};

// Some platform has no global object, we provide this function to manually create your own global object.
let customGlobal: Record<string, any> = {};
export const setCustomGlobal = (global: Record<string, any>) => {
  customGlobal = global;
};

// get the global context, and we assume the window is better than global, even in
// mini program environment, mostly because of alipay...
export const getGlobal = () => {
  let foundGlobal: Record<string, any> = {};
  if (typeof globalThis !== 'undefined') {
    foundGlobal = globalThis;
  } else if (typeof window !== 'undefined') {
    foundGlobal = window;
  } else if (typeof global === 'object' && Object.keys(global).length > 1) {
    foundGlobal = global;
  }
  if (customGlobal) {
    Object.assign(foundGlobal, customGlobal);
  }
  return foundGlobal;
};

// wrap the mp api to smooth the platform differences, for internal usage only.
// this api can be modified by mp sdk implementor.
export const utilAPI = {
  setStorage(key: string, data: any) {
    return mpSDK?.setStorageSync(key, data);
  },
  getStorage(key: string) {
    return mpSDK?.getStorageSync(key);
  },
  removeStorage(key: string) {
    return mpSDK?.getStorageSync(key);
  },
  showActionSheet(params: Parameters<MPSDK['showActionSheet']>[0]) {
    return mpSDK.showActionSheet(params);
  },
};
