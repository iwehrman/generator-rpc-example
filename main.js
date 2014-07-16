/*jslint node: true*/

(function () {
    "use strict";

    var pkg = require("./package");

    exports.init = function (generator, config, logger) {
        setTimeout(function () {
            logger.info("Starting websocket server on dynamic port...");
            generator.startWebsocketServer(pkg.name)
                .then(function (port) {
                    logger.info("Started websocket server on port", port);
                    return generator.getCustomOptions(pkg.name);
                })
                .get("websocketServerPort")
                .then(function (port) {
                    logger.info("Stored port: ", port);
                    logger.info("Stopping websocket server...");
                    return generator.stopWebsocketServer(pkg.name);
                })
                .then(function () {
                    logger.info("Stopped websocket server");
                    return generator.getCustomOptions(pkg.name);
                })
                .get("websocketServerPort")
                .then(function (port) {
                    logger.info("Stored port: ", port);
                    logger.info("Starting websocket server on port 59595...");
                    return generator.startWebsocketServer(pkg.name, 59595);
                })
                .then(function (port) {
                    logger.info("Started websocket server on port", port);
                })
                .catch(function (err) {
                    logger.error(err, err.stack);
                });            
        }, 1000);
    };
}());
