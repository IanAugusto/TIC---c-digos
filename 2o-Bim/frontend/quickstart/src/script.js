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

//Efetua cadastro de usuário
async function Registrar()
{
    const user = await fetch(`http://localhost:776/login/${document.getElementById("username").value}/${document.getElementById("password").value}`, {
        method: "POST",
    }).then(answer =>
        {
            alert("Usuário Cadstrado");
        }).catch(error => 
            {
            alert("Operação falhou")
            })
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
            case 'fornecedor':
                inner += `<option value = "${element.id_fornecedor}">${element.nome_fantasia}</option>`
                break;
            case 'produto':
                inner += `<option value = "${element.id}">${element.desc_prod}</option>`
                break;
            case 'tipomov':
                inner += `<option value = "${element.id_tipo_mov}">${element.desc_tipo_mov}</option>`
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
                    if(loop == 0) {inner = `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">ID</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Código</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Descrição</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-32">Marca</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-32">Tipo</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Min</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Max</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-32">UnMe</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Inclusão</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Remover</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Editar</div></div>`; loop++}
                    
                    inner += `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-20 overflow-x-auto">${element.id}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.cod_material}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.desc_prod}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-32 overflow-x-auto">${element.marca_prod}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-32 overflow-x-auto">${element.id_tipo}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-20 overflow-x-auto">${element.estoque_min}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-20 overflow-x-auto">${element.estoque_max}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-32 overflow-x-auto">${element.id_unme}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.data_incl}</div><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="RemoveElement('produto', ${element.id})">Remover</button><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="FillFormProduto('${element.desc_prod}', '${element.marca_prod}', ${element.estoque_min}, ${element.estoque_max}, '${element.data_incl}', '${element.cod_material}', ${element.id})">Editar</button></div>`
                break;
            case `unme`:

                    if(loop == 0){inner = `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">ID</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Descrição</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Sigla</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Remover</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Editar</div></div>`; loop++}
                    
                    inner += `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-20 overflow-x-auto">${element.id_unme}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.des_unidade}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.unid_sigla}</div><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="RemoveElement('unme', ${element.id_unme})">Remover</button><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="FillFormUnidade('${element.unid_sigla}', '${element.des_unidade}', ${element.id_unme})">Editar</button></div>`
                
                break;
            case `tipoprod`:

                    if(loop == 0){inner = `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">ID</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Segmento</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Validade</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-32">Mov. Estoque</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-32">UEPS/PEPS</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Remover</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Editar</div></div>`; loop++}

                    inner += `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-20 overflow-x-auto">${element.id_tipo}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.segmento}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.sta_controla_val}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-32 overflow-x-auto">${element.sta_mov_estoque}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-32 overflow-x-auto">${element.ueps_peps}</div><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="RemoveElement('tipoprod', ${element.id_tipo})">Remover</button><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="FillFormTipoProduto('${element.segmento}', '${element.sta_controla_val}', '${element.sta_mov_estoque}', '${ueps_peps}', ${element.id_tipo})">Editar</button></div>`
                
                break;
            case `fornecedor`:
                if(loop == 0) {inner = `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">ID</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Nome Pessoa</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Nome Fantasia</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Documento</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Email</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Atividade</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Telefone</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Prazo</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">NFE</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Inscrição</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Website</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Remover</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Editar</div></div>`; loop++}
                
                inner += `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.id_fornecedor}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.nome_pessoa}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.nome_fantasia}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.num_cpf}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.email}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.ramo_atividade}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.fone}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.prazo_entrega}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.sta_possui_nfe}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.num_insc_estatual}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.website}</div><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="RemoveElement('fornecedor', ${element.id_fornecedor})">Remover</button><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="FillFormFornecedor('${element.nome_pessoa}', '${element.nome_fantasia}', '${element.num_cpf}', '${element.email}', '${element.ramo_atividade}', '${element.fone}', '${element.prazo_entrega}', '${element.sta_possui_nfe}', '${element.num_insc_estatual}', '${element.website}', ${element.id_fornecedor})">Editar</button></div>`                
                break;
            case `fornprod`:
                if(loop == 0){inner = `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">ID</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">ID Produto</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">ID Fornecedor</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Remover</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Editar</div></div>`; loop++}
                
                inner += `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-20 overflow-x-auto">${element.id_fornprod}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.id_produto}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.id_fornecedor}</div><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="RemoveElement('fornprod', ${element.id_fornprod})">Remover</button><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="FillFormUnidade('${element.id_fornecedor}', '${element.id_produto}', ${element.id_unme})">Editar</button></div>`
                break;
            case `tipomov`:
                if(loop == 0){inner = `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">ID</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Descrição</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">Observação</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Remover</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Editar</div></div>`; loop++}
                
                inner += `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-20 overflow-x-auto">${element.id_tipo_mov}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.desc_tipo_mov}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.desc_obs}</div><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="RemoveElement('tipomov', ${element.id_tipo_mov})">Remover</button><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="FillFormTipoMovimento('${element.desc_tipo_mov}', '${element.desc_obs}', ${element.id_tipo_mov})">Editar</button></div>`
                break;
            case `mov`:

                    if(loop == 0) {inner = `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">ID</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">ID Produto</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-40">E/S</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-32">Data</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-32">ID Tipo</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Qtde</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Valor/un</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-32">Valor Total</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Remover</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-600 to-slate-800 font-normal text-sm text-white rounded-md w-20">Editar</div></div>`; loop++}
                    
                    inner += `<div class="flex flex-row space-x-1"><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-20 overflow-x-auto">${element.id_mov}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.id_produto}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-40 overflow-x-auto">${element.es}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-32 overflow-x-auto">${element.data_movto}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-32 overflow-x-auto">${element.tipo_movto}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-20 overflow-x-auto">${element.qtd}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-20 overflow-x-auto">${element.valor}</div><div class="flex items-center justify-center p-2 bg-gradient-to-br from-slate-200 to-slate-300 font-thin text-sm text-black rounded-md w-32 overflow-x-auto">${element.valor_total}</div><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="RemoveElement('mov', ${element.id_mov})">Remover</button><button class="flex items-center justify-center p-2 bg-slate-100 hover:bg-slate-300 duration-200 font-thin text-sm text-black rounded-md w-20" onclick="FillFormMovimento(${element.id_produto}, '${element.es}', '${element.data_movto}', ${element.tipo_movto}, ${element.qtd}, ${element.valor}, ${element.id_mov})">Editar</button></div>`
                
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
        case "fornecedor":
            body = await CreateFornecedor();
            break;
        case "fornprod":
            body = await CreateAssociacao();
            break;
        case "tipomov":
            body = await CreateTipoMovimento();
            break;
        case "mov":
            body = await CreateMovimento();
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
    await CallAPI(type, `{"id": ${id}}`, "DELETE");
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
            break;
        case "fornecedor":
            document.getElementById("pessoa").value = "";
            document.getElementById("nome_pessoa").value = "";
            document.getElementById("email").value = "";
            document.getElementById("nome_fantasia").value = ""; 
            document.getElementById("ramo_atividade").value = ""; 
            document.getElementById("fone").value = "";  
            document.getElementById("website").value = ""; 
            document.getElementById("num_insc_estatual").value = ""; 
            document.getElementById("prazo_entrega").value = 0;
            break;
        case "tipomov":
            document.getElementById("desc_tipo_mov").value = "";
            document.getElementById("desc_obs").value = "";
            break;
        case "mov":
            document.getElementById("id_produto").value = 0;
            document.getElementById("tipo_movto").value = 0;
            document.getElementById("es").value = "";
            document.getElementById("data_movto").value = "";
            document.getElementById("qtd").value = 0;
            document.getElementById("valor").value = 0;
            
    }
    document.getElementById("entity-id").value = "";    
}

