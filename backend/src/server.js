const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = require('./app');

const PORT = process.env.PORT;

app.on('pronto', () => {
    app.listen(PORT, () => {
        console.log("http://localhost:3000");
        console.log("Servidor executando na porta 3000.");
    });
});