import { IsNullOrUndefined } from "wgo-extensions";
import { DataSource } from "typeorm";
import { SUPERADMIN } from "wgo-core-models";
import { RoleEntity } from "../entities/RoleEntity";

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
