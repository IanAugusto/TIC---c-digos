//Efetua Login
async function Submit()
{
    const login = await fetch(`http://localhost:776/login/${document.getElementById("username").value}/${document.getElementById("password").value}`).then(answer => {
        return answer.json();
    })

    if(login != null)
    {
        alert(`Login efetuado com sucesso`);
        document.getElementById("current-user").value = login.username;
        document.getElementById("login-card").classList.add("hidden");
        document.getElementById("background").classList.add("py-0");
        document.getElementById("background").classList.add("px-32");        
        document.getElementById("background").classList.remove("p-64");
        document.getElementById("main").classList.remove("hidden");
    }
    else
    {
        alert(`Nome ou Senha incorretos`)
    }
}

//Skippa Login
async function Debug()
{
    const login = await fetch(`http://localhost:776/login/debug/debug`).then(answer => {
        return answer.json();
    })

    if(login != null)
    {
        document.getElementById("current-user").value = login.username;
        document.getElementById("login-card").classList.add("hidden");
        document.getElementById("background").classList.add("py-0");
        document.getElementById("background").classList.add("px-32");        
        document.getElementById("background").classList.remove("p-64");
        document.getElementById("main").classList.remove("hidden");
    }
}

//Consome API para gerar um elemento HTML select do tipo requisitado
//Parâmetro 'type' se refere a entidade no BD, parâmetro 'id' se refere ao id do elemento HTML a ser preenchido
async function GetEntityForSelect(type, id)
{
    const result = await GetValuesFromDB(type, "all");

    let inner = ``;
    result.forEach(element => {
        switch(type)
        {
            case 'tipoprod':
                inner += `<option value = "${element.id_tipo}">${element.segmento}</option>`;
                break;
            case 'unme':
                inner += `<option value = "${element.id_unme}">${element.des_unidade}</option>`;
                break;
        }
    });

    document.getElementById(id).innerHTML = inner
}

//Consome API para gerar um elemento tabela HTML com todas as ocorrências de uma entidade a qual foram cadastradas pelo usuário logado no momento
//Parâmetro 'type' se refere a entidade no BD
async function BuildTable(type)
{
    const result = await GetValuesFromDB(type, "all");

    let inner = ``;
    loop = 0;

    result.forEach(element => {
        switch(type)
        {
            case `produto`:
                if(element.user_cad == document.getElementById("current-user").value)
                {
                    if(loop == 0) {inner = `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">ID</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Código</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Descrição</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-32">Marca</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-32">Tipo</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Min</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Max</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-32">UnMe</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Inclusão</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Remover</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Editar</div></div>`; loop++}
                    
                    inner += `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-100 to-slate-300 font-thin text-sm text-black rounded-md w-20 overflow-x-auto">${element.id}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-100 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.cod_material}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-100 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.desc_prod}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-100 to-slate-300 font-thin text-sm text-black rounded-md w-32 overflow-x-auto">${element.marca_prod}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-100 to-slate-300 font-thin text-sm text-black rounded-md w-32 overflow-x-auto">${element.id_tipo}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-100 to-slate-300 font-thin text-sm text-black rounded-md w-20 overflow-x-auto">${element.estoque_min}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-100 to-slate-300 font-thin text-sm text-black rounded-md w-20 overflow-x-auto">${element.estoque_max}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-100 to-slate-300 font-thin text-sm text-black rounded-md w-32 overflow-x-auto">${element.id_unme}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-100 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.data_incl}</div><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="RemoveElement('produto', ${element.id})">Remover</button><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="FillFormProduto('${element.desc_prod}', '${element.marca_prod}', ${element.estoque_min}, ${element.estoque_max}, '${element.data_incl}', '${element.cod_material}', ${element.id})">Editar</button></div>`
                }
                break;
            case `unme`:
                if(element.user_cad == document.getElementById("current-user").value)
                {
                    if(loop == 0){inner = `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">ID</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Descrição</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Sigla</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Remover</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Editar</div></div>`; loop++}
                    
                    inner += `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-100 to-slate-300 font-thin text-sm text-black rounded-md w-20 overflow-x-auto">${element.id_unme}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-100 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.des_unidade}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-100 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.unid_sigla}</div><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="RemoveElement('unme', ${element.id_unme})">Remover</button><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="FillFormUnidade('${element.unid_sigla}', '${element.des_unidade}', ${element.id_unme})">Editar</button></div>`
                }
                break;
            case `tipoprod`:
                if(element.user_cad == document.getElementById("current-user").value)
                {
                    if(loop == 0){inner = `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">ID</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Segmento</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Validade</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-32">Mov. Estoque</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-32">UEPS/PEPS</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Remover</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Editar</div></div>`; loop++}

                    inner += `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-100 to-slate-300 font-thin text-sm text-black rounded-md w-20 overflow-x-auto">${element.id_tipo}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-100 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.segmento}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-100 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.sta_controla_val}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-100 to-slate-300 font-thin text-sm text-black rounded-md w-32 overflow-x-auto">${element.sta_mov_estoque}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-100 to-slate-300 font-thin text-sm text-black rounded-md w-32 overflow-x-auto">${element.ueps_peps}</div><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="RemoveElement('tipoprod', ${element.id_tipo})">Remover</button><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="FillFormTipoProduto('${element.segmento}', '${element.sta_controla_val}', '${element.sta_mov_estoque}', '${ueps_peps}', ${element.id_tipo})">Editar</button></div>`
                }
                break;
        }
    })

    document.getElementById("content-table").innerHTML = inner;
}

