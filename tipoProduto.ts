export class tipoProd {
    private idTipo: number
    private descTipoProd: string
    private segmentacao: string
    private UepsPeps: string
    private validade: string
    constructor(idTipo: number, descTipoProd: string, segmentacao: string, UepsPeps: string, validade: string){
        this.setIdTipo(idTipo); this.setDescTipoProd(descTipoProd); this.setSegmentacao(segmentacao); this.setUepsPeps(UepsPeps); this.setValidade(validade)
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
    setSegmentacao(segmentacao: string){
        this.segmentacao = segmentacao
    }
    getSegmentacao(): string{
        return this.segmentacao
    }
    setUepsPeps(UepsPeps: string){
        this.UepsPeps = UepsPeps
    }
    getUepsPeps(): string{
        return this.UepsPeps
    }
    setValidade(validade: string){
        this.validade = validade
    }
    getValidade(): string{
        return this.validade
    }
    cadastraTipo(idTipo: number, descTipoProd: string, segmentacao: string,UepsPeps: string, validade: string){
        const NovoTipo = new tipoProd(idTipo, descTipoProd, segmentacao, UepsPeps, validade)
        console.log(`Novo tipo cadastrado!!`)
    }
    excluiTipo(){

    }
    consultaTipo(){

    }
}