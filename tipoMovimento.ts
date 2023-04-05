import { usuario } from "./usuário";
import { Permissao } from "./permissões";
export class tipoMovimento  extends usuario{
    desMov: string

    constructor(desMov: string, nome: string, cpf: string, senha: string, id_usuario: string, logado: boolean, permissao: Permissao){
        super(nome, cpf, senha, id_usuario, logado, permissao)
        this.setDesMov(desMov);
    }
    setDesMov(desMov: string){
        this.desMov = desMov
    }
    getDesMov(): string{
        return this.desMov
    }
    entrada(){

    }
    saida(){

    }
}