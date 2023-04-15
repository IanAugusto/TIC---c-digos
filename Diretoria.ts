import { grupo } from "./Grupo";
import { usuario } from "./Usuario";

export class diretoria extends grupo
{
    private senha

    private usuarios : usuario[];

    Add_usuarios(value : usuario)
    {
        this.usuarios.push(value);
    }

    constructor(id : number, usuario : usuario, nome? : string, nivel? : number, funcao? : string)
    {
        super(id, nome, nivel);
        this.usuarios = [];
        this.Add_usuarios(usuario);
    }
}