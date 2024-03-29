const mongoose = require('mongoose');

const tarefaSchema = mongoose.Schema({
    titulo: {type: String, required: false},
    descricao: {type: String, required: false},
    validade: {type: String, required: false},
    status: {type: String, required: false},
    criadoEm: {type: Date, default: Date.now}
    
});

const tarefaModel = mongoose.model('Tarefa', tarefaSchema);

class Tarefas {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.tarefas = null;
    }

    async register() {
        this.valida();
        if (this.errors.length > 0) {
            return;
        }
        this.tarefas = await tarefaModel.create(this.body);
    }

    valida(){
        this.cleanUp();
        if (this.body.titulo === '' || this.body.descricao === '' || this.body.validade === '' || this.body.status === '') {
            this.errors.push('todos os campos precisam ser preenchidos');
        } 
    }

    cleanUp () {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }

        this.body = {
            titulo: this.body.titulo,
            descricao: this.body.descricao,
            validade: this.body.validade,
            status: this.body.status
        }
    }

   async editIndex (id) {
    const user = await tarefaModel.findById(id);
    return user;
   }

    }

module.exports = Tarefas;