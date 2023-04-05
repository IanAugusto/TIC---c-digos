import { Permissao } from "./permissões"

export class usuario{
    protected nome: string
    protected cpf: string
    protected senha: string
    protected id_usuario: string
    protected logado: boolean
    protected permissao: Permissao; // associação com a classe Permissao

    constructor(nome: string, cpf: string, senha: string, id_usuario: string, logado: boolean, permissao: Permissao){
        this.setCpf(cpf); this.setNome(nome); this.setSenha(senha); this.setIdUsuario(id_usuario); this.logado = false

    }
    setNome(nome: string){
        this.nome = nome
    }
    setCpf(cpf: string){
        this.cpf = cpf
    }
    setSenha(senha: string){
        this.senha = senha
    }
    setIdUsuario(id_usuario: string){
        this.id_usuario = id_usuario
    }
    getNome(): string{
        return this.nome
    }
    getCpf(): string{
        return this.cpf
    }
    getSenha(): string{
        return this.senha
    }
    getIdUsuario(): string{
        return this.id_usuario
    }
    cadastraUsuario(nome: string, cpf: string, senha: string, id_usuario: string, nivelAcesso: number){
        const permissao = new Permissao(1, "descricaoPermis1");
        const novoUsuario = new usuario(nome, cpf, senha, id_usuario, true, permissao)
        console.log(`Novo usuário ${novoUsuario.getNome()} cadastrado.`);
    }
    consultaUsuario(){

    }
}