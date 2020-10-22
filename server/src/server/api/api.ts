import { Router } from 'express';
import { Service } from 'typedi';
import { RoomController } from '../game/room/room.controller';


@Service()
export class Api {
  private apiRouter: Router;

  constructor(private roomController: RoomController
  ) {
    this.initRouterAndSetApiRoutes();
  }

  getApiRouter(): Router {
    return this.apiRouter;
  }

  private initRouterAndSetApiRoutes(): void {
    this.apiRouter = Router();

    //setRoutes
    //COMPANY TYPES 
    this.apiRouter.get(
      '/start',
      (req, res, next) => this.roomController.goToStart(req, res, next)
    );


    //COMPANIES
    this.apiRouter.post(
      '/companies',
      (req, res, next) => this.roomController.create(req, res, next)
    );

    this.apiRouter.get(
      '/companies/:id',
      (req, res, next) => this.roomController.getById(req, res, next)
    );

    this.apiRouter.put(
      '/companies/:id',
      (req, res, next) => this.roomController.update(req, res, next)
    );

    this.apiRouter.delete(
      '/companies/:id',
      (req, res, next) => this.roomController.delete(req, res, next)
    );

  }

}
