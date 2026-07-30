const Atendimento = require('../models/AtendimentoModel');
const Ficha = require('../models/FichaModel');
const PDFDocument = require('pdfkit');

module.exports.get = async (req, res) => {
    try {
        const atendimento = await Atendimento.findById(req.params.id);
        if (!atendimento || !atendimento.ficha) return res.redirect('/error');

        res.render('atendimento/atendimento', {
            atendimento,
            ficha: atendimento.ficha,
            pageTitle: ` | Atendimento de ${atendimento.ficha.nome}`,
            script: "atendimento.js",
            user: req.session.user,
        });
    } catch (e) {
        console.error(e);
        return res.redirect('/error');
    }
}

module.exports.delete = async (req, res) => {
    if (!req.params.id) return res.redirect('/error');

    const atendimento = await Atendimento.delete(req.params.id);
    if (!atendimento) return res.render('/error');

    req.session.save(() => res.redirect('/dashboard'));
    return;
}

module.exports.getNew = async (req, res) => {
    try {
        const fichas = await Ficha.getAll();
        res.render('atendimento/new', {
            pageTitle: ' | Novo Atendimento',
            user: req.session.user,
            script: 'newAtendimento.js',
            fichas
        });
    } catch(e) {
        console.error(e);
        res.redirect('/error');
    }
}

module.exports.register = async (req, res) => {
    try {
        const atendimento = new Atendimento(req.body);
        await atendimento.register();

        if (atendimento.errors.length > 0) {
            req.session.errors = atendimento.errors;
            req.session.save(() => res.redirect("/dashboard"));
            return;
        }

        req.session.errors = [];
        req.session.save(() => res.redirect("/dashboard"));
        return;
    } catch (e) {
        console.error(e);
        return res.redirect('/error');
    }
}

module.exports.update = async (req, res) => {
    try {
        if (!req.params.id) return res.redirect('/error');
        const atendimento = new Atendimento(req.body);
        await atendimento.update(req.params.id);

        if (atendimento.errors.length > 0) {
            req.session.errors = atendimento.errors;
            req.session.save(() => res.redirect(`/atendimento/${req.params.id}`));
            return;
        }

        req.session.save(() => res.redirect(`/atendimento/${req.params.id}`));
        return;
    } catch (e) {
        console.log(e);
        res.redirect('/error');
    }
}

module.exports.downloadPDF = async (req, res) => {
    try {
        const atendimento = await Atendimento.findById(req.params.id);
        if (!atendimento || !atendimento.ficha) return res.redirect('/error');

        const doc = new PDFDocument({ margin: 50 });

        const filename = `Atendimento_${atendimento.ficha.nome.replace(/\s+/g, '_')}_${new Date(atendimento.data_atendimento).toISOString().split('T')[0]}.pdf`;

        res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');

        doc.pipe(res);

        // Header
        doc.fontSize(20).text('Relatório de Atendimento', { align: 'center' });
        doc.moveDown(2);

        // Body
        doc.fontSize(12);
        
        doc.font('Helvetica-Bold').text('Paciente: ', { continued: true })
           .font('Helvetica').text(atendimento.ficha.nome);
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Data do Atendimento: ', { continued: true })
           .font('Helvetica').text(new Date(atendimento.data_atendimento).toISOString().split('T')[0]);
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Horário: ', { continued: true })
           .font('Helvetica').text(atendimento.horario || 'Não informado');
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Profissional Responsável: ', { continued: true })
           .font('Helvetica').text(atendimento.profissional || 'Não informado');
        doc.moveDown(1.5);

        doc.font('Helvetica-Bold').text('Serviço: ', { continued: true })
           .font('Helvetica').text(atendimento.servico);
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Queixa:');
        doc.font('Helvetica').text(atendimento.queixa, { align: 'justify' });
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Rotina Diária:');
        doc.font('Helvetica').text(atendimento.rotina_diaria, { align: 'justify' });
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Prescrição:');
        doc.font('Helvetica').text(atendimento.prescricao, { align: 'justify' });
        doc.moveDown(0.5);

        doc.text('Gerado pelo sistema DuoSystem', 20, doc.page.height - 50, {
            align: 'center',
            lineBreak: false
        });

        doc.end();

    } catch (e) {
        console.error(e);
        return res.redirect('/error');
    }
}