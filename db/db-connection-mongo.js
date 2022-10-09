const mongoose = require("mongoose");

const getConnection = async () => {
    try {
        const url = "mongodb://user_bd:1IT4n88cqF81QGYH@ac-qbtir1l-shard-00-00.yffhafa.mongodb.net:27017,ac-qbtir1l-shard-00-01.yffhafa.mongodb.net:27017,ac-qbtir1l-shard-00-02.yffhafa.mongodb.net:27017/inventario-youtube?ssl=true&replicaSet=atlas-ych3el-shard-0&authSource=admin&retryWrites=true&w=majority";

        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("conexion exitosa");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getConnection,
};
