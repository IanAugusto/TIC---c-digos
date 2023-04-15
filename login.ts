import { usuario } from "./Usuario";

export class login
{
    private nome : string;
    private senha : string;

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

    private usuarios : Usuario[];
    private movimentacoesCadastradas : MovimentaEstoque[];    
    private fornecedoresCadastrados : Fornecedor[];
    private produtosCadastrados : Produto[];
    private tipoProdutoCadastrados : tipoProd[];
    private localEstoqueCadastrados : localEstoque[];

    Add_usuario(value : Usuario)
    {
        this.usuarios.push(value);
    }
    Add_movimentacoesCadastrada(value : MovimentaEstoque)
    {
        this.movimentacoesCadastradas.push(value);
    }
    Add_fornecedoresCadastrado(value : Fornecedor)
    {
        this.fornecedoresCadastrados.push(value);
    }
    Add_produtosCadastrado(value : Produto)
    {
        this.produtosCadastrados.push(value);
    }
    Add_tipoProdutoCadastrado(value : tipoProd)
    {
        this.tipoProdutoCadastrados.push(value);
    }
    Add_localEstoqueCadastrado(value : localEstoque)
    {
        this.localEstoqueCadastrados.push(value);
    }

    constructor(nome : string, senha : string)
    {
        this.Set_nome(nome);
        this.Set_senha(nome);
        this.usuarios = [];
        this.movimentacoesCadastradas = [];
        this.fornecedoresCadastrados = [];
        this.produtosCadastrados = [];
        this.tipoProdutoCadastrados = [];
        this.localEstoqueCadastrados = [];
    }

    login()
    {
        //Compara username e senha inseridos com valores no BD
    }
    logout()
    {
        //Efetua logout e faz com que o usuário precise fazer login novamente para utilizar o software
    }
}