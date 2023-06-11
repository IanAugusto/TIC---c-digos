import { Fornecedor } from "./fornecedor";
import { Produto } from "./produto";

export class FornecedorProduto
{
    private id : number;
    Get_id() : number {
        return this.id
    }
    Set_id(value : number){
        this.id = value
    }
    private Produto : Produto;
    Get_Produto() : Produto {
        return this.Produto
    }
    Set_Produto(value : Produto){
        this.Produto = value
    }
    private Fornecedor: Fornecedor;
    Get_Fornecedor() : Fornecedor {
        return this.Fornecedor
    }
    Set_Fornecedor(value : Fornecedor){
        this.Fornecedor = value
    }
    private descricao: string
    Get_Descricao():string{
        return this.descricao
    }
    Set_Desricao(value: string){
        this.descricao = value
    }

    constructor(id : number, Produto : Produto, Fornecedor : Fornecedor)
    {
        this.Set_id(id);
        this.Set_Produto(Produto);
        this.Set_Fornecedor(Fornecedor);
    }

    ConsultaFornecedor() : Fornecedor
    {
        return this.Get_Fornecedor()
    }
    ConsultaProduto() : Produto
    {
        return this.Get_Produto()
    }
    gravaOrcamento(){
        //Integração com o banco de dados
    }
}