export class Permissao {
    private nivelAcesso: number;
    private descricao: string;

    constructor(nivelAcesso: number, descricao: string) {
        this.setNivelAcesso(nivelAcesso);
        this.setDescricao(descricao);
    }

    setNivelAcesso(nivelAcesso: number) {
        this.nivelAcesso = nivelAcesso;
    }

    getNivelAcesso(): number {
        return this.nivelAcesso;
    }

    setDescricao(descricao: string) {
        this.descricao = descricao;
    }

    getDescricao(): string {
        return this.descricao;
    }
}