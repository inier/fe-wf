module.exports = function(options) {
    const chalk = require('chalk');
    const express = require('express');
    const { renderToString } = require('react-dom/server');

    const SSR = require('../static/ssr');
    const port = process.env.PORT || 8080;

    server(port);

    function server(port) {
        const app = express();
        app.use(express.static('static'));
        app.get('/', (req, res) => res.status(200).send(renderMarkup(renderToString(SSR))));

        // 端口被占用的处理
        const portFinder = require('portfinder');
        portFinder.basePort = process.env.PORT || port;
        portFinder.getPort((err, port) => {
            if (err) {
                reject(err);
            } else {
                // 在进程中存储下当前最新端口
                process.env.PORT = port;

                const empty = '    ';
                const common = `App running at:
              - Local: http://127.0.0.1:${port}\n`;
                console.log(chalk.cyan('\n' + empty + common));
                
                // 监听端口
                app.listen(port, () => process.send && process.send('online'));
            }
        });
    }

    function renderMarkup(html) {
        return `<!DOCTYPE html>
                <html>
                  <head>
                    <title>Webpack SSR Demo</title>
                    <meta charset="utf-8" />
                  </head>
                  <body>
                    <div id="root">${html}</div>
                    <script src="./ssr.js"></script>
                  </body>
                </html>`;
    }
};
