import { adminChangePswd } from "../../api/cterm/admin/changepswd";
import { adminDelUser } from "../../api/cterm/admin/deluser";
import { adminGetList } from "../../api/cterm/admin/getlist";
import { adminGrant } from "../../api/cterm/admin/grant";
import { adminPrefDelete } from "../../api/cterm/admin/pref/delete";
import { adminPrefGet } from "../../api/cterm/admin/pref/get";
import { adminPrefSet } from "../../api/cterm/admin/pref/set";
import { adminRevoke } from "../../api/cterm/admin/revoke";
import { adminUserBan } from "../../api/cterm/admin/user/ban";
import { adminUserDisable } from "../../api/cterm/admin/user/disable";
import { adminUserEnable } from "../../api/cterm/admin/user/enable";
import { adminUserUnban } from "../../api/cterm/admin/user/unban";
import { Login } from "../../api/cterm/login";
import { prefGet } from "../../api/cterm/pref/get";
import { prefSet } from "../../api/cterm/pref/set";
import { userCreate } from "../../api/cterm/user/create";
import { userDelete } from "../../api/cterm/user/delete";
import { userExists } from "../../api/cterm/user/exists";
import { UserGetList } from "../../api/cterm/user/getlist";
import { userIsAdmin } from "../../api/cterm/user/isadmin";
import { userIsDisabled } from "../../api/cterm/user/isdisabled";
import { Endpoint } from "./main";

export const cTermAPIEval = new Map<string, Endpoint>([
  [
    "/login",
    {
      auth: true,
      admin: false,
      checkAuth: true,
      requiredParams: [],
      optionalParams: [],
      description: "Used for verifying credentials",
      func: Login,
    },
  ],
  [
    "/pref/get",
    {
      auth: true,
      admin: false,
      checkAuth: true,
      requiredParams: [],
      optionalParams: [{ key: "item", format: "base64" }],
      description: "Used for getting user preferences",
      func: prefGet,
    },
  ],
  [
    "/pref/set",
    {
      auth: true,
      admin: false,
      checkAuth: true,
      requiredParams: [
        { key: "item", format: "base64" },
        { key: "value", format: "base64" },
      ],
      optionalParams: [],
      description: "Used for setting user preferences",
      func: prefSet,
    },
  ],
  [
    "/user/create",
    {
      auth: true,
      admin: false,
      checkAuth: false,
      requiredParams: [],
      optionalParams: [],
      description: "Used for creating users",
      func: userCreate,
    },
  ],
  [
    "/user/exists",
    {
      auth: false,
      admin: false,
      checkAuth: false,
      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [],
      description: "Used for checking if a user exists",
      func: userExists,
    },
  ],
  [
    "/user/delete",
    {
      auth: true,
      admin: false,
      checkAuth: true,
      requiredParams: [],
      optionalParams: [],
      description: "Used for deleting a user",
      func: userDelete,
    },
  ],
  [
    "/user/getlist",
    {
      auth: true,
      admin: true,
      checkAuth: true,
      requiredParams: [],
      optionalParams: [],
      description: "Used for getting a list of users",
      func: UserGetList,
    },
  ],
  [
    "/user/isdisabled",
    {
      auth: true,
      admin: true,
      checkAuth: true,
      requiredParams: [],
      optionalParams: [],
      description: "Used for checking if a user is disabled",
      func: userIsDisabled,
    },
  ],
  [
    "/user/isadmin",
    {
      auth: true,
      admin: false,
      checkAuth: true,
      requiredParams: [],
      optionalParams: [],
      description: "Used for checking if the authenticated user is an admin",
      func: userIsAdmin,
    },
  ],
  [
    "/admin/changepswd",
    {
      auth: true,
      admin: true,
      checkAuth: true,
      requiredParams: [
        { key: "user", format: "base64" },
        { key: "new", format: "base64" },
      ],
      optionalParams: [],
      description: "Used for changing the password for another user",
      func: adminChangePswd,
    },
  ],
  [
    "/admin/grant",
    {
      auth: true,
      admin: true,
      checkAuth: true,
      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [],
      description: "Used for granting administrative privileges",
      func: adminGrant,
    },
  ],
  [
    "/admin/revoke",
    {
      auth: true,
      admin: true,
      checkAuth: true,
      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [],
      description: "Used for revoking administrative privileges",
      func: adminRevoke,
    },
  ],
  [
    "/admin/getlist",
    {
      auth: true,
      admin: true,
      checkAuth: true,
      requiredParams: [],
      optionalParams: [],
      description: "Used for getting a list of admins",
      func: adminGetList,
    },
  ],
  [
    "/admin/deluser",
    {
      auth: true,
      admin: true,
      checkAuth: true,
      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [],
      description: "Used for forcefully deleting a user",
      func: adminDelUser,
    },
  ],
  [
    "/admin/pref/set",
    {
      auth: true,
      admin: true,
      checkAuth: true,
      requiredParams: [
        { key: "user", format: "base64" },
        { key: "item", format: "base64" },
        { key: "value", format: "base64" },
      ],
      optionalParams: [],
      description: "Used for setting user preferences",
      func: adminPrefSet,
    },
  ],
  [
    "/admin/pref/get",
    {
      auth: true,
      admin: true,
      checkAuth: true,
      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [{ key: "item", format: "base64" }],
      description: "Used for getting user preferences",
      func: adminPrefGet,
    },
  ],
  [
    "/admin/pref/delete",
    {
      auth: true,
      admin: true,
      checkAuth: true,
      requiredParams: [
        { key: "user", format: "base64" },
        { key: "item", format: "base64" },
      ],
      optionalParams: [],
      description: "Used for deleting user preferences",
      func: adminPrefDelete,
    },
  ],
  [
    "/admin/user/enable",
    {
      auth: true,
      admin: true,
      checkAuth: true,
      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [],
      description: "Used for re-enabling users",
      func: adminUserEnable,
    },
  ],
  [
    "/admin/user/disable",
    {
      auth: true,
      admin: true,
      checkAuth: true,
      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [],
      description: "Used for disabling users",
      func: adminUserDisable,
    },
  ],
  [
    "/admin/user/ban",
    {
      auth: true,
      admin: true,
      checkAuth: true,
      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [],
      description: "Used for banning users from API access.",
      func: adminUserBan,
    },
  ],
  [
    "/admin/user/unban",
    {
      auth: true,
      admin: true,
      checkAuth: true,
      requiredParams: [{ key: "user", format: "base64" }],
      optionalParams: [],
      description: "Used for unbanning users",
      func: adminUserUnban,
    },
  ],
]);
