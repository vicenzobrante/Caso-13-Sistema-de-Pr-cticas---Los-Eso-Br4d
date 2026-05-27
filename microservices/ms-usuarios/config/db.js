const mongoose = require('mongoose');

const connectDB = async () => {

    try {

        await mongoose.connect(
            process.env.MONGO_URI_USUARIOS
        );

        console.log(
            '[ms-usuarios] MongoDB conectado'
        );

    } catch (error) {

        console.error(error.message);

        process.exit(1);
    }
};

module.exports = connectDB;