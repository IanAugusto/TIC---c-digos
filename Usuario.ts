export class usuario
{
    private id : number;
    private nome : string;
    private senha : string;

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
    Get_senha() : string 
    {
        return this.senha;
    }
    Set_senha(value : string) 
    {
        this.senha = value;
    }

    private movimentacoes : MovimentaEstoque[];

    Add_movimentacoes(value : MovimentaEstoque)
    {
        this.movimentacoes.push(value);
    }

    constructor(id : number, nome? : string, senha? : string)
    {
        this.Set_id(id);
        this.Set_nome(nome || "noname");
        this.Set_senha(senha || "noname");
    }

    CadastraUsuario()
    {
        //Insere novo usuario no banco de dados
    }
}