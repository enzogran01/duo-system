const mongoose = require('mongoose');
const data = new Date();

const AtendimentoSchema = new mongoose.Schema({
    paciente: { type: String, required: true },
    dataAtendimento: { type: Date, required: true, default: data },
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

    async register() {
        this.valida();
        if (this.errors.length > 0) return;
        this.atendimento = await AtendimentoModel.create(this.body);
    }

    valida() {
        this.cleanUp();
        if (this.body.paciente.length === 0) this.errors.push("O campo PACIENTE não pode estar vazio.");
        if (this.body.dataAtendimento.length === 0) this.errors.push("O campo DATA DE ATENDIMENTO não pode estar vazio.");
        if (this.body.profissional.length === 0) this.errors.push("O campo PROFISSIONAL não pode estar vazio.");
        if (this.body.servico.length === 0) this.errors.push("O campo SERVIÇO não pode estar vazio.");
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== "string") {
                this.body[key] = "";
            };
        };

        this.body = {
            paciente: this.body.paciente,
            dataAtendimento: this.body.dataAtendimento,
            profissional: this.body.profissional,
            servico: this.body.servico,
            observacao: this.body.observacao
        };
    };
};

module.exports = Atendimento;
