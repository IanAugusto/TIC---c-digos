export class localEstoque{
    private descricao: string
    private idTipoProd: number
    private id: number[] //id local estoque
    private responsavel: number //idUsuario

    constructor(descricao: string, idTipoProd: number, id: number, responsavel: number){
        this.setDescricao(descricao); this.setResposavel(responsavel); this.setTipoProd(idTipoProd);
        this.id = []        
    }
    
    getDescricao(): string{
        return this.descricao
    }
    setDescricao(descricao: string){
        this.descricao = descricao
    }
    
    getTipoProd(): number{
        return this.idTipoProd
    }
    setTipoProd(tipoProd: number){
        this.idTipoProd = tipoProd
    }
    
    getId(){
        let i = 0
        this.id.forEach(tipo => {
            console.log(i)
            i++
        });
    }
    setId(id: number){
        this.id.push(id)
    }
    
    getResponsavel(): number{
        return this.responsavel
    }
    setResposavel(responsavel: number){
        this.responsavel = responsavel
    }
    insereLocal(){
// utilizaremos quando criarmos o banco, no momento estamos utilizando constructor 
    }
    consultaLocal(consulta: number){
        let i = 0
        this.id.forEach(tipo => {
            if(consulta = tipo){
                this.id[i].getDescricao()
            }
            i++
        });
    }


}