// -- Produto Start -- //
//Monta a tela HTML para produto, incluindo formulário e tabela
async function Produto()
{
    document.getElementById("display").innerHTML = `<div class="flex flex-row items-center justify-between text-2xl text-center w-full bg-blue-700 p-2 rounded-t-md shadow-md"><p id="title">Produto</p></div><form id="form h-full"><div class="flex flex-col w-full bg-blue-600 p-2 rounded-md space-y-2"><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Descrição</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" placeholder="Descrição" id="desc-prod" type="text"></div><div class="flex flex-col space-y-1 w-full"><p>Marca</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" placeholder="Marca" id="marca-prod" type="text"></div></div><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Tipo de Produto</p><select name="tipo-prod" id="tipo-prod" class="w-full rounded-md p-2 text-black"></select></div><div class="flex flex-col space-y-1 w-full"><p>Estoque Mínimo</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="min" type="number" min="0"></div><div class="flex flex-col space-y-1 w-full"><p>Estoque Máximo</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="max" type="number" min="0"></div></div><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Unidade de Medida</p><select name="unme" id="unme" class="w-full rounded-md p-2 text-black"></select></div><div class="flex flex-col space-y-1 w-full"><p>Data de Inclusão</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="data-inclusao" type="date"></div><div class="flex flex-col space-y-1 w-full"><p>Código do Material</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="codigo-mat" type="text" placeholder="Código"></div></div></div></form><button class="rounded-md bg-slate-500 w-[30%] hover:bg-slate-600 shadow-lg duration-200 p-2" onclick="SubmitForm('produto')">Registrar</button><div id="content-table" class="flex flex-col space-y-1 h-full overflow-y-auto rounded-xl bg-slate-500 p-3">`
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
    document.getElementById("display").innerHTML = `<div class="flex flex-row items-center justify-between text-2xl text-center w-full bg-blue-700 p-2 rounded-t-md shadow-md"><p id="title">Unidade de Medida</p></div><form id="form h-full"><div class="flex flex-col w-full bg-blue-600 p-2 rounded-md space-y-2"><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Descrição</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" placeholder="Descrição" id="des-unidade" type="text"></div><div class="flex flex-col space-y-1 w-full"><p>Sigla</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" placeholder="Sigla" id="unid-sigla" type="text"></div></div></div></form><button class="rounded-md bg-slate-500 w-[30%] hover:bg-slate-600 shadow-lg duration-200 p-2" onclick="SubmitForm('unme')">Registrar</button><div id="content-table" class="flex flex-col space-y-1 h-full overflow-y-auto rounded-xl bg-slate-500 p-3">`
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
    document.getElementById("display").innerHTML = `<div class="flex flex-row items-center justify-between text-2xl text-center w-full bg-blue-700 p-2 rounded-t-md shadow-md"><p id="title">Tipo de Produto</p></div><form id="form h-full"><div class="flex flex-col w-full bg-blue-600 p-2 rounded-md space-y-2"><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Segmento</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" placeholder="Segmento" id="segmento" type="text"></div></div><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Controla Validade</p><select name="sta_controla_val" id="sta_controla_val" class="w-full rounded-md p-2 text-black"><option value="Sim">Sim</option><option value="Não">Não</option></select></div><div class="flex flex-col space-y-1 w-full"><p>Movimenta Estoque</p><select name="sta_mov_estoque" id="sta_mov_estoque" class="w-full rounded-md p-2 text-black"><option value="Sim">Sim</option><option value="Não">Não</option></select></div><div class="flex flex-col space-y-1 w-full"><p>UEPS ou PEPS</p><select name="ueps_peps" id="ueps_peps" class="w-full rounded-md p-2 text-black"><option value="UEPS">UEPS</option><option value="PEPS">PEPS</option></select></div></div></div></form><button class="rounded-md bg-slate-500 w-[30%] hover:bg-slate-600 shadow-lg duration-200 p-2" onclick="SubmitForm('tipoprod')">Registrar</button><div id="content-table" class="flex flex-col space-y-1 h-full overflow-y-auto rounded-xl bg-slate-500 p-3">`
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

// -- Fornecedor Start -- //
//Monta a tela HTML para fornecedor, incluindo formulário e tabela
async function Fornecedor()
{
    document.getElementById("display").innerHTML = `<div class="flex flex-row items-center justify-between text-2xl text-center w-full bg-blue-700 p-2 rounded-t-md shadow-md"><p id="title">Fornecedor</p></div><form id="form h-full"><div class="flex flex-col w-full bg-blue-600 p-2 rounded-md space-y-2"><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Nome do Fornecedor</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" placeholder="Nome" id="nome_pessoa" type="text"></div><div class="flex flex-col space-y-1 w-full"><p>E-mail</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" placeholder="E-mail" id="email" type="text"></div></div><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>CPF ou CNPJ</p><select name="pessoa" id="pessoa" class="w-full rounded-md p-2 text-black"><option value="true">CPF</option><option value="false">CNPJ</option></select></div><div class="flex flex-col space-y-1 w-full"><p>Documento</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="num_cpf" placeholder="Documento" type="text"></div><div class="flex flex-col space-y-1 w-full"><p>Telefone</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="fone" placeholder="Telefone" type="text"></div></div><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Possui NFE?</p><select name="sta_possui_nfe" id="sta_possui_nfe" class="w-full rounded-md p-2 text-black"><option value="Sim">Sim</option><option value="Não">Não</option></select></div><div class="flex flex-col space-y-1 w-full"><p>Website</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="website" placeholder="Website" type="text"></div><div class="flex flex-col space-y-1 w-full"><p>Nome Fantasia</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="nome_fantasia" type="text" placeholder="Nome Fantasia"></div></div><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Ramo de Atividade</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="ramo_atividade" type="text" placeholder="Ramo de Atividade"></div><div class="flex flex-col space-y-1 w-full"><p>Inscrição Estatual</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="num_insc_estatual" placeholder="Inscrição" type="text"></div><div class="flex flex-col space-y-1 w-full"><p>Prazo de Entrega</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="prazo_entrega" type="number" min="0"></div></div></div></form><button class="rounded-md bg-slate-500 w-[30%] hover:bg-slate-600 shadow-lg duration-200 p-2" onclick="SubmitForm('fornecedor')">Registrar</button><div id="content-table" class="flex flex-col space-y-1 h-full overflow-y-auto rounded-xl bg-slate-500 p-3">`
    await BuildTable("fornecedor");
}

//Cria um objeto com todos os parâmetros da entidade fornecedor
async function CreateFornecedor()
{
    pessoa = (Boolean)(document.getElementById("pessoa").value);
    nome_pessoa = document.getElementById("nome_pessoa").value;
    num_cpf = document.getElementById("num_cpf").value;
    email = document.getElementById("email").value;
    nome_fantasia = document.getElementById("nome_fantasia").value; 
    ramo_atividade = document.getElementById("ramo_atividade").value; 
    fone = document.getElementById("fone").value; 
    sta_possui_nfe = document.getElementById("sta_possui_nfe").value; 
    website = document.getElementById("website").value; 
    num_insc_estatual = document.getElementById("num_insc_estatual").value; 
    prazo_entrega = (Number)(document.getElementById("prazo_entrega").value); 
    data_cadastro =  (Date.now()).toString();

    return {pessoa, nome_pessoa, num_cpf, email, nome_fantasia, ramo_atividade, fone, sta_possui_nfe, website, num_insc_estatual, prazo_entrega, data_cadastro};
}

//Preenche formulário com parâmetros da entidade fornecedor
//Parâmetro 'id' se refere a ocorrência da entidade no BD
async function FillFormFornecedor(nome_pessoa, nome_fantasia, num_cpf, email, ramo_atividade, fone, prazo_entrega, sta_possui_nfe, num_insc_estatual, website, id)
{
    document.getElementById("nome_pessoa").value = nome_pessoa;
    document.getElementById("nome_fantasia").value = nome_fantasia;
    document.getElementById("num_cpf").value = num_cpf;
    document.getElementById("email").value = email;
    document.getElementById("ramo_atividade").value = ramo_atividade;
    document.getElementById("fone").value = fone;
    document.getElementById("prazo_entrega").value = prazo_entrega;
    document.getElementById("sta_possui_nfe").value = sta_possui_nfe;
    document.getElementById("num_insc_estatual").value = num_insc_estatual;
    document.getElementById("website").value = website;
    InsertID(id);
}
// -- Fornecedor End -- //

// -- Associação Start -- //
//Monta a tela HTML para associação, incluindo formulário e tabela
async function Associacao()
{
    document.getElementById("display").innerHTML = `<div class="flex flex-row items-center justify-between text-2xl text-center w-full bg-blue-700 p-2 rounded-t-md shadow-md"><p id="title">Associação</p></div><form id="form h-full"><div class="flex flex-col w-full bg-blue-600 p-2 rounded-md space-y-2"><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Produto</p><select name="produto" id="produto" class="w-full rounded-md p-2 text-black"></select></div><div class="flex flex-col space-y-1 w-full"><p>Fornecedor</p><select name="fornecedor" id="fornecedor" class="w-full rounded-md p-2 text-black"></select></div></div></div></div></form><button class="rounded-md bg-slate-500 w-[30%] hover:bg-slate-600 shadow-lg duration-200 p-2" onclick="SubmitForm('fornprod')">Registrar</button><div id="content-table" class="flex flex-col space-y-1 h-full overflow-y-auto rounded-xl bg-slate-500 p-3">`
    await BuildTable("fornprod");
    await GetEntityForSelect("produto", "produto");
    await GetEntityForSelect("fornecedor", "fornecedor");
}

//Cria um objeto com todos os parâmetros da entidade associação
async function CreateAssociacao()
{
    id_fornecedor = (Number)(document.getElementById("fornecedor").value);
    id_produto = (Number)(document.getElementById("produto").value);

    return {id_fornecedor, id_produto};
}

//Preenche formulário com parâmetros da entidade associação
//Parâmetro 'id' se refere a ocorrência da entidade no BD
async function FillFormAssociacao(id_fornecedor, id_produto, id)
{
    document.getElementById("desc-prod").value = id_fornecedor;
    document.getElementById("marca-prod").value = id_produto;
    InsertID(id);
}
// -- Associação End -- //

// -- Tipo de Movimento Start -- //
//Monta a tela HTML para tipo de movimento, incluindo formulário e tabela
async function TipoMovimento()
{
    document.getElementById("display").innerHTML = `<div class="flex flex-row items-center justify-between text-2xl text-center w-full bg-blue-700 p-2 rounded-t-md shadow-md"><p id="title">Tipo de Movimento</p></div><form id="form h-full"><div class="flex flex-col w-full bg-blue-600 p-2 rounded-md space-y-2"><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Descrição</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" placeholder="Descrição" id="desc_tipo_mov" type="text"></div><div class="flex flex-col space-y-1 w-full"><p>Observação</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" placeholder="Observação" id="desc_obs" type="text"></div></div></div></div></form><button class="rounded-md bg-slate-500 w-[30%] hover:bg-slate-600 shadow-lg duration-200 p-2" onclick="SubmitForm('tipomov')">Registrar</button><div id="content-table" class="flex flex-col space-y-1 h-full overflow-y-auto rounded-xl bg-slate-500 p-3">`
    await BuildTable("tipomov");
}

//Cria um objeto com todos os parâmetros da entidade tipo de movimento
async function CreateTipoMovimento()
{
    desc_tipo_mov = document.getElementById("desc_tipo_mov").value;
    desc_obs = document.getElementById("desc_obs").value;

    return {desc_tipo_mov, desc_obs};
}

//Preenche formulário com parâmetros da entidade tipo de movimento
//Parâmetro 'id' se refere a ocorrência da entidade no BD
async function FillFormTipoMovimento(desc_tipo_mov, desc_obs, id)
{
    document.getElementById("desc_tipo_mov").value = desc_tipo_mov;
    document.getElementById("desc_obs").value = desc_obs;
    InsertID(id);
}
// -- Tipo de Movimento End -- //


// -- Movimento Start -- //
//Monta a tela HTML para movimento, incluindo formulário e tabela
async function Movimento()
{
    document.getElementById("display").innerHTML = `<div class="flex flex-row items-center justify-between text-2xl text-center w-full bg-blue-700 p-2 rounded-t-md shadow-md"><p id="title">Movimentação</p></div><form id="form h-full"><div class="flex flex-col w-full bg-blue-600 p-2 rounded-md space-y-2"><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Produto</p><select name="produto" id="id_produto" class="w-full rounded-md p-2 text-black"></select></div><div class="flex flex-col space-y-1 w-full"><p>Tipo de Movimento</p><select name="tipomov" id="tipo_movto" class="w-full rounded-md p-2 text-black"></select><</div></div><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Entrada/Saída</p><select name="es" id="es" class="w-full rounded-md p-2 text-black"><option value="Entrada">Entrada</option><option value="Saída">Saída</option></select></div><div class="flex flex-col space-y-1 w-full"><p>Data</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="data_movto" type="date"></div><div class="flex flex-col space-y-1 w-full"><p>Quantidade</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="qtd" type="number" min="0"></div></div><div class="flex flex-row w-full space-x-2"><div class="flex flex-col space-y-1 w-full"><p>Valor por Unidade</p><input class="w-full rounded-md focus:outline-none focus:shadow-xl shadow-gray-800 p-2 text-black" id="valor" type="number" min="0"></div></div></div></form><button class="rounded-md bg-slate-500 w-[30%] hover:bg-slate-600 shadow-lg duration-200 p-2" onclick="SubmitForm('mov')">Registrar</button><div id="content-table" class="flex flex-col space-y-1 h-full overflow-y-auto rounded-xl bg-slate-500 p-3">`
    await BuildTable("mov");
    await GetEntityForSelect("produto", "id_produto");
    await GetEntityForSelect("tipomov", "tipo_movto");
}

//Cria um objeto com todos os parâmetros da entidade movimento
async function CreateMovimento()
{
    user_cad = document.getElementById("current-user").value;
    id_produto = (Number)(document.getElementById("id_produto").value);
    tipo_movto = (Number)(document.getElementById("tipo_movto").value);
    es = document.getElementById("es").value;
    data_movto = document.getElementById("data_movto").value;
    qtd = (Number)(document.getElementById("qtd").value);
    valor = (Number)(document.getElementById("valor").value);
    valor_total = qtd * valor;
    data_cad = (Date.now()).toString();

    return {user_cad, id_produto, tipo_movto, es, data_movto, qtd, valor, valor_total, data_cad};
}

//Preenche formulário com parâmetros da entidade movimento
//Parâmetro 'id' se refere a ocorrência da entidade no BD
async function FillFormMovimento(id_produto, tipo_movto, es, data_movto, qtd, valor, id)
{
    document.getElementById("id_produto").value = id_produto;
    document.getElementById("tipo_movto").value = tipo_movto;
    document.getElementById("es").value = es;
    document.getElementById("data_movto").value = data_movto;
    document.getElementById("qtd").value = qtd;
    document.getElementById("valor").value = valor;
    InsertID(id);
}
// -- Movimento End -- //