//Consome API para recuperar dados do BD
//Parâmetro 'type' se refere a entidade no BD, parâmetro 'key' se refere a chave, pois pode ser feita uma busca por id ou por todas as ocorrências
async function GetValuesFromDB(type, key)
{
    return await fetch(`http://localhost:776/${type}/${key}`).then(answer =>{
        return answer.json();
    })
} 

//Registra no BD os dados informados no formulário HTML
//Parâmetro 'type' se refere a entidade no BD
async function SubmitForm(type)
{
    const action = document.getElementById("entity-id").value != "" ? "PUT" : "POST"; 
    let body;
    switch (type)
    {
        case "produto":
            body = await CreateProduto();
            break;
        case "unme":
            body = await CreateUnidade();
            break;
        case "tipoprod":
            body = await CreateTipoProduto();
            break;
    }
    await CallAPI(type, body, action);
    BuildTable(type);
    ResetForm(type);
}

//Insere o id da ocorrência no elemento HTML "entity-id". A segunda função retorna o valor a nulo
//Parâmetro 'id' se refere ao id da ocorrência
async function InsertID(id)
{
    document.getElementById("entity-id").value = id;
}

//Consome API para remover um elemento do BD
//Parâmetro 'type' se refere a entidade no BD, parâmetro 'id' se refere a uma ocorrência específica dessa entidade
async function RemoveElement(type, id)
{
    InsertID(id);
    CallAPI(type, `{"id": ${id}}`, "DELETE");
    BuildTable(type);
    InsertID("");
}

//Consome API com rotas POST, PUT ou DELETE
//Parâmetro 'type' se refere a entidade no BD, parâmetro 'body' se refere ao corpo da request, parâmetro 'action' se refere ao método a ser utilizado
async function CallAPI(type, body, action)
{
    const route = action == "POST" ? `http://localhost:776/${type}` : `http://localhost:776/${type}/${document.getElementById("entity-id").value}`

    console.log(JSON.stringify(body));
    console.log(route);
    const produto = await fetch(route, {
        method: action,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    }).then(answer =>
        {
            console.log(action);
        }).catch(error => 
            {
            alert("Operação falhou")
            })
}

//Apaga todas as entradas no formulário HTML
//Parâmetro 'type' se refere a entidade no BD
async function ResetForm(type)
{
    switch(type)
    {
        case "produto":
            document.getElementById("desc-prod").value = "";
            document.getElementById("marca-prod").value = "";
            document.getElementById("min").value = "";
            document.getElementById("max").value = "";
            document.getElementById("data-inclusao").value = "";
            document.getElementById("codigo-mat").value = "";
            break;
        case "unme":
            document.getElementById("des-unidade").value = "";
            document.getElementById("unid-sigla").value = "";
            break;
        case "tipoprod":
            document.getElementById("segmento").value = "";
            document.getElementById("sta_controla_val").value = "";
            document.getElementById("sta_mov_estoque").value = "";
            document.getElementById("ueps_peps").value = "";
    }
    document.getElementById("entity-id").value = "";    
}

