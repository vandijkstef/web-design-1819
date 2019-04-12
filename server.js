const express = require('express');
const app = express();
const config = {
	port: 3333
}
app.use(express.static('drag-and-drop'));
app.listen(config.port, function() {
	console.log(`Application started on port: ${config.port}`);
});