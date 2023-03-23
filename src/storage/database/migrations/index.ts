import { addMediaEntity1658931161380 } from "./1658931161380-addMediaEntity";
import { addStorageEntity1658931419178 } from "./1658931419178-addStorageEntity";
import { addStorageHistory1668542155507 } from "./1668542155507-addStorageHistory";
import { addMediaHistory1668545019180 } from "./1668545019180-addMediaHistory";
import { addNewFieldsOnMedia1668894746262 } from "./1668894746262-addNewFieldsOnMedia";

export const getStorageMigrations = () => {
  return [
    addMediaEntity1658931161380,
    addStorageEntity1658931419178,
    addStorageHistory1668542155507,
    addMediaHistory1668545019180,
    addNewFieldsOnMedia1668894746262,
  ];
};
