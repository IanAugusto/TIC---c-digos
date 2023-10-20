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
}