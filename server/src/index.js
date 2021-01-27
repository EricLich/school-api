const app = require('./app');
const db = require('./db');

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));