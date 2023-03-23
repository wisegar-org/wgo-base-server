import { addLanguageEntity1656012423678 } from "./1656012423678-addLanguageEntity";
import { addLanguageHistoric1668550415911 } from "./1668550415911-addLanguageHistoric";
import { addLanguageLogo1668895775452 } from "./1668895775452-addLanguageLogo";

export const getLanguageMigrations = () => {
  return [
    addLanguageEntity1656012423678,
    addLanguageHistoric1668550415911,
    addLanguageLogo1668895775452,
  ];
};
