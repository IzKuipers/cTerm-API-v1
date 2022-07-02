import { cTermAPIEval } from "./server/endpoint/store";
import { makeServer } from "./server/main";

makeServer(3000, "cTerm", cTermAPIEval);
