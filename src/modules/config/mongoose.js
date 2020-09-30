import mongoose            from 'mongoose';
import User                from '../../models/User'

mongoose.connect(databaseUri,{useNewUrlParser:true , useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;


global._mongoose = mongoose;

var _User = new User()
global._UserModel = _User.model();