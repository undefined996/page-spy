import { ROOM_SESSION_KEY } from '@huolala-tech/page-spy-base/dist/constants';
import { type MPSDK } from '@huolala-tech/page-spy-mp-base';
import type { SpyMessage } from '@huolala-tech/page-spy-types';

// the plugin should store the mp sdk by self, received from initiation.
let mp: MPSDK;
export const getMPSDK = () => mp;

export const setMPSDK = (sdk: MPSDK) => {
  mp = sdk;
};

export const getDeviceId = () => {
  const cache = mp.getStorageSync(ROOM_SESSION_KEY);
  if (cache?.address && typeof cache.address === 'string') {
    return cache.address.slice(0, 4);
  }
  return '--';
};
export const formatFilename = (name: string) => {
  return name.toString().replace(/[^\w]/g, '_');
};

export const makeData = <T extends SpyMessage.DataType>(type: T, data: any) => {
  return {
    type,
    timestamp: Date.now(),
    data,
  };
};

// in mini program, it's unable to make file in memory using blob, need to save file to disk.
export const makeFile = (data: any, filename: string) => {
  const fs = mp.getFileSystemManager();
  const path = `${mp.env.USER_DATA_PATH}/${formatFilename(filename)}.json`;
  fs.writeFileSync(path, JSON.stringify(data), 'utf8');
  return path;
};

export const buildSearchParams = (obj: Record<string, any>) => {
  return Object.entries(obj)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
};