// -- Produto Start -- //
//Monta a tela HTML para produto, incluindo formulário e tabela
async function Produto()
{
    document.getElementById("display").innerHTML = `<div class="flex flex-row items-center justify-between text-2xl text-center w-full bg-blue-700 p-2 rounded-t-md shadow-md"><p id="title">Produto</p></div><form id="form h-full"><div class="flex flex-col w-full bg-blue-600 p-2 rounded-md space-y-2"><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Descrição</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" placeholder="Descrição" id="desc-prod" type="text"></div><div class="flex flex-col space-y-1 w-full"><p>Marca</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" placeholder="Marca" id="marca-prod" type="text"></div></div><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Tipo de Produto</p><select name="tipo-prod" id="tipo-prod" class="w-full rounded-md p-2 text-black"></select></div><div class="flex flex-col space-y-1 w-full"><p>Estoque Mínimo</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="min" type="number" min="0"></div><div class="flex flex-col space-y-1 w-full"><p>Estoque Máximo</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="max" type="number" min="0"></div></div><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Unidade de Medida</p><select name="unme" id="unme" class="w-full rounded-md p-2 text-black"></select></div><div class="flex flex-col space-y-1 w-full"><p>Data de Inclusão</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="data-inclusao" type="date"></div><div class="flex flex-col space-y-1 w-full"><p>Código do Material</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="codigo-mat" type="text" placeholder="Código"></div></div></div></form><button class="rounded-md bg-white text-black w-[30%] hover:bg-slate-300 duration-200 p-2" onclick="SubmitForm('produto')">Registrar</button><div id="content-table" class="flex flex-col space-y-1 h-full overflow-y-auto"div>`
    await BuildTable("produto");
    await GetEntityForSelect("tipoprod", "tipo-prod");
    await GetEntityForSelect("unme", "unme");
}

//Cria um objeto com todos os parâmetros da entidade produto
async function CreateProduto()
{
    user_cad =  document.getElementById("current-user").value;
    desc_prod =  document.getElementById("desc-prod").value;
    marca_prod =  document.getElementById("marca-prod").value;
    id_tipo =  Number(document.getElementById("tipo-prod").value);
    estoque_min =  Number(document.getElementById("min").value);
    estoque_max =  Number(document.getElementById("max").value);
    id_unme =  Number(document.getElementById("unme").value);
    data_incl =  document.getElementById("data-inclusao").value;
    cod_material =  document.getElementById("codigo-mat").value;
    sta_ativo =  "true";
    data_cad =  (Date.now()).toString();

    return {cod_material, desc_prod, marca_prod, id_tipo, sta_ativo, estoque_min, estoque_max, id_unme, data_incl, user_cad, data_cad};
}

//Preenche formulário com parâmetros da entidade produto
//Parâmetro 'id' se refere a ocorrência da entidade no BD
async function FillFormProduto(desc_prod, marca_prod, estoque_min, estoque_max, data_incl, cod_material, id)
{
    document.getElementById("desc-prod").value = desc_prod;
    document.getElementById("marca-prod").value = marca_prod;
    document.getElementById("min").value = estoque_min;
    document.getElementById("max").value = estoque_max;
    document.getElementById("data-inclusao").value = data_incl;
    document.getElementById("codigo-mat").value = cod_material;
    InsertID(id);
}
// -- Produto End -- //

