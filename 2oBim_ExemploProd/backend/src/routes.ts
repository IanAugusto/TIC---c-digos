import { FastifyInstance } from "fastify";
import {z} from 'zod';
import {prisma} from './lib/prisma'

export async function AppRoutes(app:FastifyInstance)
{
// -- Produto Start -- //
    app.get('/produto/all', async () => {
        const all = await prisma.produto.findMany();
        return all;
    });

    app.get('/produto/:id', async (request) => {
        const titleParam = z.object({
            id: z.string()
        })
        const {id} = titleParam.parse(request.params); 

        return await prisma.produto.findMany({
            where:{
                id: Number(id),
            }
        })
    })

    app.post('/produto', async (request) => {
        const postBody = z.object(
            {
                cod_material: z.string(),
                desc_prod: z.string(),
                marca_prod: z.string(),
                id_tipo: z.number(),
                sta_ativo: z.string(),
                estoque_min: z.number(),
                estoque_max: z.number(),
                id_unme: z.number(),
                data_incl: z.date(),
                user_cad: z.string(),
                data_cad: z.date(),
            }
        )

        const {cod_material, desc_prod, marca_prod, id_tipo, sta_ativo, estoque_min, estoque_max, id_unme, data_incl, user_cad, data_cad} = postBody.parse(request.body);

        return await prisma.produto.create({
            data:{
                cod_material: cod_material,
                desc_prod: desc_prod,
                marca_prod: marca_prod,
                id_tipo: id_tipo,
                sta_ativo: sta_ativo,
                estoque_min: estoque_min,
                estoque_max: estoque_max,
                id_unme: id_unme,
                data_incl: data_incl,
                user_cad: user_cad,
                data_cad: data_cad,
            }
        })
    })

    app.put('/produto/:id', async (request) => {
        const idParam = z.object({
            id: z.string()
        })

        const putBody = z.object({
            "cod_material": z.string(),
            "desc_prod": z.string(),
            "marca_prod": z.string(),
            "id_tipo": z.number(),
            "sta_ativo": z.string(),
            "estoque_min": z.number(),
            "estoque_max": z.number(),
            "id_unme": z.number(),
            "data_incl": z.date(),
            "user_cad": z.string(),
            "data_cad": z.date()
        })

        const {id} = idParam.parse(request.params)
        const {cod_material, desc_prod, marca_prod, id_tipo, sta_ativo, estoque_min, estoque_max, id_unme, data_incl, user_cad, data_cad} = putBody.parse(request.body)

        return await prisma.produto.updateMany({
            where: {
                id: Number(id)
            },
            data:{
                cod_material: cod_material,
                desc_prod: desc_prod,
                marca_prod: marca_prod,
                id_tipo: id_tipo,
                sta_ativo: sta_ativo,
                estoque_min: estoque_min,
                estoque_max: estoque_max,
                id_unme: id_unme,
                data_incl: data_incl,
                user_cad: user_cad,
                data_cad: data_cad,
            }
        })
    })

    app.delete('/produto/:id', async (request) =>
    {
        const idParam = z.object({
            id: z.string()
        })

        const {id} = idParam.parse(request.params);

        return await prisma.produto.delete({
            where: {
                id: Number(id),
            }
        })
    })
// -- Produto End -- //

// -- Tipo Prod Start -- //
    app.get('/tipoprod/all', async () => {
        const all = await prisma.tipo_Prod.findMany();
        return all;
    });

    app.get('/tipoprod/:id', async (request) => {
        const titleParam = z.object({
            id: z.string()
        })
        const {id} = titleParam.parse(request.params); 

        return await prisma.tipo_Prod.findMany({
            where:{
                id_tipo: Number(id),
            }
        })
    })

    app.post('/tipoprod', async (request) => {
        const postBody = z.object(
            {
                segmento: z.string(),
                sta_controla_val: z.string(),
                sta_mov_estoque: z.string(),
                ueps_peps: z.string(),
                user_cad: z.string(),
                data_cad: z.date()
            }
        )

        const {segmento, sta_controla_val, sta_mov_estoque, ueps_peps, user_cad, data_cad} = postBody.parse(request.body);

        return await prisma.tipo_Prod.create({
            data:{
                segmento: segmento,
                sta_controla_val: sta_controla_val,
                sta_mov_estoque: sta_mov_estoque,
                ueps_peps: ueps_peps,
                user_cad: user_cad,
                data_cad: data_cad
            }
        })
    })

    app.put('/tipoprod/:id', async (request) => {
        const idParam = z.object({
            id: z.string()
        })

        const putBody = z.object({
            "segmento": z.string(),
            "sta_controla_val": z.string(),
            "sta_mov_estoque": z.string(),
            "ueps_peps": z.string(),
            "user_cad": z.string(),
            "data_cad": z.date()
        })

        const {id} = idParam.parse(request.params)
        const {segmento, sta_controla_val, sta_mov_estoque, ueps_peps, user_cad, data_cad} = putBody.parse(request.body)

        return await prisma.tipo_Prod.updateMany({
            where: {
                id_tipo: Number(id)
            },
            data:{
                segmento: segmento,
                sta_controla_val: sta_controla_val,
                sta_mov_estoque: sta_mov_estoque,
                ueps_peps: ueps_peps,
                user_cad: user_cad,
                data_cad: data_cad
            }
        })
    })

    app.delete('/tipoprod/:id', async (request) =>
    {
        const idParam = z.object({
            id: z.string()
        })

        const {id} = idParam.parse(request.params);

        return await prisma.tipo_Prod.delete({
            where: {
                id_tipo: Number(id),
            }
        })
    })
// -- Tipo Prod End -- //

// -- Fornecedor Start -- //
    app.get('/fornecedor/all', async () => {
        const all = await prisma.fornecedor.findMany();
        return all;
    });

    app.get('/fornecedor/:id', async (request) => {
        const titleParam = z.object({
            id: z.string()
        })
        const {id} = titleParam.parse(request.params); 

        return await prisma.fornecedor.findMany({
            where:{
                id_fornecedor: Number(id),
            }
        })
    })

    app.post('/fornecedor', async (request) => {
        const postBody = z.object(
            {
                pessoa: z.boolean(),
                nome_pessoa: z.string(),
                data_cadastro: z.date(),
                num_cnpj: z.string(),
                num_cpf: z.string(),
                email: z.string(),
                nome_contato: z.string(),
                nome_fantasia: z.string(),
                num_rg: z.string(),
                des_historico: z.string(),
                nome_cargo: z.string(),
                ramo_atividade: z.string(),
                fone: z.string(),
                sta_possui_nfe: z.string(),
                website: z.string(),
                num_insc_estatual: z.string(),
                prazo_entrega: z.number()
            }
        )

        const {pessoa, nome_pessoa, data_cadastro, num_cnpj, num_cpf, email, nome_contato, nome_fantasia, num_rg, des_historico, nome_cargo, ramo_atividade, fone, sta_possui_nfe, website, num_insc_estatual, prazo_entrega} = postBody.parse(request.body);

        return await prisma.fornecedor.create({
            data:{
                pessoa: pessoa,
                nome_pessoa: nome_pessoa,
                data_cadastro: data_cadastro,
                num_cnpj: num_cnpj,
                num_cpf: num_cpf,
                email: email,
                nome_contato: nome_contato,
                nome_fantasia: nome_fantasia,
                num_rg: num_rg,
                des_historico: des_historico,
                nome_cargo: nome_cargo,
                ramo_atividade: ramo_atividade,
                fone: fone,
                sta_possui_nfe: sta_possui_nfe,
                website: website,
                num_insc_estatual: num_insc_estatual,
                prazo_entrega: prazo_entrega
            }
        })
    })

    app.put('/fornecedor/:id', async (request) => {
        const idParam = z.object({
            id: z.string()
        })

        const putBody = z.object({
            "pessoa": z.boolean(),
            "nome_pessoa": z.string(),
            "data_cadastro": z.date(),
            "num_cnpj": z.string(),
            "num_cpf": z.string(),
            "email": z.string(),
            "nome_contato": z.string(),
            "nome_fantasia": z.string(),
            "num_rg": z.string(),
            "des_historico": z.string(),
            "nome_cargo": z.string(),
            "ramo_atividade": z.string(),
            "fone": z.string(),
            "sta_possui_nfe": z.string(),
            "website": z.string(),
            "num_insc_estatual": z.string(),
            "prazo_entrega": z.number()
        })

        const {id} = idParam.parse(request.params)
        const {pessoa, nome_pessoa, data_cadastro, num_cnpj, num_cpf, email, nome_contato, nome_fantasia, num_rg, des_historico, nome_cargo, ramo_atividade, fone, sta_possui_nfe, website, num_insc_estatual, prazo_entrega} = putBody.parse(request.body);

        return await prisma.fornecedor.updateMany({
            where: {
                id_fornecedor: Number(id)
            },
            data:{
                pessoa: pessoa,
                nome_pessoa: nome_pessoa,
                data_cadastro: data_cadastro,
                num_cnpj: num_cnpj,
                num_cpf: num_cpf,
                email: email,
                nome_contato: nome_contato,
                nome_fantasia: nome_fantasia,
                num_rg: num_rg,
                des_historico: des_historico,
                nome_cargo: nome_cargo,
                ramo_atividade: ramo_atividade,
                fone: fone,
                sta_possui_nfe: sta_possui_nfe,
                website: website,
                num_insc_estatual: num_insc_estatual,
                prazo_entrega: prazo_entrega
            }
        })
    })

    app.delete('/fornecedor/:id', async (request) =>
    {
        const idParam = z.object({
            id: z.string()
        })

        const {id} = idParam.parse(request.params);

        return await prisma.fornecedor.delete({
            where: {
                id_fornecedor: Number(id),
            }
        })
    })
// -- Fornecedor End -- //

// -- Forn/Prod Start -- //
    app.get('/fornprod/all', async () => {
        const all = await prisma.forn_Prod.findMany();
        return all;
    });

    app.get('/fornprod/:id', async (request) => {
        const titleParam = z.object({
            id: z.string()
        })
        const {id} = titleParam.parse(request.params); 

        return await prisma.forn_Prod.findMany({
            where:{
                id_fornprod: Number(id),
            }
        })
    })

    app.post('/fornprod', async (request) => {
        const postBody = z.object(
            {
                id_fornprod: z.number(),
                id_fornecedor: z.number(),
                id_produto: z.number()
            }
        )

        const {id_fornprod, id_fornecedor, id_produto} = postBody.parse(request.body);

        return await prisma.forn_Prod.create({
            data:{
                id_fornprod: id_fornprod,
                id_fornecedor: id_fornecedor,
                id_produto: id_produto
            }
        })
    })

    app.put('/fornprod/:id', async (request) => {
        const idParam = z.object({
            id: z.string()
        })

        const putBody = z.object({
            id_fornprod: z.number(),
            id_fornecedor: z.number(),
            id_produto: z.number()
        })

        const {id} = idParam.parse(request.params)
        const {id_fornecedor, id_fornprod, id_produto} = putBody.parse(request.body);

        return await prisma.forn_Prod.updateMany({
            where: {
                id_fornecedor: Number(id)
            },
            data:{
                id_fornprod: id_fornprod,
                id_fornecedor: id_fornecedor,
                id_produto: id_produto
            }
        })
    })

    app.delete('/fornprod/:id', async (request) =>
    {
        const idParam = z.object({
            id: z.string()
        })

        const {id} = idParam.parse(request.params);

        return await prisma.forn_Prod.delete({
            where: {
                id_fornprod: Number(id),
            }
        })
    })
// -- Forn/Prod End -- //
}