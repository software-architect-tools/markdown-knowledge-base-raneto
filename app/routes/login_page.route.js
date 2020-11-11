
'use strict';

function route_login_page (config) {
  return function (req, res, next) {

    return res.render(config.theme_override_login || 'login', {
      config      : config,
      layout      : null,
      lang        : config.lang,
      rtl_layout  : config.rtl_layout,
      googleoauth : config.googleoauth
    });

  };
}

// Exports
module.exports = route_login_page;
