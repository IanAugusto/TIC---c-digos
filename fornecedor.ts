export class Fornecedor {
    private idForn: number
    private nomeForn: string
    private endereco: string
    private cpf: string
    private cnpj: string
    private telefone: string
    private pe: string
    private pix: string
    private cc: string
    constructor(idForn: number, nomeForn: string, endereco: string, cpf: string, cnpj: string, telefone: string, pe: string, pix: string, cc: string){
        this.setidForn(idForn); this.setNomeForn(nomeForn); this.setEndereco(endereco); this.setCpf(cpf); this.setCnpj(cnpj); this.setTelefone(telefone); this.setPe(pe);
        this.setPix(pix); this.setCc(cc);
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
    setPe(pe: string) {
        this.pe = pe
    }
    getPe(): string {
        return this.pe;
    }
    setPix(pix: string) {
        this.pix = pix
    }
    getPix(): string {
        return this.pix;
    }
    setCc(cc: string) {
        this.cc = cc
    }
    getCc(): string {
        return this.cc;
    }
    consultaForn(){

    }
    cadastraForn(){
        
    }
}