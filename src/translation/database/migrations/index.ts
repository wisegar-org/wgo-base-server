import { createTranslationEntity1656439638048 } from "./1656439638048-createTranslationEntity";
import { addTranslationHistoric1668554264770 } from "./1668554264770-addTranslationHistoric";

export const getTranslationMigrations = () => {
  return [
    createTranslationEntity1656439638048,
    addTranslationHistoric1668554264770,
  ];
};
