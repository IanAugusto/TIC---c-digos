import { FastifyInstance } from "fastify";
import {z} from 'zod';
import {prisma} from './lib/prisma'

export async function AppRoutes(app:FastifyInstance)
{
    app.get('/all', async () => {
        const all = await prisma.post.findMany();
        return all;
    });

    app.get('/produto/:id', async (request) => {
        const titleParam = z.object({
            id: z.number()
        })
        const {id} = titleParam.parse(request.params); 

        return await prisma.post.findMany({
            where:{
                id: id,
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

        return await prisma.post.create({
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
            id: z.number()
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

        return await prisma.post.updateMany({
            where: {
                id: id
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
            id: z.number()
        })

        const {id} = idParam.parse(request.params);

        return await prisma.post.delete({
            where: {
                id: id,
            }
        })
    })
}