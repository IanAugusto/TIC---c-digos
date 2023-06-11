export class localEstoque{
    private descricao: string
    private id: number //id local estoque
    private responsavel: number //idUsuario

    constructor(descricao: string, idTipoProd: number, id: number, responsavel: number){
        this.setDescricao(descricao); this.setResposavel(responsavel);  this.getId()      
    }
    
    getDescricao(): string{
        return this.descricao
    }
    setDescricao(descricao: string){
        this.descricao = descricao
    }
    getId(){ 
        return this.id
    }
    setId(id: number){
        this.id = id
    }
    
    getResponsavel(): number{
        return this.responsavel
    }
    setResposavel(responsavel: number){
        this.responsavel = responsavel
    }
    insereLocal(){
// Integração com o banco de dados
    }
    consultaLocal(){
        return `ID:${this.getId()} Descrição:${this.getDescricao()} Responsável:${this.getResponsavel()}`
    }


}