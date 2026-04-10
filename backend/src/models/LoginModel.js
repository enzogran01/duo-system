const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
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
            this.errors.push("Usuário não existe.");
            return;
        };

        if (!(this.body.password === this.user.password)) {
            this.errors.push("Senha inválida");
            this.user = null;
            return;
        };
    };

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
            email: this.body.email,
            password: this.body.password, 
        };
    }
}

module.exports = Login;
