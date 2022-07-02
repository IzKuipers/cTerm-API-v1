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

  if (!Array.isArray(bdb["bans"])) {
    checkBanDB();
  }

  const bans = bdb.bans as string[];

  if (!bans.includes(username)) {
    bans.push(username);

    bdb["bans"] = bans;

    const written = await setDB("bans", bdb);

    if (!written) {
      console.log("[BANS] FATAL: could not ban user: database write failed.");

      return;
    }
  }
}
export async function unbanUser(username: string) {
  const bdb = (await getDB("bans")) as { [key: string]: string[] };

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

    const written = await setDB("bans", bdb);

    if (!written) {
      console.log("[BANS] FATAL: could not unban user: database write failed.");

      return;
    }
  }
}
