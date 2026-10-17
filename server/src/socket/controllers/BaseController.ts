class BaseController {
  constructor(socket) {
    // @ts-ignore
    this.socket = socket;
  }
}
module.exports = BaseController;
