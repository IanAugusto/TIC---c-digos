import {FastifyInstance} from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma"
import dayjs from "dayjs";

export async function AppRoutes(app:FastifyInstance) 
{
    /* Explicação breve sobre as rotas

        Para cada tabela, serão feitas, incialmente, 5 rotas. 2 GET, 1 POST, 1 PUT, 1 DELETE. Uma das rotas GET se trata de uma rota
        para retornar informações de apenas UM OBJETO, enquanto a outra rota GET retorna informações sobre TODOS os objetos da tabela.

        O padrão para nome das rotas será:
            /api/{nome_tabela}/:ID     ou
            /apu/{nome_tabela}/all

        Por questões de organização, estou separando usando comentários com o seguinte padrão:
        
        // -- {nome_tabela} -- //
        //

        {rotas}

        //
        // -- Fim {nome_tabela} -- //
    */

    // -- usuario -- //
    //

    // Post //
    app.post('/api/usuario', async (request) => {
        var requestBody = z.object(
            {
                USUARIO: z.string(),
                SENHA: z.string(),
                NOME: z.string(),
                EMAIL: z.string(),
                DDD_CELULAR: z.number(),
                CELULAR: z.number()
            }
        )

        const {USUARIO, SENHA, NOME, EMAIL, DDD_CELULAR, CELULAR} = requestBody.parse(request.body)

        return await prisma.usuario.create({
            data:{
                USUARIO: USUARIO,
                SENHA: SENHA,
                NOME: NOME,
                EMAIL: EMAIL,
                DDD_CELULAR: DDD_CELULAR,
                CELULAR: CELULAR
            }
        })
    })

    // Get //
    app.get('/api/usuario/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })
        const {ID} = titleParam.parse(request.params); 

        return await prisma.usuario.findFirst({
            where:{
                ID: Number(ID),
            }
        })
    })

    app.get('/api/usuario/all', async (request) => {
        return await prisma.usuario.findMany()
    })

    // Delete //
    app.delete('/api/usuario/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })
        const {ID} = titleParam.parse(request.params);

        return await prisma.usuario.delete({
            where:{
                ID: Number(ID)
            }
        })
    })

    // Put //
    app.put('/api/usuario/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })
        const requestBody = z.object({
            USUARIO: z.string(),
            SENHA: z.string(),
            NOME: z.string(),
            EMAIL: z.string(),
            DDD_CELULAR: z.number(),
            CELULAR: z.number()
        })

        const {ID} = titleParam.parse(request.params);
        const {USUARIO, SENHA, NOME, EMAIL, DDD_CELULAR, CELULAR} = requestBody.parse(request.body)

        return await prisma.usuario.update({
            where:{
                ID: Number(ID)
            },
            data:{
                USUARIO: USUARIO,
                SENHA: SENHA,
                NOME: NOME,
                EMAIL: EMAIL,
                DDD_CELULAR: DDD_CELULAR,
                CELULAR: CELULAR
            }
        })
    })

    //
    // -- Fim usuario -- //

    // -- centro_custo -- //
    //
    
    // Post //
    app.post('/api/centro_custo', async (request) => {
        var requestBody = z.object(
            {
                DES_CENTRO_CUSTO: z.string(),
                STA_ATIVO: z.string(),
                SIGLA: z.string(),
                DATA_INICIAL: z.string().pipe(z.coerce.date()),
                DATA_FINAL: z.string().pipe(z.coerce.date()),
                OBSERVACOES: z.string()
            }
        )

        const {DES_CENTRO_CUSTO,   STA_ATIVO, SIGLA, DATA_INICIAL, DATA_FINAL, OBSERVACOES} = requestBody.parse(request.body)

        return await prisma.centro_custo.create({
            data:{
                DES_CENTRO_CUSTO: DES_CENTRO_CUSTO,
                STA_ATIVO:  STA_ATIVO,
                SIGLA: SIGLA,
                DATA_INICIAL: DATA_INICIAL,
                DATA_FINAL: DATA_FINAL,
                OBSERVACOES: OBSERVACOES
            }
        })
    })

    // Get //
    app.get('/api/centro_custo/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })

        const {ID} = titleParam.parse(request.params)

        return await prisma.centro_custo.findFirst({
            where: {
                ID: Number(ID)
            }
        })
    })
    app.get('/api/centro_custo/all', async (request) => {
        return await prisma.centro_custo.findMany()
    })

    // Delete //
    app.delete('/api/centro_custo/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })

        const {ID} = titleParam.parse(request.params)

        return await prisma.centro_custo.delete({
            where: {
                ID: Number(ID)
            }
        })
    })

    // Put //
    app.put('/api/centro_custo/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })
        var requestBody = z.object(
            {
                DES_CENTRO_CUSTO: z.string(),
                STA_ATIVO: z.string(),
                SIGLA: z.string(),
                DATA_INICIAL: z.string().pipe(z.coerce.date()),
                DATA_FINAL: z.string().pipe(z.coerce.date()),
                OBSERVACOES: z.string()
            }
        )

        const {ID} = titleParam.parse(request.params)
        const {DES_CENTRO_CUSTO,   STA_ATIVO, SIGLA, DATA_INICIAL, DATA_FINAL, OBSERVACOES} = requestBody.parse(request.body)

        return await prisma.centro_custo.update({
            where: {
                ID: Number(ID)
            },
            data:{
                DES_CENTRO_CUSTO: DES_CENTRO_CUSTO,
                STA_ATIVO:  STA_ATIVO,
                SIGLA: SIGLA,
                DATA_INICIAL: DATA_INICIAL,
                DATA_FINAL: DATA_FINAL,
                OBSERVACOES: OBSERVACOES
            }
        })
    })

    //
    // -- Fim centro_custo -- //

    // -- fornecedor -- //
    // Post //
    app.post('/api/fornecedor', async (request) => {
        var requestBody = z.object(
            {
                PESSOA: z.string(),
                NOM_PESSOA: z.string(),
                DAT_CADASTRO: z.string().pipe(z.coerce.date()),
                NUM_CGC: z.string(),
                NUM_CPF: z.string(),
                EMAIL: z.string(),
                NOM_CONTATO: z.string(),
                STA_ATIVO: z.string(),
                NOM_APELIDO: z.string(),
                NOM_FANTASIA: z.string(),
                NUM_RG: z.string(),
                DES_HISTORICO: z.string(),
                NOM_CARGO: z.string(),
                RAMO_ATIVIDADE: z.string(),
                FONE: z.string(),
                STA_POSSUI_NFE: z.string(),
                WEBSITE: z.string(),
                NUM_INSC_ESTATUAL: z.string(),
                USER_CAD: z.number(),
                DATA_CAD: z.string().pipe(z.coerce.date())
            }
        )

        const {PESSOA, NOM_PESSOA, DAT_CADASTRO, NUM_CGC, NUM_CPF, EMAIL, NOM_CONTATO, STA_ATIVO, NOM_APELIDO, NOM_FANTASIA, NUM_RG, DES_HISTORICO, NOM_CARGO, RAMO_ATIVIDADE, FONE, STA_POSSUI_NFE, WEBSITE, NUM_INSC_ESTATUAL, USER_CAD, DATA_CAD} = requestBody.parse(request.body);

        return await prisma.fornecedor.create({
            data: {
                PESSOA: PESSOA,
                NOM_PESSOA: NOM_PESSOA,
                DAT_CADASTRO: DAT_CADASTRO,
                NUM_CGC: NUM_CGC,
                NUM_CPF: NUM_CPF,
                EMAIL: EMAIL,
                NOM_CONTATO: NOM_CONTATO,
                STA_ATIVO: STA_ATIVO,
                NOM_APELIDO: NOM_APELIDO,
                NOM_FANTASIA: NOM_FANTASIA,
                NUM_RG: NUM_RG,
                DES_HISTORICO: DES_HISTORICO,
                NOM_CARGO: NOM_CARGO,
                RAMO_ATIVIDADE: RAMO_ATIVIDADE,
                FONE: FONE,
                STA_POSSUI_NFE: STA_POSSUI_NFE,
                WEBSITE: WEBSITE,
                NUM_INSC_ESTATUAL: NUM_INSC_ESTATUAL,
                USER_CAD: USER_CAD,
                DATA_CAD: DATA_CAD
            }
        })
    })

    // Get //
    app.get("/api/fornecedor/all", async (request) => {
        return await prisma.fornecedor.findMany()
    })
    app.get("/api/fornecedor/:ID", async (request) => {
        var titleParam = z.object({
            ID: z.string().pipe(z.coerce.number())
        })

        const {ID} = titleParam.parse(request.params)

        return await prisma.fornecedor.findFirst({
            where: {
                ID: ID
            }
        })
    })

    // Delete //
    app.delete('/api/fornecedor/:ID', async (request) => {
        var titleParam = z.object({
            ID: z.string().pipe(z.coerce.number())
        })

        const {ID} = titleParam.parse(request.params)

        return await prisma.fornecedor.delete({
            where: {
                ID: ID
            }
        })
    })

    // Put //
    app.put('/api/fornecedor/:ID', async (request) => {
        var titleParam = z.object({
            ID: z.string().pipe(z.coerce.number())
        })
        var requestBody = z.object(
            {
                PESSOA: z.string(),
                NOM_PESSOA: z.string(),
                DAT_CADASTRO: z.string().pipe(z.coerce.date()),
                NUM_CGC: z.string(),
                NUM_CPF: z.string(),
                EMAIL: z.string(),
                NOM_CONTATO: z.string(),
                STA_ATIVO: z.string(),
                NOM_APELIDO: z.string(),
                NOM_FANTASIA: z.string(),
                NUM_RG: z.string(),
                DES_HISTORICO: z.string(),
                NOM_CARGO: z.string(),
                RAMO_ATIVIDADE: z.string(),
                FONE: z.string(),
                STA_POSSUI_NFE: z.string(),
                WEBSITE: z.string(),
                NUM_INSC_ESTATUAL: z.string(),
                USER_CAD: z.number(),
                DATA_CAD: z.string().pipe(z.coerce.date())
            }
        )

        const {PESSOA, NOM_PESSOA, DAT_CADASTRO, NUM_CGC, NUM_CPF, EMAIL, NOM_CONTATO, STA_ATIVO, NOM_APELIDO, NOM_FANTASIA, NUM_RG, DES_HISTORICO, NOM_CARGO, RAMO_ATIVIDADE, FONE, STA_POSSUI_NFE, WEBSITE, NUM_INSC_ESTATUAL, USER_CAD, DATA_CAD} = requestBody.parse(request.body);

        const {ID} = titleParam.parse(request.params)

        return await prisma.fornecedor.update({
            where: {
                ID: ID
            },
            data: {
                PESSOA: PESSOA,
                NOM_PESSOA: NOM_PESSOA,
                DAT_CADASTRO: DAT_CADASTRO,
                NUM_CGC: NUM_CGC,
                NUM_CPF: NUM_CPF,
                EMAIL: EMAIL,
                NOM_CONTATO: NOM_CONTATO,
                STA_ATIVO: STA_ATIVO,
                NOM_APELIDO: NOM_APELIDO,
                NOM_FANTASIA: NOM_FANTASIA,
                NUM_RG: NUM_RG,
                DES_HISTORICO: DES_HISTORICO,
                NOM_CARGO: NOM_CARGO,
                RAMO_ATIVIDADE: RAMO_ATIVIDADE,
                FONE: FONE,
                STA_POSSUI_NFE: STA_POSSUI_NFE,
                WEBSITE: WEBSITE,
                NUM_INSC_ESTATUAL: NUM_INSC_ESTATUAL,
                USER_CAD: USER_CAD,
                DATA_CAD: DATA_CAD
            }
        })
    })

    //
    // -- Fim fornecedor -- //

        // -- fornecedor_produto -- //
    //

    // Post //
    app.post('/api/fornecedor_produto', async (request) => {
        var requestBody = z.object({
            ID_FORN: z.number(),
            ID_PROD: z.number(),
            USER_CAD: z.number(),
            DATA_CAD: z.string().pipe(z.coerce.date())
        })

        const {ID_FORN,ID_PROD,USER_CAD,DATA_CAD} = requestBody.parse(request.body);

        return await prisma.fornecedor_produto.create({
            data: {
                ID_FORN: ID_FORN,
                ID_PROD: ID_PROD,
                USER_CAD: USER_CAD,
                DATA_CAD: DATA_CAD
            }
        })
    })

    // Get //
    app.get("/api/fornecedor_produto/all", async (request) => {
        return await prisma.fornecedor_produto.findMany()
    })

    app.get("/api/fornecedor_produto/:ID", async (request) => {
        var titleParam = z.object({
            ID: z.string().pipe(z.coerce.number())
        })

        const {ID} = titleParam.parse(request.params)

        return await prisma.fornecedor_produto.findFirst({
            where: {
                ID: ID
            }
        })
    })

    // Delete //
    app.delete('/api/fornecedor_produto/:ID', async (request) => {
        var titleParam = z.object({
            ID: z.string().pipe(z.coerce.number())
        })

        const {ID} = titleParam.parse(request.params)

        return await prisma.fornecedor_produto.delete({
            where: {
                ID: ID
            }
        })
    })

    // Put //
    app.put('/api/fornecedor_produto/:ID', async (request) => {
        var titleParam = z.object({
            ID: z.string().pipe(z.coerce.number())
        })
        var requestBody = z.object({
            ID_FORN: z.number(),
            ID_PROD: z.number(),
            USER_CAD: z.number(),
            DATA_CAD: z.string().pipe(z.coerce.date())
        })

        const {ID_FORN,ID_PROD,USER_CAD,DATA_CAD} = requestBody.parse(request.body);
        const {ID} = titleParam.parse(request.params)

        return await prisma.fornecedor_produto.update({
            where: {
                ID: ID
            },
            data: {
                ID_FORN: ID_FORN,
                ID_PROD: ID_PROD,
                USER_CAD: USER_CAD,
                DATA_CAD: DATA_CAD
            }
        })
    })

    //
    // -- Fim fornecedor_produto -- //

     // -- movimentacao -- //
    //
    
    // Post //
    app.post('/api/movimentacao', async (request) => {
        var requestBody = z.object({
            ID_PROD: z.number(),
            E_S: z.string(),
            DATA_MOVTO: z.string().pipe(z.coerce.date()),
            TIPO_MOVTO: z.number(),
            QTD: z.number(),
            VALOR: z.number(),
            VALOR_TOTAL: z.number(),
            VALOR_MEDIO: z.number(),
            QTD_EST_ATUAL: z.number(),
            USER_CAD: z.number(),
            DATA_CAD: z.string().pipe(z.coerce.date())
        })

        const {ID_PROD, E_S, DATA_MOVTO, TIPO_MOVTO, QTD, VALOR, VALOR_TOTAL, VALOR_MEDIO, QTD_EST_ATUAL, USER_CAD, DATA_CAD} = requestBody.parse(request.body);
        if(QTD < 0 || VALOR < 0|| VALOR_TOTAL < 0 || VALOR_MEDIO < 0 || QTD_EST_ATUAL <0){
            return console.log("Quantidade e valor devem ser maior ou igual a 0")
        }else{
            return await prisma.movimentacao.create({
                data: {
                    ID_PROD: ID_PROD,
                    E_S: E_S,
                    DATA_MOVTO: DATA_MOVTO,
                    TIPO_MOVTO: TIPO_MOVTO,
                    QTD: QTD,
                    VALOR: VALOR,
                    VALOR_TOTAL: VALOR_TOTAL,
                    VALOR_MEDIO: VALOR_MEDIO,
                    QTD_EST_ATUAL: QTD_EST_ATUAL,
                    USER_CAD: USER_CAD,
                    DATA_CAD: DATA_CAD
                }
            })
        }
        
    })

    // Get //
    app.get('/api/movimentacao/all', async (request) => {
        return await prisma.movimentacao.findMany()
    })
    app.get('/api/movimentacao/:ID', async (request) => {
        var titleParam = z.object({
            ID: z.string().pipe(z.coerce.number())
        }) 

        const {ID} = titleParam.parse(request.params)

        return await prisma.movimentacao.findFirst({
            where: {
                ID: ID
            }
        })
    })

    // Delete //
    app.delete('/api/movimentacao/:ID', async (request) => {
        var titleParam = z.object({
            ID: z.string().pipe(z.coerce.number())
        }) 

        const {ID} = titleParam.parse(request.params)

        return await prisma.movimentacao.delete({
            where: {
                ID: ID
            }
        })
    })

    // Put //
    app.put('/api/movimentacao/:ID', async (request) => {
        var titleParam = z.object({
            ID: z.string().pipe(z.coerce.number())
        }) 
        var requestBody = z.object({
            ID_PROD: z.number(),
            E_S: z.string(),
            DATA_MOVTO: z.string().pipe(z.coerce.date()),
            TIPO_MOVTO: z.number(),
            QTD: z.number(),
            VALOR: z.number(),
            VALOR_TOTAL: z.number(),
            VALOR_MEDIO: z.number(),
            QTD_EST_ATUAL: z.number(),
            USER_CAD: z.number(),
            DATA_CAD: z.string().pipe(z.coerce.date())
        })

        const {ID_PROD, E_S, DATA_MOVTO, TIPO_MOVTO, QTD, VALOR, VALOR_TOTAL, VALOR_MEDIO, QTD_EST_ATUAL, USER_CAD, DATA_CAD} = requestBody.parse(request.body);
        const {ID} = titleParam.parse(request.params)
        if(QTD < 0 || VALOR < 0 || VALOR_TOTAL < 0 || VALOR_MEDIO < 0 || QTD_EST_ATUAL <0){
            return console.log("Quantidade deve ser maior ou igual a 0")
        }else{
            return await prisma.movimentacao.update({
                where: {
                    ID: ID
                },
                data: {
                    ID_PROD: ID_PROD,
                    E_S: E_S,
                    DATA_MOVTO: DATA_MOVTO,
                    TIPO_MOVTO: TIPO_MOVTO,
                    QTD: QTD,
                    VALOR: VALOR,
                    VALOR_TOTAL: VALOR_TOTAL,
                    VALOR_MEDIO: VALOR_MEDIO,
                    QTD_EST_ATUAL: QTD_EST_ATUAL,
                    USER_CAD: USER_CAD,
                    DATA_CAD: DATA_CAD
                }
            })
        }
        
    })

    //
    // -- Fim movimentacao -- //



    // -- Tipo_produto -- //
    //
    
    // Post //
    app.post('/api/tipo_produto', async (request) => {
        var requestBody = z.object(
            {
                SEGMENTO: z.string(),
                STA_CONTROLA_VALIDADE: z.string(),
                STA_MOV_ESTOQUE: z.string(),
                UEPS_PEPS: z.string(),
                USER_CAD: z.number(),
                DATA_CAD: z.string().pipe(z.coerce.date())
            }
        )

        const {SEGMENTO, STA_CONTROLA_VALIDADE, STA_MOV_ESTOQUE, UEPS_PEPS, USER_CAD, DATA_CAD} = requestBody.parse(request.body)

        return await prisma.tipo_produto.create({
            data:{
                SEGMENTO: SEGMENTO,
                STA_CONTROLA_VALIDADE:  STA_CONTROLA_VALIDADE,
                STA_MOV_ESTOQUE: STA_MOV_ESTOQUE,
                UEPS_PEPS: UEPS_PEPS,
                USER_CAD: USER_CAD,
                DATA_CAD: DATA_CAD
            }
        })
    })

    // Get //
    app.get('/api/tipo_produto/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })

        const {ID} = titleParam.parse(request.params)

        return await prisma.tipo_produto.findFirst({
            where: {
                ID: Number(ID)
            }
        })
    })
    app.get('/api/tipo_produto/all', async (request) => {
        return await prisma.tipo_produto.findMany()
    })

    // Delete //
    app.delete('/api/tipo_produto/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })

        const {ID} = titleParam.parse(request.params)

        return await prisma.tipo_produto.delete({
            where: {
                ID: Number(ID)
            }
        })
    })

    // Put //
    app.put('/api/tipo_produto/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })
        var requestBody = z.object(
            {
                SEGMENTO: z.string(),
                STA_CONTROLA_VALIDADE: z.string(),
                STA_MOV_ESTOQUE: z.string(),
                UEPS_PEPS: z.string(),
                USER_CAD: z.number(),
                DATA_CAD: z.string().pipe(z.coerce.date())
            }
        )

        const {ID} = titleParam.parse(request.params)
        const {SEGMENTO, STA_CONTROLA_VALIDADE, STA_MOV_ESTOQUE, UEPS_PEPS, USER_CAD, DATA_CAD} = requestBody.parse(request.body)

        return await prisma.tipo_produto.update({
            where: {
                ID: Number(ID)
            },
            data:{
                SEGMENTO: SEGMENTO,
                STA_CONTROLA_VALIDADE:  STA_CONTROLA_VALIDADE,
                STA_MOV_ESTOQUE: STA_MOV_ESTOQUE,
                UEPS_PEPS: UEPS_PEPS,
                USER_CAD: USER_CAD,
                DATA_CAD: DATA_CAD
            }
        })
    })

    //
    // -- Fim tipo_produto -- //


    // -- unidade_medida -- //
    //
    
    // Post //
    app.post('/api/unidade_medida', async (request) => {
        var requestBody = z.object(
            {
                DES_UNIDADE: z.string(),
                UNID_SIGLA: z.string(),
                USER_CAD: z.number(),
                DATA_CAD: z.string().pipe(z.coerce.date())
            }
        )

        const {DES_UNIDADE, UNID_SIGLA, USER_CAD, DATA_CAD} = requestBody.parse(request.body)

        return await prisma.unidade_medida.create({
            data:{
                DES_UNIDADE: DES_UNIDADE,
                UNID_SIGLA:  UNID_SIGLA,
                USER_CAD: USER_CAD,
                DATA_CAD: DATA_CAD
            }
        })
    })

    // Get //
    app.get('/api/unidade_medida/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })

        const {ID} = titleParam.parse(request.params)

        return await prisma.unidade_medida.findFirst({
            where: {
                ID: Number(ID)
            }
        })
    })
    app.get('/api/unidade_medida/all', async (request) => {
        return await prisma.unidade_medida.findMany()
    })

    // Delete //
    app.delete('/api/unidade_medida/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })

        const {ID} = titleParam.parse(request.params)

        return await prisma.unidade_medida.delete({
            where: {
                ID: Number(ID)
            }
        })
    })

    // Put //
    app.put('/api/unidade_medida/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })
        var requestBody = z.object(
            {
                DES_UNIDADE: z.string(),
                UNID_SIGLA: z.string(),
                USER_CAD: z.number(),
                DATA_CAD: z.string().pipe(z.coerce.date())
            }
        )

        const {ID} = titleParam.parse(request.params)
        const {DES_UNIDADE, UNID_SIGLA, USER_CAD, DATA_CAD} = requestBody.parse(request.body)

        return await prisma.unidade_medida.update({
            where: {
                ID: Number(ID)
            },
            data:{
                DES_UNIDADE: DES_UNIDADE,
                UNID_SIGLA:  UNID_SIGLA,
                USER_CAD: USER_CAD,
                DATA_CAD: DATA_CAD
            }
        })
    })

    //
    // -- Fim unidade_medida -- //

    // -- produto -- //
    //
    
    // Post //
    app.post('/api/produto', async (request) => {
        var requestBody = z.object(
            {
                COD_MATERIAL: z.string(),
                DESCRICAO: z.string(),
                MARCA: z.string(),
                TIPO_PROD_ID: z.number(),
                STA_ATIVO: z.string(),
                QTD_ESTOQUE_MINIMO: z.number(),
                QTD_ESTOQUE_MAXIMO: z.number(),
                UNME_ID: z.number(),
                DAT_INCLUSAO: z.string().pipe(z.coerce.date()),
                IMAGEM: z.any(),
                USER_CAD: z.number(),
                DATA_CAD: z.string().pipe(z.coerce.date())
            }
        )

        const {COD_MATERIAL, DESCRICAO, MARCA, TIPO_PROD_ID, STA_ATIVO, QTD_ESTOQUE_MINIMO, QTD_ESTOQUE_MAXIMO, UNME_ID, DAT_INCLUSAO, IMAGEM, USER_CAD, DATA_CAD} = requestBody.parse(request.body)
        if(QTD_ESTOQUE_MINIMO < 0 || QTD_ESTOQUE_MAXIMO < 0){
           return console.log("Quantidade deve ser maior que 0")
        }else{
            return await prisma.produto.create({
                data:{
                    COD_MATERIAL: COD_MATERIAL,
                    DESCRICAO:  DESCRICAO,
                    MARCA: MARCA,
                    TIPO_PROD_ID: TIPO_PROD_ID,
                    STA_ATIVO: STA_ATIVO,
                    QTD_ESTOQUE_MINIMO: QTD_ESTOQUE_MINIMO,
                    QTD_ESTOQUE_MAXIMO: QTD_ESTOQUE_MAXIMO,
                    UNME_ID: UNME_ID,
                    DAT_INCLUSAO: DAT_INCLUSAO,
                    IMAGEM: IMAGEM,
                    USER_CAD: USER_CAD,
                    DATA_CAD: DATA_CAD
                }
            })
        }
        
    })

    // Get //
    app.get('/api/produto/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })

        const {ID} = titleParam.parse(request.params)

        return await prisma.produto.findFirst({
            where: {
                ID: Number(ID)
            }
        })
    })
    app.get('/api/produto/all', async (request) => {
        return await prisma.produto.findMany()
    })

    // Delete //
    app.delete('/api/produto/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })

        const {ID} = titleParam.parse(request.params)

        return await prisma.produto.delete({
            where: {
                ID: Number(ID)
            }
        })
    })

    // Put //
    app.put('/api/produto/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })
        var requestBody = z.object(
            {
                COD_MATERIAL: z.string(),
                DESCRICAO: z.string(),
                MARCA: z.string(),
                TIPO_PROD_ID: z.number(),
                STA_ATIVO: z.string(),
                QTD_ESTOQUE_MINIMO: z.number(),
                QTD_ESTOQUE_MAXIMO: z.number(),
                UNME_ID: z.number(),
                DAT_INCLUSAO: z.string().pipe(z.coerce.date()),
                IMAGEM: z.any(),
                USER_CAD: z.number(),
                DATA_CAD: z.string().pipe(z.coerce.date())
            }
        )

        const {ID} = titleParam.parse(request.params)
        const {COD_MATERIAL, DESCRICAO, MARCA, TIPO_PROD_ID, STA_ATIVO, QTD_ESTOQUE_MINIMO, QTD_ESTOQUE_MAXIMO, UNME_ID, DAT_INCLUSAO, IMAGEM, USER_CAD, DATA_CAD} = requestBody.parse(request.body)
        if(QTD_ESTOQUE_MINIMO < 0 || QTD_ESTOQUE_MAXIMO < 0){
            return console.log("Quantidade deve ser maior que 0")
         }else{
            return await prisma.produto.update({
              where: {
                ID: Number(ID)
              },
              data:{
                  COD_MATERIAL: COD_MATERIAL,
                  DESCRICAO:  DESCRICAO,
                  MARCA: MARCA,
                  TIPO_PROD_ID: TIPO_PROD_ID,
                  STA_ATIVO: STA_ATIVO,
                  QTD_ESTOQUE_MINIMO: QTD_ESTOQUE_MINIMO,
                  QTD_ESTOQUE_MAXIMO: QTD_ESTOQUE_MAXIMO,
                  UNME_ID: UNME_ID,
                  DAT_INCLUSAO: DAT_INCLUSAO,
                  IMAGEM: IMAGEM,
                  USER_CAD: USER_CAD,
                  DATA_CAD: DATA_CAD
              }
          })
      }
    })

    //
    // -- Fim produto -- //

    
    // -- tipo_movimento_estoque -- //
    //
    
    // Post //
    app.post('/api/tipo_movimento_estoque', async (request) => {
        var requestBody = z.object(
            {
                DES_TIPO_MOVIMENTO: z.string(),
                DES_OBSERVACAO: z.string(),
                STA_ATIVO: z.string(),
                STA_TIPO_MOVIMENTO: z.string(),
                USER_CAD: z.number(),
                DATA_CAD: z.string().pipe(z.coerce.date())
            }
        )

        const {DES_TIPO_MOVIMENTO, DES_OBSERVACAO, STA_ATIVO, STA_TIPO_MOVIMENTO, USER_CAD, DATA_CAD} = requestBody.parse(request.body)

        return await prisma.tipo_movimento_estoque.create({
            data:{
                DES_TIPO_MOVIMENTO: DES_TIPO_MOVIMENTO,
                DES_OBSERVACAO:  DES_OBSERVACAO,
                STA_ATIVO: STA_ATIVO,
                STA_TIPO_MOVIMENTO: STA_TIPO_MOVIMENTO,
                USER_CAD: USER_CAD,
                DATA_CAD: DATA_CAD
            }
        })
    })

    // Get //
    app.get('/api/tipo_movimento_estoque/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })

        const {ID} = titleParam.parse(request.params)

        return await prisma.tipo_movimento_estoque.findFirst({
            where: {
                ID: Number(ID)
            }
        })
    })
    app.get('/api/tipo_movimento_estoque/all', async (request) => {
        return await prisma.tipo_movimento_estoque.findMany()
    })

    // Delete //
    app.delete('/api/tipo_movimento_estoque/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })

        const {ID} = titleParam.parse(request.params)

        return await prisma.tipo_movimento_estoque.delete({
            where: {
                ID: Number(ID)
            }
        })
    })

    // Put //
    app.put('/api/tipo_movimento_estoque/:ID', async (request) => {
        const titleParam = z.object({
            ID: z.string()
        })
        var requestBody = z.object(
            {
                DES_TIPO_MOVIMENTO: z.string(),
                DES_OBSERVACAO: z.string(),
                STA_ATIVO: z.string(),
                STA_TIPO_MOVIMENTO: z.string(),
                USER_CAD: z.number(),
                DATA_CAD: z.string().pipe(z.coerce.date())
            }
        )

        const {ID} = titleParam.parse(request.params)
        const {DES_TIPO_MOVIMENTO, DES_OBSERVACAO, STA_ATIVO, STA_TIPO_MOVIMENTO, USER_CAD, DATA_CAD} = requestBody.parse(request.body)

        return await prisma.tipo_movimento_estoque.update({
            where: {
                ID: Number(ID)
            },
            data:{
                DES_TIPO_MOVIMENTO: DES_TIPO_MOVIMENTO,
                DES_OBSERVACAO:  DES_OBSERVACAO,
                STA_ATIVO: STA_ATIVO,
                STA_TIPO_MOVIMENTO: STA_TIPO_MOVIMENTO,
                USER_CAD: USER_CAD,
                DATA_CAD: DATA_CAD
            }
        })
    })

    //
    // -- Fim tipo_movimento_estoque -- //
}