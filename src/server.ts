import http from "http";
import fs from "fs";
import path from "path";

/**
 * small app to render html and dependent files at a localhost port
 */
const server = http.createServer((req, res) => {
  try {
    const reqPath = req.url === "/" ? "/fibo-view.html" : req.url;
    const fullPath = path.resolve(__dirname, `../dist/ui${reqPath}`);
    const content = fs.readFileSync(fullPath);
    res.statusCode = 200;
    res.write(content);
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.write('The requested route is not found');
    res.end();
  }
});

server.listen(5578, () => {
  console.log("App ready for use as http://localhost:5578");
  require('child_process').exec('start http://localhost:5578/');
});
