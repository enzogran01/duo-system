const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '/.env') });

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.on('pronto', () => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
        console.log("Servidor executando na porta " + PORT);
    });
});