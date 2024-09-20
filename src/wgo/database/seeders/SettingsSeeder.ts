import { DataSource } from "typeorm";
import { GetConfig } from "@wisegar-org/wgo-settings";
import {
  getFinanceOrganizationSettings,
  SETTINGS_FINANCE_ORGANIZATION,
} from "../../services/Finance/FinanceSettings";
import { ctx } from "../../handlers/AppContextHandler";
import {
  getPop3Settings,
  getSmtpSettings,
  settingsAdminSeeder,
} from "../../../settings";
import { SETTINGS_POP3, SETTINGS_SMTP } from "@wisegar-org/wgo-base-models";

export const settingsSeeder = async (dataSource: DataSource) => {
  //Save keys to database settings
  const settings = GetConfig<any>();
  await settingsAdminSeeder(
    { ...ctx, dataSource },
    SETTINGS_POP3,
    getPop3Settings(settings)
  );
  await settingsAdminSeeder(
    { ...ctx, dataSource },
    SETTINGS_SMTP,
    getSmtpSettings(settings)
  );
  await settingsAdminSeeder(
    { ...ctx, dataSource },
    SETTINGS_FINANCE_ORGANIZATION,
    getFinanceOrganizationSettings(settings)
  );
};
