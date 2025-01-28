import { DataSource } from "typeorm";
import { GetConfig } from "wgo-settings";
import { SETTINGS_POP3, SETTINGS_SMTP } from "@wisegar-org/wgo-base-models";
import {
  getPop3Settings,
  getSmtpSettings,
  settingsAdminSeeder,
} from "../../settings";
import { ctx } from "../../core/handlers/gql-context-handler";

export const settingsSeeder = async (dataSource: DataSource) => {
  //Save keys to database settings
  await settingsAdminSeeder(
    { ...ctx, dataSource },
    SETTINGS_POP3,
    getPop3Settings(GetConfig<any>())
  );
  await settingsAdminSeeder(
    { ...ctx, dataSource },
    SETTINGS_SMTP,
    getSmtpSettings(GetConfig<any>())
  );
};
