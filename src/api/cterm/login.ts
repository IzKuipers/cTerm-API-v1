import { IncomingMessage, ServerResponse } from "http";
import { getAuth } from "../../auth/get";
import { verifyCredentials } from "../../auth/main";
import { isDisabled } from "../../auth/role";
import { createDataRes, createErrorRes, writeToRes } from "../../server/return";

export async function Login(req: IncomingMessage, res: ServerResponse) {
  const { username, password } = getAuth(req);

  const valid =
    (await verifyCredentials(username, password)) &&
    !(await isDisabled(username));

  if (!valid) res.statusCode = 401;

  if (!valid && (await isDisabled(username))) {
    writeToRes(
      res,
      createDataRes(false, false, {
        title: "Login failed",
        message:
          "Your account is disabled. You cannot login or undo this yourself.",
      })
    );

    return;
  }

  writeToRes(res, createDataRes({ username }, valid));
}
