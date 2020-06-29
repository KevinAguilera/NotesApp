const { Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

// (unique:true para que identifique que los correos son únicos)
const UserSchema = new Schema({
  name: { type: String, required:true},
  email: { type: String, required:true, unique: true},
  password: { type: String, required:true},
});

UserSchema.methods.encriptarcontraseña = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchearcontraseña = async function(password)  {
  return await bcrypt.compare(password, this.password);
}

module.exports = model('User', UserSchema);
