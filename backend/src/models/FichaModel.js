const mongoose = require("mongoose");

const FichaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    data_nascimento: { type: Date },
    profissao: { type: String },
    telefone: { type: String, required: true },
    peso: { type: Number },
    altura: { type: Number },
    medida: { type: Number },
    pele: { type: String }
});

const FichaModel = new mongoose.model('Ficha', FichaSchema);

class Ficha {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.ficha = null;
    }

    async register() {
        this.valida();
        if (this.errors.length > 0) return;
        this.ficha = await FichaModel.create(this.body);
    }

    valida() {
        this.cleanUp();
        if (!this.body.nome.length === 0) this.errors.push("O nome é de preenchimento obrigatório.");
        if (!this.body.telefone.length === 0) this.errors.push("O telefone é de preenchimento obrigatório.");
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== "string") {
                this.body[key] = "";
            };
        };

        this.body = {
            nome: this.body.nome,
            data_nascimento: this.body.nascimento,
            profissao: this.body.profissao,
            telefone: this.body.telefone,
            peso: this.body.peso,
            altura: this.body.altura,
            medida: this.body.medida,
            pele: this.body.pele
        }
    }
}
