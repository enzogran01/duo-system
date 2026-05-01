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

    static async delete(id) {
        if (typeof id !== "string") return;
        return await FichaModel.findOneAndDelete({ _id: id });
    }

    valida() {
        this.cleanUp();
        if (!this.body.nome) this.errors.push("Nome é obrigatório.");
        if (!this.body.telefone) this.errors.push("Telefone é obrigatório.");
    }

    cleanUp() {
        this.body = {
            nome: this.body.nome || "",
            data_nascimento: this.body.data_nascimento || null,
            profissao: this.body.profissao || "",
            telefone: this.body.telefone || "",
            peso: this.body.peso || null,
            altura: this.body.altura || null,
            medida: this.body.medida || null,
            pele: this.body.pele || ""
        };
    }
}

module.exports = Ficha;
