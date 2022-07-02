import { getDB } from "../db/main";
import { userExists } from "./user";

export async function isAdmin(username: string): Promise<boolean> {
  const pdb = (await getDB("pref")) as { [key: string]: any };
  const cdb = (await getDB("cred")) as { [key: string]: string };

  const userdata = pdb[username];
  const credstrn = cdb[username];

  if (userdata && credstrn) {
    const role = userdata.role;

    return role == "admin";
  }

  return false;
}

export async function isDisabled(username: string): Promise<boolean> {
  const pdb = (await getDB("pref")) as { [key: string]: any };
  const cdb = (await getDB("cred")) as { [key: string]: string };

  const userdata = pdb[username];
  const credstrn = cdb[username];

  if (userdata && credstrn) {
    const role = userdata.role;

    return role == "disabled";
  }

  return false;
}

export async function isBanned(username: string): Promise<boolean> {
  const pdb = (await getDB("bans")) as { [key: string]: string[] };

  const banned = pdb.bans.includes(username);

  return banned;
}
