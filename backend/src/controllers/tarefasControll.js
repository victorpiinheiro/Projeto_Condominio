const Tarefas = require('../models/tarefasModel');

exports.index = (req, res) => {
    res.render('tarefas');
}

exports.criaTarefa = async (req, res) => {
    try {
        const tarefas = new Tarefas(req.body);
        await tarefas.register();

        if (tarefas.errors.length > 0) {
            req.flash('errors', tarefas.errors);
            req.session.save(() => {
                res.redirect('back');
                return;
            })
            return;
        }
        req.session.save(() => {
            req.flash('sucess', 'Tarefa cadastrada com sucesso');
            res.redirect(`/tarefas/index/${tarefas.tarefas._id}`);
            return;
        })
    } catch (error) {
        console.log(error);
        res.render('404');
    }
}

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('404');
    const tarefas = new Tarefas(req.body);
    const user = await tarefas.editIndex(req.params.id);

    res.render('tarefas', {user});
}

