import { localEstoque } from "./localEstoque";

export class tipoMovimento {
    private descricao:string
    private id: number
    private localEstoque: localEstoque
    private tipo: string

    constructor(descricao: string,id: number, localEstoque: localEstoque, tipo: string){
        this.setDescricao(descricao);
        this.setId(id)
        this.setLocalEstoque(localEstoque)
        this.setTipo(tipo)
    }
    setDescricao(descricao: string){
        this.descricao = descricao
    }
    getDescricao(): string{
        return this.descricao
    }
    getId():number{
        return this.id
    }
    setId(id: number){
        this.id = id
    }
    getLocalEstoque():localEstoque{
        return this.localEstoque
    }
    setLocalEstoque(value: localEstoque){
        this.localEstoque = value
    }
    setTipo(value: string){
        if(value == "entrada"){
            this.tipo = "entrada"
        }else if(value = "saida"){
            this.tipo = "saida"
        }else{
            console.log("Tipo inválido")
        }
    }
    getTipo():string{
        return this.tipo
    }
    consultaTipo(){
        return `Descrição: ${this.getDescricao()} ID: ${this.getId()} Local do Estoque: ${this.getLocalEstoque()} Tipo: ${this.getTipo()}`
//Integração com o banco de dados
    }
    cadastraTipo(){
        //Integração com o banco de dados
    }
}