const Ficha = require('../models/FichaModel');
const PDFDocument = require('pdfkit');

exports.get = async (req, res) => {
    try {
        const ficha = await Ficha.findById(req.params.id);
        if (!ficha) return res.redirect('/error');
        
        res.render('ficha/ficha', { 
            ficha, 
            pageTitle: ` | Ficha de ${ficha.nome}`,
            script: "ficha.js",
            user: req.session.user,
        });
    } catch (e) {
        console.error(e);
        return res.redirect('/error');
    }
}

exports.getNew = (req, res) => {
    res.render('ficha/new', {
        pageTitle: ' | Nova Ficha',
        user: req.session.user,
        script: 'newFicha.js',
    });
}

exports.register = async (req, res) => {
    try {
        const ficha = new Ficha(req.body);
        await ficha.register();

        if (ficha.errors.length > 0) {
            req.session.errors = ficha.errors;
            req.session.save(() => res.redirect("/dashboard"));
            return;
        }

        req.session.errors = [];
        req.session.save(() => res.redirect("/dashboard"));
    } catch (e) {
        console.error(e);
        return res.redirect('/error');
    }
}

exports.delete = async (req, res) => {
    if (!req.params.id) return res.redirect('/error');

    const ficha = await Ficha.delete(req.params.id);
    if (!ficha) return res.render('/error');

    req.session.save(() => res.redirect('/dashboard'));
    return;
}

exports.update = async (req, res) => {
    try {
        if (!req.params.id) return res.redirect('/error');
        const ficha = new Ficha(req.body);
        await ficha.update(req.params.id);

        if (ficha.errors.length > 0) {
            req.session.errors = ficha.errors;
            req.session.save(() => res.redirect("/dashboard"));
            return;
        }

        req.session.save(() => res.redirect(`/ficha/${req.params.id}`));
        return;
    } catch (e) {
        console.log(e);
        res.redirect('/error');
    }
}

exports.downloadPDF = async (req, res) => {
    try {
        const ficha = await Ficha.findById(req.params.id);
        if (!ficha) return res.redirect('/error');

        const doc = new PDFDocument({ margin: 50 });

        const filename = `Ficha_${ficha.nome.replace(/\s+/g, '_')}.pdf`;

        res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');

        doc.pipe(res);

        // Header
        doc.fontSize(20).text(`Ficha de ${ficha.nome}`, { align: 'center' });
        doc.moveDown(2);

        // Body
        doc.fontSize(12);
        
        doc.font('Helvetica-Bold').text('Paciente: ', { continued: true })
           .font('Helvetica').text(ficha.nome);
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Data de Nascimento: ', { continued: true })
           .font('Helvetica').text(new Date(ficha.data_nascimento).toISOString().split('T')[0]);
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Profissão: ', { continued: true })
           .font('Helvetica').text(ficha.profissao || 'Não informado');
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Telefone: ', { continued: true })
           .font('Helvetica').text(ficha.telefone || 'Não informado');
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Peso: ', { continued: true })
           .font('Helvetica').text(ficha.peso || 'Não informado');
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Altura: ', { continued: true })
           .font('Helvetica').text(ficha.altura || 'Não informado');
        doc.moveDown(1);

        doc.font('Helvetica-Bold').text('Cor de Pele: ', { continued: true })
           .font('Helvetica').text(ficha.pele || 'Não informado');
        doc.moveDown(0.5);

        doc.font('Helvetica-Bold').text('Medida: ', { continued: true })
           .font('Helvetica').text(ficha.medida || 'Não informado');
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