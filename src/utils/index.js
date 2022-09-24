import * as helpers from "./helpers";

export default {
  install(app, config) {
    app.config.globalProperties.$h = helpers;
  },
};
