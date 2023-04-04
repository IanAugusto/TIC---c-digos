import { Permissao } from "./permissões"

export class login{
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

    login(senhaDigitada: string): boolean{
        if (senhaDigitada == this.getSenha()){
            console.log(`login bem sucedico usuário ${this.getNome()}`)
            return true;
        } else{
            console.log(`senha incorreta, tente novamente ${this.getNome()}`)
            return false;
        }

    }
    logout(): void{
        console.log(`logout usuário ${this.getNome()}.`)
        this.logado = false;

    }
}