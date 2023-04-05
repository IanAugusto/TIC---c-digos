import { login } from "./usuário";
import { Permissao } from "./permissões";

export class menu extends login {
    
    constructor(nome: string, id_usuario: string, cpf: string, senha: string, logado: boolean, permissao: Permissao){
        super(nome, cpf, senha, id_usuario, logado, permissao)
    }
    cadastraUsuario(nome: string, cpf: string, senha: string, id_usuario: string, nivelAcesso: number){
        const permissao = new Permissao(1, "descricaoPermis1");
        const novoUsuario = new login(nome, cpf, senha, id_usuario, true, permissao)
        console.log(`Novo usuário ${novoUsuario.getNome()} cadastrado.`);
    }
    consultaUsuario(){

    }

}