export class tipoProd {
    private idTipo: number[]
    private descTipoProd: string[]
    private segmentacao: string
    private UepsPeps: string
    private validade: string
    constructor(idTipo: number, descTipoProd: string, segmentacao: string, UepsPeps: string, validade: string){
        this.setIdTipo(idTipo); this.setDescTipoProd(descTipoProd); this.setSegmentacao(segmentacao); this.setUepsPeps(UepsPeps); this.setValidade(validade)
    }
    setIdTipo(idTipo: number){
        this.idTipo.push(idTipo)
    }
    getIdTipo(): any{
       this.idTipo.forEach(element => {
            console.log(element)
        });
    }
    setDescTipoProd(descTipoProd: string){
        this.descTipoProd.push(descTipoProd)
    }
    getDescTipoProd(): any{
        this.idTipo.forEach(element => {
            console.log(element)
        });
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
    excluiTipo(id: number){ //código de exemplo, visto que não utilizaremos array e sim o bd
        this.idTipo.forEach(idTipo => {
            
            if(id = (idTipo-1)){
            
                this.idTipo.splice(idTipo,1)
            }
        });
    }
    consultaTipo(){

    }
}