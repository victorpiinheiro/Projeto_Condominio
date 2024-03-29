const Login = require('../models/loginModel');

// cadastrar

exports.index = (req, res) => {
    res.render('cadastrar');
}

exports.register = async  (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function(){
                return res.redirect('back');
            }) 
            return;
        }

        req.flash('sucess', 'usuario cadastrado com sucesso');
        req.session.save(function() {
           return res.redirect('back');
        });
    } catch (error) {
        console.log(error);
        res.render('404');
    }
}

// ===============================================================

// login

exports.loginIndex = (req, res) => {
    res.render('login');
}

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function(){
                return res.redirect('back');
            }) 
            return;
        }

        req.flash('sucess', 'Voce entrou no sistema');
        req.session.user = login.user;
        req.session.save(function() {
            return res.redirect('back');
        }); 
    } catch (error) {
        console.log(error);
        res.send(` algo deu errado ${error}`);
    }
}

exports.logout = (req, res) => {

    req.session.destroy(function(){
        res.redirect('index');
    })

}