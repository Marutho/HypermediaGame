import { Service } from 'typedi';

@Service()
export class AppController {

  constructor() {
  }

  /**
   * @api POST /companies
   * 
   * This method creates a new company
   * 
   * @param req 
   * @param res 
   * @param next 
   */
  create(req, res, next) {
    if (req.body) {
    }
  }

  goToRoom(x, y, req, res, next) {
    if (req.body) {
    }
  }

}