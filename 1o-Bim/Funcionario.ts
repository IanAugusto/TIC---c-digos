import { grupo } from "./Grupo";
import { usuario } from "./Usuario";

export class funcionario extends grupo
{
    private funcao : string;

    Get_funcao() : string
    {
        return this.funcao;
    }
    Set_funcao(value : string)
    {
        this.funcao = value;
    }

    private usuarios : usuario[];

    Add_usuarios(value : usuario)
    {
        this.usuarios.push(value);
    }

    constructor(id : number, usuario : usuario, nome? : string, nivel? : number, funcao? : string)
    {
        super(id, nome, nivel);
        this.Set_funcao(funcao || 'noname');
        this.Add_usuarios(usuario);
    }

    Consulta()
    {
        return `${super.Consulta()} Função: ${this.Get_funcao}`;
    }
}