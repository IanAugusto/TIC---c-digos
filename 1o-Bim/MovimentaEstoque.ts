import { tipoMovimento } from "./tipoMovimento"
import { usuario } from "./Usuario"
import { localEstoque } from "./localEstoque"
import { Produto } from "./produto"
import { Fornecedor } from "./fornecedor"

export class movimentaEstoque{
    private data: Date//data da movimentação
    private Usuario: usuario
    private quantidade: number
    private id: number
    private data_validade: Date
    private tipoMovimento: tipoMovimento
    private localEstoque: localEstoque
    private Produto: Produto
    private Fornecedor: Fornecedor

    constructor(data: Date, Usuario: usuario, quantidade: number, data_validade: Date, id: number, tipoMovimento: tipoMovimento, localEstoque: localEstoque, produto: Produto, fornecedor:Fornecedor){
        this.setData(data)
        this.setDataValidade(data_validade)
        this.setFornecedor(fornecedor)
        this.setId(id)
        this.setLocalEstoque(localEstoque)
        this.setProduto(produto)
        this.setQtde(quantidade)
        this.setTipoMov(tipoMovimento)
        this.setUsuario(Usuario)
    }

    setData(data: Date){
        this.data = data
    }
    getData():Date{
        return this.data
    }
    setUsuario(usuario: usuario){
        this.Usuario = usuario
    }
    getUsusario():usuario{
        return this.Usuario
    }
    setId(id: number){
        this.id = id
    }
    getId():number{
        return this.id
    }
    setQtde(qtde: number){
        this.quantidade = qtde
    }
    getQtde():number{
        return this.quantidade
    }
    setDataValidade(data: Date){
        this.data_validade = data
    }
    getDataValidade():Date{
        return this.data_validade
    }
    setTipoMov(value: tipoMovimento){
        this.tipoMovimento = value
    }
    getTipoMov():tipoMovimento{
        return this.tipoMovimento
    }
    setLocalEstoque(value: localEstoque){
        this.localEstoque = value
    }
    getLocalEstoque():localEstoque{
        return this.localEstoque
    }
    setProduto(value: Produto){
        this.Produto = value
    }
    getProduto():Produto{
        return this.Produto
    }
    setFornecedor(value: Fornecedor){
        this.Fornecedor = value
    }
    getFornecedor():Fornecedor{
        return this.Fornecedor
    }
    insereMovimentacao(){
        if(this.tipoMovimento.getTipo() == "entrada"){
            //Integração com o banco de dados
        }else if(this.tipoMovimento.getTipo() == "saida"){
            //Integração com o banco de dados
        }
    }


}