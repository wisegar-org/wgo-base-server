import { migrations1651766519693 } from "./1651766519693-migrations";
import { addRoleEntity1656005738186 } from "./1656005738186-addRoleEntity";
import { addCertificateFields1656434163078 } from "./1656434163078-addCertificateFields";
import { fixAdminPassword1658417129112 } from "./1658417129112-fixAdminPassword";
import { addUniqueUserProps1661872515554 } from "./1661872515554-addUniqueUserProps";
import { addUniqueCodeProp1662052264312 } from "./1662052264312-addUniqueCodeProp";
import { addAuthHistoric1668548748218 } from "./1668548748218-addAuthHistoric";
import { addLanguageAndProfile1668893995656 } from "./1668893995656-addLanguageAndProfile";
import { addRoleHistoric1668897491219 } from "./1668897491219-addRoleHistoric";
import { addCapAddressFields1676387599752 } from "./1676387599752-addCapAddressFields";
import { addPhoneField1677015519596 } from "./1677015519596-addPhoneField";

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
