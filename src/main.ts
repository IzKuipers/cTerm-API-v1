import { cTermAPIEval } from "./server/endpoint/store";
import { makeServer } from "./server/main";

makeServer(4567, "cTerm", cTermAPIEval);
