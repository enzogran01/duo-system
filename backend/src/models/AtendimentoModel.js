const mongoose = require("mongoose");

const AtendimentoSchema = new mongoose.Schema({
    ficha: { type: mongoose.Schema.Types.ObjectId, ref: "Ficha", required: true },
    data_atendimento: { type: Date, required: true },
    servico: { type: String, required: true },
    queixa: { type: String, required: false },
    rotina_diaria: { type: String, required: false },
    prescricao: { type: String, required: false },
    profissional: { type: String, required: true },
    horario: { type: String, required: true }
});

const AtendimentoModel = mongoose.model('Atendimento', AtendimentoSchema);

class Atendimento {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.atendimento = null;
    }

    static async getAll() {
        return await AtendimentoModel.find().sort({ _id: -1 }).populate("ficha");
    }

    static async findById(id) {
        if (typeof id !== "string") return null;
        try {
            return await AtendimentoModel.findById(id).populate("ficha");
        } catch (e) {
            return null;
        }
    }

    static async findByFicha(fichaId) {
        if (typeof fichaId !== "string") return [];
       return await AtendimentoModel.find({ ficha: fichaId }).sort({ data_atendimento: -1 });
    }

    static async delete(id) {
        if (typeof id !== "string") return;
        return await AtendimentoModel.findOneAndDelete({ _id: id });
    }

    async register() {
        this.valida();
        if (this.errors.length > 0) return;
        this.atendimento = await AtendimentoModel.create(this.body);
    }

    async update(id) {
        if (typeof id !== 'string') return;
        this.valida();
        if (this.errors.length > 0) return;
        this.atendimento = await AtendimentoModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    valida() {
        this.cleanUp();
        if (!this.body.ficha) this.errors.push("Ficha é obrigatória.");
        if (!this.body.data_atendimento) this.errors.push("Data do atendimento é obrigatória.");
        if (!this.body.servico) this.errors.push("Serviço é obrigatório.");
        if (!this.body.profissional) this.errors.push("Profissional é obrigatório.");
        if (!this.body.horario) this.errors.push("Horário é obrigatório.");
    }

    cleanUp() {
        this.body = {
            ficha: this.body.ficha || null,
            data_atendimento: this.body.data_atendimento || null,
            servico: this.body.servico,
            queixa: this.body.queixa,
            rotina_diaria: this.body.rotina_diaria,
            prescricao: this.body.prescricao,
            profissional: this.body.profissional,
            horario: this.body.horario
        };
    }
}

module.exports = Atendimento;
