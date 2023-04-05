import { usuario } from "./usuário";
import { Permissao } from "./permissões";
export class login extends usuario{
    constructor(nome: string, cpf: string, senha: string, id_usuario: string, logado: boolean, permissao: Permissao){
        super(nome, cpf, senha, id_usuario, logado, permissao)
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