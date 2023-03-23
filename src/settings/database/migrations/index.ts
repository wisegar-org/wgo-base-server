import { addSettingsEntity1658164004212 } from "./1658164004212-addSettingsEntity";
import { renameTypeSettings1658240270133 } from "./1658240270133-renameTypeSettings";
import { removeAppSettings1658240565587 } from "./1658240565587-removeAppSettings";
import { addSettingHistoric1668553325149 } from "./1668553325149-addSettingHistoric";

export const getSettingsMigrations = () => {
  return [
    addSettingsEntity1658164004212,
    renameTypeSettings1658240270133,
    removeAppSettings1658240565587,
    addSettingHistoric1668553325149,
  ];
};
