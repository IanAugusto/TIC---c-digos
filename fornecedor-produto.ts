import { Fornecedor } from "./fornecedor";
import { Produto } from "./produto";

export class FornecedorProduto
{
    private id : number;
    Get_id() : number {return this.id}
    Set_id(value : number){this.id = value}
    private idProd : number;
    Get_idProd() : number {return this.idProd}
    Set_idProd(value : number){this.idProd = value}
    private idForn : number;
    Get_idForn() : number {return this.idForn}
    Set_idForn(value : number){this.idForn = value}

    constructor(id : number, idProd : number, idForn : number)
    {
        this.Set_id(id);
        this.Set_idProd(idProd);
        this.Set_idForn(idForn);
    }

    ConsultaFornecedor() : Fornecedor
    {
        let forn : Fornecedor;
        //Criar foreach que vai por todos os fornecedores e returna qual possui o ID informado
        return forn;
    }
    ConsultaProduto() : Produto
    {
        let prod : Produto;
        //Criar foreach que vai por todos os produtos e retorna o que possui o ID informado
        return prod;
    }
}