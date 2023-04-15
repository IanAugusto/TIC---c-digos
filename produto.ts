import { tipoProd } from "./tipoProduto"

 export class Produto {
    private idProd: number
    private descricao: string
    private UN: string
    private marca: string
    private tipoProd: tipoProd
    constructor(idProd: number, descricaoProd: string, UN: string, marca: string, tipoProd: tipoProd){
    this.setIdProd(idProd); this.setDesProd(descricaoProd); this.setUN(UN); this.setMarca(marca); this.setTipoProd(tipoProd)
    }
    setIdProd(idProd: number){
        this.idProd = idProd
    }
    getIdProd(): number{
        return this.idProd
    }
    setDesProd(descricao: string){
        this.descricao = descricao
    }
    getDesProd(): string{
        return this.descricao
    }
    setUN(UN: string){
        this.UN = UN
    }
    getUN(): string{
        return this.UN
    }
    setMarca(marca: string){
        this.marca = marca
    }
    getMarca(): string{
        return this.marca
    }
    setTipoProd(tipo: tipoProd){
        this.tipoProd = tipo
    }
    getTipoProd(): tipoProd{
        return this.tipoProd
    }
    cadastraProd(idProd: number, descricaoProd: string, UN: string, marca: string, idTipo: number){
        const NovoProd = new Produto(idProd, descricaoProd, UN, marca, idTipo)
        console.log(`Novo produto cadastrado ${NovoProd.getDesProd()}`)
        //Integração com o banco de dados
    }
    consultaProd(){
        return `ID: ${this.getIdProd()} Descrição: ${this.getDesProd()} Unidade: ${this.getUN()} Marca: ${this.getMarca()} ID Tipo: ${this.getIdTipo()}`
        //Integração com o banco de dados
    }
    retiraProd(){
        //Integração com o banco de dados
    }
    excluiProd(){
        //Integração com o banco de dados
    }
    
 }