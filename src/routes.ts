import { Router } from "express";
import * as UserController from "@controllers/UserController";
import * as PlantController from "@controllers/PlantController";

const routes = Router();


routes.post("/users", UserController.createUser);
routes.get("/users", UserController.readAllUsers);
routes.get("/users/:id", UserController.readUserById);
routes.patch("/users/:id", UserController.updateUser);
routes.delete("/users/:id", UserController.deleteUser);

routes.post("/plantas", PlantController.createPlant);
routes.get("/plantas/estoque/valor-total", PlantController.getTotalStockValue);
routes.get("/plantas", PlantController.readAllPlants);
routes.get("/plantas/:id", PlantController.readPlantById);
routes.patch("/plantas/:id", PlantController.updatePlant);
routes.delete("/plantas/:id", PlantController.deletePlant);
routes.post("/plantas/:id/venda", PlantController.sellPlant);

export default routes;