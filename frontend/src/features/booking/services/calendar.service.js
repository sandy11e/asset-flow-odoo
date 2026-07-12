import { mockResourceAvailability } from '../mock/calendar.mock';

let resourcesState = [...mockResourceAvailability];

export const calendarService = {
  async getResourcesAvailability(typeFilter = '') {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!typeFilter) resolve([...resourcesState]);
        else resolve(resourcesState.filter((r) => r.type === typeFilter));
      }, 200);
    });
  },

  async getResourceSchedule(resourceId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = resourcesState.find((r) => r.id === resourceId);
        if (found) resolve({ ...found });
        else reject(new Error('Resource schedule not found'));
      }, 180);
    });
  },

  async toggleAvailability(resourceId, isAvailable) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = resourcesState.findIndex((r) => r.id === resourceId);
        if (idx === -1) return reject(new Error('Resource not found'));
        resourcesState[idx] = { ...resourcesState[idx], isAvailable };
        resolve({ ...resourcesState[idx] });
      }, 200);
    });
  },
};
