import { IncomingMessage, ServerResponse } from "http";
import url from "url";
import { isAdmin } from "../../../auth/role";
import { commitChanges, getDB, setDB } from "../../../db/main";
import { createErrorRes, writeToRes } from "../../../server/return";
import argon2 from "argon2";
import { userExists } from "../../../auth/user";
export async function adminChangePswd(
  req: IncomingMessage,
  res: ServerResponse
) {
  const query = url.parse(req.url as string, true).query;

  const username = atob(query["user"] as string);
  const newPsswd = atob(query["new"] as string);

  const cdb = (await getDB("cred")) as { [key: string]: string };

  if (!(await userExists(username))) {
    res.statusCode = 406;
    writeToRes(
      res,
      createErrorRes(
        "Cannot change password",
        "Cannot change the password for a user that doesn't exist."
      )
    );
    return;
  }

  if (await isAdmin(username)) {
    res.statusCode = 405;
    writeToRes(
      res,
      createErrorRes(
        "Cannot change password",
        "Cannot change the password for another admin."
      )
    );
    return;
  }

  const pswd = await argon2.hash(newPsswd, {
    type: argon2.argon2i,
    memoryCost: 2 ** 16,
    timeCost: 6,
    hashLength: 32,
  });

  cdb[username] = pswd;

  commitChanges("change password", res, { db: "cred", data: cdb });
}
