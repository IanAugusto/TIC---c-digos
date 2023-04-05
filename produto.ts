 export class Produto {
    private idProd: number
    private descricaoProd: string
    private UN: string
    private marca: string
    private data: Date
    constructor(idProd: number, descricaoProd: string, UN: string, marca: string, data: Date){
    this.setIdProd(idProd); this.setDesProd(descricaoProd); this.setUN(UN); this.setMarca(marca); this.setData(data)
    }
    setIdProd(idProd: number){
        this.idProd = idProd
    }
    getIdProd(): number{
        return this.idProd
    }
    setDesProd(descricaoProd: string){
        this.descricaoProd = descricaoProd
    }
    getDesProd(): string{
        return this.descricaoProd
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
    setData(data: Date){
        this.data = data
    }
    getData(): Date{
        return this.data
    }
    cadastraProd(idProd: number, descricaoProd: string, UN: string, marca: string, data: Date){
        const NovoProd = new Produto(idProd, descricaoProd, UN, marca, data)
        console.log(`Novo produto cadastrado ${NovoProd.getDesProd()}`)
    }
    consultaProd(){

    }
    retiraProd(){

    }
    excluiProd(){

    }
    
 }