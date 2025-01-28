import { migrations1651766519693 } from "./1651766519693-migrations";
import { addRoleEntity1656005738186 } from "./1656005738186-addRoleEntity";
import { addLanguageEntity1656012423678 } from "./1656012423678-addLanguageEntity";
import { addCertificateFields1656434163078 } from "./1656434163078-addCertificateFields";
import { fixAdminPassword1658417129112 } from "./1658417129112-fixAdminPassword";
import { addContactMeEntity1658932057343 } from "./1658932057343-addContactMeEntity";
import { addUniqueUserProps1661872515554 } from "./1661872515554-addUniqueUserProps";
import { addUniqueCodeProp1662052264312 } from "./1662052264312-addUniqueCodeProp";
import { createHistoricTable1668532176196 } from "./1668532176196-createHistoricTable";
import { createEventTable1668534412569 } from "./1668534412569-createEventTable";
import { createInscriptionTable1668535321834 } from "./1668535321834-createInscriptionTable";
import { createPollTable1668539264505 } from "./1668539264505-createPollTable";
import { createNewsletterInscriptionTable1668539471828 } from "./1668539471828-createNewsletterInscriptionTable";
import { createNewsletterMessageTable1668539669907 } from "./1668539669907-createNewsletterMessageTable";
import { addAuthHistoric1668548748218 } from "./1668548748218-addAuthHistoric";
import { addContactMeHistoric1668549723950 } from "./1668549723950-addContactMeHistoric";
import { changeDateType1668550334970 } from "./1668550334970-changeDateType";
import { addLanguageHistoric1668550415911 } from "./1668550415911-addLanguageHistoric";
import { addLanguageAndProfile1668893995656 } from "./1668893995656-addLanguageAndProfile";
import { addLanguageLogo1668895775452 } from "./1668895775452-addLanguageLogo";
import { addRoleHistoric1668897491219 } from "./1668897491219-addRoleHistoric";
import { addCapAddressFields1676387599752 } from "./1676387599752-addCapAddressFields";
import { addPhoneField1677015519596 } from "./1677015519596-addPhoneField";

export const getAgvMigrations = () => {
  return [
    createEventTable1668534412569,
    createInscriptionTable1668535321834,
    createPollTable1668539264505,
    createNewsletterInscriptionTable1668539471828,
    createNewsletterMessageTable1668539669907,
    changeDateType1668550334970,
  ];
};

export const getAuthenticationMigrations = () => {
  return [
    migrations1651766519693,
    addRoleEntity1656005738186,
    addCertificateFields1656434163078,
    fixAdminPassword1658417129112,
    addUniqueUserProps1661872515554,
    addUniqueCodeProp1662052264312,
    addAuthHistoric1668548748218,
    addLanguageAndProfile1668893995656,
    addRoleHistoric1668897491219,
    addCapAddressFields1676387599752,
    addPhoneField1677015519596,
  ];
};

export const getContactMigrations = () => {
  return [addContactMeEntity1658932057343, addContactMeHistoric1668549723950];
};

export const getHistoricMigrations = () => {
  return [createHistoricTable1668532176196];
};

export const getLanguageMigrations = () => {
  return [
    addLanguageEntity1656012423678,
    addLanguageHistoric1668550415911,
    addLanguageLogo1668895775452,
  ];
};
