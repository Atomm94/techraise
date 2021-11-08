import env from 'dotenv';
import mongoose from 'mongoose';
env.config();

mongoose.connect('mongodb://localhost:27017/techraise', {
    useFindAndModify: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(_ => console.log('Database connect successfully!'))
    .catch(err => console.log(`Database connect error: ${err}`))
