export class tipoProd {
    private idTipo: number
    private descTipoProd: string
    private segmento: string
    private UepsPeps: string
    constructor(idTipo: number, descTipoProd: string, segmento: string, UepsPeps: string){
        this.setIdTipo(idTipo); this.setDescTipoProd(descTipoProd); this.setSegmento(segmento); this.setUepsPeps(UepsPeps);
    }
    setIdTipo(idTipo: number){
        this.idTipo = idTipo
    }
    getIdTipo(): number{
        return this.idTipo
    }
    setDescTipoProd(descTipoProd: string){
        this.descTipoProd = descTipoProd
    }
    getDescTipoProd(): string{
        return this.descTipoProd
    }
    setSegmento(segmento: string){
        this.segmento = segmento
    }
    getSegmento(): string{
        return this.segmento
    }
    setUepsPeps(UepsPeps: string){
        this.UepsPeps = UepsPeps
    }
    getUepsPeps(): string{
        return this.UepsPeps
    }
    cadastraTipo(idTipo: number, descTipoProd: string, segmentacao: string,UepsPeps: string, validade: string){
        const NovoTipo = new tipoProd(idTipo, descTipoProd, segmentacao, UepsPeps)
        console.log(`Novo tipo cadastrado!!`)
        //Integração com o banco de dados
    }
    excluiTipo(id: number){
 //Integração com o banco de dados
    }
    consultaTipo(){
        return `ID:${this.getIdTipo()} Desrição:${this.getDescTipoProd()} Segmento:${this.getSegmento()} Ueps/Peps: ${this.getUepsPeps()}`
 //Integração com o banco de dados
    }
}