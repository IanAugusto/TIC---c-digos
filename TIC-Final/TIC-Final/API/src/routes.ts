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
    //

    // Post //
    app.post('/api/fornecedor', async (request) => {
        
    })

    //
    // Fim fornecedor -- //


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