// -- Unidade de Medida Start -- //
//Monta a tela HTML para unidade de medida, incluindo formulário e tabela
async function UnidadeMedida()
{
    document.getElementById("display").innerHTML = `<div class="flex flex-row items-center justify-between text-2xl text-center w-full bg-blue-700 p-2 rounded-t-md shadow-md"><p id="title">Unidade de Medida</p></div><form id="form h-full"><div class="flex flex-col w-full bg-blue-600 p-2 rounded-md space-y-2"><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Descrição</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" placeholder="Descrição" id="des-unidade" type="text"></div><div class="flex flex-col space-y-1 w-full"><p>Sigla</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" placeholder="Sigla" id="unid-sigla" type="text"></div></div></div></form><button class="rounded-md bg-white text-black w-[30%] hover:bg-slate-300 duration-200 p-2" onclick="SubmitForm('unme')">Registrar</button><div id="content-table" class="flex flex-col space-y-1 h-full overflow-y-auto"div>`
    await BuildTable("unme");
}

//Cria um objeto com todos os parâmetros da entidade unidade de medida
async function CreateUnidade()
{
    user_cad =  document.getElementById("current-user").value;
    des_unidade = document.getElementById("des-unidade").value;
    unid_sigla = document.getElementById("unid-sigla").value;
    data_cad =  (Date.now()).toString();

    return {des_unidade, unid_sigla, user_cad, data_cad};
}

//Preenche formulário com parâmetros da entidade unidade de medida
//Parâmetro 'id' se refere a ocorrência da entidade no BD
async function FillFormUnidade(des_unidade, unid_sigla, id)
{
    document.getElementById("des-unidade").value = des_unidade;
    document.getElementById("unid-sigla").value = unid_sigla;
    InsertID(id);
}
// -- Unidade de Medida End -- //

// -- Tipo de Produto Start -- //
//Monta a tela HTML para tipo de produto, incluindo formulário e tabela
async function TipoProduto()
{
    document.getElementById("display").innerHTML = `<div class="flex flex-row items-center justify-between text-2xl text-center w-full bg-blue-700 p-2 rounded-t-md shadow-md"><p id="title">Tipo de Produto</p></div><form id="form h-full"><div class="flex flex-col w-full bg-blue-600 p-2 rounded-md space-y-2"><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Segmento</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" placeholder="Segmento" id="segmento" type="text"></div></div><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Controla Validade</p><select name="sta_controla_val" id="sta_controla_val" class="w-full rounded-md p-2 text-black"><option value="Sim">Sim</option><option value="Não">Não</option></select></div><div class="flex flex-col space-y-1 w-full"><p>Movimenta Estoque</p><select name="sta_mov_estoque" id="sta_mov_estoque" class="w-full rounded-md p-2 text-black"><option value="Sim">Sim</option><option value="Não">Não</option></select></div><div class="flex flex-col space-y-1 w-full"><p>UEPS ou PEPS</p><select name="ueps_peps" id="ueps_peps" class="w-full rounded-md p-2 text-black"><option value="UEPS">UEPS</option><option value="PEPS">PEPS</option></select></div></div></div></form><button class="rounded-md bg-white text-black w-[30%] hover:bg-slate-300 duration-200 p-2" onclick="SubmitForm('tipoprod')">Registrar</button><div id="content-table" class="flex flex-col space-y-1 h-full overflow-y-auto"div>`
    await BuildTable("tipoprod");
}

//Cria um objeto com todos os parâmetros da entidade tipo de produto
async function CreateTipoProduto()
{
    user_cad = document.getElementById("current-user").value;
    segmento = document.getElementById("segmento").value;
    sta_controla_val = document.getElementById("sta_controla_val").value;
    sta_mov_estoque = document.getElementById("sta_mov_estoque").value;
    ueps_peps = document.getElementById("ueps_peps").value;
    data_cad = (Date.now()).toString();

    return {segmento, sta_controla_val, sta_mov_estoque, ueps_peps, user_cad, data_cad};
}

//Preenche formulário com parâmetros da entidade tipo de produto
//Parâmetro 'id' se refere a ocorrência da entidade no BD
async function FillFormTipoProduto(segmento, sta_controla_val, sta_mov_estoque, ueps_peps ,id)
{
    document.getElementById("segmento").value = segmento;
    document.getElementById("sta_controla_val").value = sta_controla_val;
    document.getElementById("sta_mov_estoque").value = sta_mov_estoque;
    document.getElementById("ueps_peps").value = ueps_peps;
    InsertID(id);
}
// -- Tipo de Produto End -- //