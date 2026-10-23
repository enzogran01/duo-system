const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '/.env') });

const app = require('./app');

const PORT = process.env.PORT || 3000;

// Only auto-start when running directly (not when required by Electron)
if (require.main === module) {
    app.on('pronto', () => {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`http://localhost:${PORT}`);
            console.log("Servidor executando na porta " + PORT);
        });
    });
}

module.exports = { app, PORT };