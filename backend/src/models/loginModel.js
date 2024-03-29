
const mongoose = require('mongoose');
const validator = require('validator');
const byscriptjs = require('bcryptjs')

const LoginSchema = mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);


class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

   

    async register() {
        await this.userExists();
        if (this.errors.length > 0) return;

        this.valida();
        if (this.errors.length > 0) return;
        
        
        const salt = byscriptjs.genSaltSync();
        this.body.senha = byscriptjs.hashSync(this.body.senha, salt);

        this.user = await LoginModel.create(this.body);
    }

    valida() {
        this.cleanUp();

        // senha deverá ter entre 6 e 20 caracteres
        if (this.body.senha.length < 6 || this.body.senha.length > 20) {
            this.errors.push('A senha deve ter entre 6 e 20 caracteres');
        }

    }

    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if (this.user) this.errors.push('Este email ja possui cadastro');
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            email: this.body.email,
            senha: this.body.senha
        }
    }

    async login(){
       
        


        this.user = await LoginModel.findOne({ email: this.body.email});

        if (!this.user) {
            this.errors.push('usuario nao existe');
            return;
        } 

        if (!byscriptjs.compareSync(this.body.senha, this.user.senha)) {
            this.errors.push('Senha invalida');
            this.user = null;
            return;
        }

    }

    

   
}

module.exports = Login;
