const mongoose = require('mongoose');

const AtendimentoSchema = new mongoose.Schema({
    paciente: { type: String, required: true },
    dataAtendimento: { type: Date, required: true },
    profissional: { type: String, required: true },
    servico: { type: String, required: true },
    observacao: { type: String, required: false }
});

const AtendimentoModel = mongoose.model('atendimento', AtendimentoSchema);

class Atendimento {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.atendimento = null;
    }

    static async getAll(sortBy) {
        return await AtendimentoModel.find().sort({ dataAtendimento: -1 });
    }

    async register() {
        this.valida();
        if (this.errors.length > 0) return;
        this.atendimento = await AtendimentoModel.create(this.body);
    }

    static async deleteById(id) {
        return await AtendimentoModel.findByIdAndDelete(id);
    }

    valida() {
        this.cleanUp();
        if (this.body.paciente.length === 0) this.errors.push("O campo PACIENTE não pode estar vazio.");
        if (this.body.profissional.length === 0) this.errors.push("O campo PROFISSIONAL não pode estar vazio.");
        if (this.body.servico.length === 0) this.errors.push("O campo SERVIÇO não pode estar vazio.");
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== "string") {
                this.body[key] = "";
            }
        }

        this.body = {
            paciente: this.body.paciente,
            dataAtendimento: new Date(),
            profissional: this.body.profissional,
            servico: this.body.servico,
            observacao: this.body.observacao
        };
    }
};

module.exports = Atendimento;
