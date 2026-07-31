const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');

const LoginSchema = new mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: false }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.valida();
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.errors.push("Usuário não encontrado.");
            return;
        };

        const hashBase64 = Buffer.from(this.body.password + this.user.salt).toString('base64');

        if (hashBase64 !== this.user.password) {
            this.errors.push("Senha inválida.");
            this.user = null;
            return;
        };
    };

    async register() {
        this.valida();
        if(this.errors.length > 0) return;

        await this.userExists();
        if(this.errors.length > 0) return;

        const salt = crypto.randomBytes(12).toString('base64');
        this.body.salt = salt;
        this.body.password = Buffer.from(this.body.password + salt).toString('base64');

        this.user = await LoginModel.create(this.body);
    }

    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if(this.user) this.errors.push('Usuário já existe.');
    }

    valida() {
        this.cleanUp();
        if(!validator.isEmail(this.body.email)) this.errors.push("E-mail inválido");
        // A password precisa ter entre 3 e 50 caracteres
        if(this.body.password.length < 8) this.errors.push("A senha precisa ter pelo menos 8 caracteres");
    };

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== "string") {
                this.body[key] = "";
            };
        };

        this.body = {
            name: this.body.name || "",
            email: this.body.email,
            password: this.body.password,
            salt: this.body.salt || ""
        };
    }
}

module.exports = Login;
