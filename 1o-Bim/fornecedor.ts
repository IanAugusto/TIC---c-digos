export class Fornecedor {
    private idForn: number
    private nomeForn: string
    private endereco: string
    private cpf: string
    private cnpj: string
    private telefone: string
    private pe: Date // Prazo de entrega
    private pix: string 
    constructor(idForn: number, nomeForn: string, endereco: string, cpf: string, cnpj: string, telefone: string, pe: string, pix: string){
        this.setidForn(idForn); this.setNomeForn(nomeForn); this.setEndereco(endereco); this.setCpf(cpf); this.setCnpj(cnpj); this.setTelefone(telefone); this.setPe(pe);
        this.setPix(pix); 
    }
    setidForn(idForn: number) {
        this.idForn = idForn;
    }

    getIdForn(): number {
        return this.idForn;
    }
    setNomeForn(nomeForn: string) {
        this.nomeForn = nomeForn
    }
    getNomeForn(): string {
        return this.nomeForn;
    }
    setEndereco(endereco: string) {
        this.endereco = endereco
    }
    getEndereco(): string {
        return this.endereco;
    }
    setCpf(cpf: string) {
        this.cpf = cpf
    }
    getCpf(): string {
        return this.cpf;
    }
    setCnpj(cnpj: string) {
        this.cnpj = cnpj
    }
    getCnpj(): string {
        return this.cnpj;
    }
    setTelefone(telefone: string) {
        this.telefone = telefone
    }
    getTelefone(): string {
        return this.telefone;
    }
    setPe(pe: Date) {  
        this.pe = pe
    }
    getPe(): Date {
        return this.pe;
    }
    setPix(pix: string) {
        this.pix = pix
    }
    getPix(): string {
        return this.pix;
    }
    consultaForn(){
        return `Nome: ${this.getNomeForn()} Telefone: ${this.getTelefone()} Pix: ${this.getPix()} Pe: ${this.getPe()} CPF: ${this.getCpf()} CNPJ: ${this.getCnpj()} Endereço: ${this.getEndereco()} ID: ${this.getIdForn()}`
    }
    cadastraForn(idForn: number, nomeForn: string, endereco: string, cpf: string, cnpj: string, telefone: string, pe: string, pix: string, cc: string){
        //Integração com o banco de dados   
    }
}