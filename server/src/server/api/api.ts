import { Router } from 'express';
import { Service } from 'typedi';
import { GameController } from '../game/game/game.controller';


@Service()
export class Api {
  private apiRouter: Router;

  constructor(private gameController: GameController
  ) {
    this.initRouterAndSetApiRoutes();
  }

  getApiRouter(): Router {
    return this.apiRouter;
  }

  private initRouterAndSetApiRoutes(): void {
    this.apiRouter = Router();

    this.apiRouter.get(
      '/start',
      (req, res, next) => this.gameController.startGame(req, res, next)
    );

    this.apiRouter.get(
      '/inventory',
      (req, res, next) => this.gameController.showInventory(req, res, next)
    );

    this.apiRouter.post(
      '/room/:id/forward',
      (req, res, next) => this.gameController.forward(req, res, next)
    );

    this.apiRouter.post(
      '/room/:id/right',
      (req, res, next) => this.gameController.right(req, res, next)
    );

    this.apiRouter.post(
      '/room/:id/left',
      (req, res, next) => this.gameController.left(req, res, next)
    );

    this.apiRouter.post(
      '/room/:id/back',
      (req, res, next) => this.gameController.back(req, res, next)
    );
  }
}
