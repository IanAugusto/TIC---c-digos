import { usuario } from "./usuário";
import { Permissao } from "./permissões";

export class menu extends usuario {
    
    constructor(nome: string, id_usuario: string, cpf: string, senha: string, logado: boolean, permissao: Permissao){
        super(nome, cpf, senha, id_usuario, logado, permissao)
    }

}