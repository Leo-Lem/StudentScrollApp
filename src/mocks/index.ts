import { createServer } from "miragejs"

import models from "./models"
import seeds from "./seeds"
import routes from "./routes"

createServer({ namespace: "api/v2", models, seeds, routes })
