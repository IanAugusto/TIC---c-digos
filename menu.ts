import { login } from "./login";
import { Permissao } from "./permissões";

export class menu extends login {
    private nivelAcesso: number
    
    constructor(nome: string, id_usuario: string, cpf: string, senha: string, logado: boolean, nivelAcesso: number, permissao: Permissao){
        super(nome, cpf, senha, id_usuario, logado, permissao)
        this.setNivelAcesso(nivelAcesso)
    }
    setNivelAcesso(nivelAcesso: number){
        this.nivelAcesso = nivelAcesso
    }
    getNivelAcesso(): number{
        return this.nivelAcesso
    }
    cadastraUsuario(nome: string, cpf: string, senha: string, id_usuario: string, nivelAcesso: number){
        const novoUsuario = new login(nome, cpf, senha, id_usuario, true, permissao)
        console.log(`Novo usuário ${novoUsuario.getNome()} cadastrado.`);
    }
    excluiUsuario(){

    }
    consultaUsuario(){

    }
}