const mongoose = require('mongoose');
const MONGODB_URL = 'mongodb+srv://Keva:keeper24@cluster0-u8yfz.gcp.mongodb.net/<dbname>?retryWrites=true/notes-app'
// usuario mongo: aguila_kevin1@hotmail.com, pass: keeper24

mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(function() {
    console.log('Conectado a la base de datos');
})
 .catch(err => console.log(err));
