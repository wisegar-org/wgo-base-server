import { IsNullOrUndefined } from "wgo-extensions";
import { DataSource } from "typeorm";
import { SUPERADMIN } from "@wisegar-org/wgo-base-models";
import { RoleEntity } from "../../database/entities/RoleEntity";

export const roleSuperAdminSeeder = async (dataSource: DataSource) => {
  const roleRepository = dataSource.getRepository(RoleEntity);
  const adminRoleResult = await roleRepository.findOne({
    where: { name: SUPERADMIN },
  });
  if (IsNullOrUndefined(adminRoleResult)) {
    const adminRole = new RoleEntity();
    adminRole.name = SUPERADMIN;
    const adminRoleRegistered = await roleRepository.save(adminRole);
    if (!IsNullOrUndefined(adminRoleRegistered))
      console.debug(`Admin Role registered: ${adminRoleRegistered.name}`);
  }
};
