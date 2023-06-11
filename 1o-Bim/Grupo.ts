export class grupo
{
    protected id : number;
    protected nome : string;
    protected nivelPersmissão : number;
    
    Get_id() : number
    {
        return this.id;
    }
    private Set_id(value : number)
    {
        this.id = value;
    }
    Get_nome() : string
    {
        return this.nome;
    }
    Set_nome(value : string)
    {
        this.nome = value;
    }
    Get_nivel() : number
    {
        return this.nivelPersmissão;
    }
    Set_nivel(value : number)
    {
        this.nivelPersmissão = value;
    }

    constructor(id : number, nome? : string, nivel? : number)
    {
        this.Set_id(id);
        this.Set_nome(nome || 'noname');
        this.Set_nivel(nivel || 0);
    }

    CadastraGrupo()
    {
        // Insere um novo grupo ao banco de dados
    }
    ExcluiGrupo()
    {
        //Exclui um grupo do banco de dados
    }
    Consulta()
    {
        return `ID: ${this.Get_id}; Nome: ${this.Get_nome}; Nível de permissão: ${this.Get_nivel};`;
    }
}