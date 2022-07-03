import { getDB, setDB } from "../db/main";

export async function checkBanDB() {
  const bdb = (await getDB("bans")) as { [key: string]: string[] };

  if (!Array.isArray(bdb["bans"])) {
    bdb["bans"] = [];

    await setDB("bans", bdb);
  }
}

export async function banUser(username: string) {
  const bdb = (await getDB("bans")) as { [key: string]: string[] };
  const pdb = (await getDB("pref")) as { [key: string]: any };

  if (!Array.isArray(bdb["bans"])) {
    checkBanDB();
  }

  const bans = bdb.bans as string[];

  if (!bans.includes(username)) {
    bans.push(username);

    bdb["bans"] = bans;

    pdb[username]["role"] = "banned";
    pdb[username]["name"] = `banneduser-${username}`;

    const written = (await setDB("bans", bdb)) && (await setDB("pref", pdb));

    if (!written) {
      console.log("[BANS] FATAL: could not ban user: database write failed.");

      return;
    }
  }
}
export async function unbanUser(username: string) {
  const bdb = (await getDB("bans")) as { [key: string]: string[] };
  const pdb = (await getDB("pref")) as { [key: string]: any };

  if (!Array.isArray(bdb["bans"])) {
    checkBanDB();
  }
  const bans = bdb.bans as string[];

  if (bans.includes(username)) {
    for (let i = bans.length - 1; i >= 0; i--) {
      if (bans[i] === username) {
        bans.splice(i, 1);
      }
    }

    bdb["bans"] = bans;

    pdb[username]["role"] = "regular";
    pdb[username]["name"] = username;

    const written = (await setDB("bans", bdb)) && (await setDB("pref", pdb));

    if (!written) {
      console.log("[BANS] FATAL: could not unban user: database write failed.");

      return;
    }
  }
}
