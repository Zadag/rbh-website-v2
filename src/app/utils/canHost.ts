import { Roles } from "@/types/User";
import configProd from "../../../config.prod.json";
import configLocal from "../../../config.local.json";
const config =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "local" ? configLocal : configProd;


const canHost = (roles: Roles) => {
    if (!roles) return

    const refRoles = config.ref_roles;

    for (const role in roles) {
        for (const refRole in refRoles) {
            if (roles[role] === refRoles[refRole as keyof typeof refRoles]) return true
        }
    }
    return false
}

export default canHost;