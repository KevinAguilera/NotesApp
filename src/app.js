const app = require('./codigoserver');
require('./database.mongoose');


app.listen(3000, function() {
    console.log('App en http://localhost:3000');
});
