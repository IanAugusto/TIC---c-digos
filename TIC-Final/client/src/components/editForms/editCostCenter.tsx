import CheckboxComponent from "../checkbox";
import { useState, useEffect } from "react"
import { useCookies } from 'react-cookie' // hook para manipular cookies

interface CreateModalProps {
    closeModal: () => void;
}

interface declareCostCenter{
    ID: number,
    DES_CENTRO_CUSTO:string,
    STA_ATIVO:string,
    SIGLA:string,
    DATA_INICIAL:Date,
    DATA_FINAL:Date,
    OBSERVACOES:string
}

export default function EditCostCenter({ closeModal }: CreateModalProps) {

    const setOpen = () => {
        closeModal();
    }

    const handleReloadClick = () => {
        window.location.reload();
      };

      //pega a data atual
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const currenteDate = `${year}-${month}-${day}`

      //cookie
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO','ID', 'ID_CENTRO'])
    const User_cad = cookie.ID
    const id_do_centro = cookie.ID_CENTRO


    const [cost, setcost] = useState<declareCostCenter[]>([])

    const [ID, setID] = useState(0)
    const [DES_CENTRO_CUSTO, setDesc] = useState('')
    const [STA_ATIVO, setSta] = useState('')
    const [SIGLA, setSigla] = useState('')
    const [DATA_INICIAL, setDataIni] = useState('')
    const [DATA_FINAL, setDataF] = useState('')
    const [OBSERVACOES, setObs] = useState('')



    /*função para criar o centro de custos */

    const registerCost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // evita que a página seja recarregada
        // monta o objeto centro de custo
        let costs
          costs = {
            DES_CENTRO_CUSTO,
            STA_ATIVO,
            SIGLA,
            DATA_INICIAL,
            DATA_FINAL,
            OBSERVACOES
          }

        let url
        let verb

          url = `http://localhost:3333/api/centro_custo/${id_do_centro}`
          verb = 'PUT'
    
        try {
          // chamar a API para cadastrar o centro de custo
          console.log(url)
          console.log(verb)
          const createdCost = await fetch(url, {
            method: verb,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(costs)
          })
          .then ( resp => { // quando o servidor respondeu
            return resp.json() // transforma em json
          })
           // atualiza a lista de centro de custos
        setcost([...cost, createdCost])
        handleReloadClick()
        eliminaCookie()

      } catch(error) {
        console.log(error)
      }
    }
    const editar = useEffect(() => {

        if(Number(id_do_centro) != 0)
        {
            if(id_do_centro != undefined){
                const findobj = async () => {
                    try {
                        const answer = await fetch(`http://localhost:3333/api/centro_custo/${id_do_centro}`)
                        const obj = await answer.json();
                        if(answer.ok)
                        {               
                            setID(Number(obj.ID))  
                            setDesc(obj.DES_CENTRO_CUSTO);
                            setSta(obj.STA_ATIVO);
                            setSigla(obj.SIGLA);
                            setDataIni(obj.DATA_INICIAL);
                            setDataF(obj.DATA_FINAL);
                            setObs(obj.OBSERVACOES);

                        }
                        else
                        {
                            alert(`Falha em trazer informações do objeto`)
                        }
                    }
                    catch (error)
                    {
                        alert(`Erro: ${error}`)
                    }
                }
                findobj();
            }
            //Busca API pra preencher os dados do objeto a ser editado

        }
    
}, [])

function eliminaCookie() {
    // remove o cookie ID_CENTRO
    removeCookie('ID_CENTRO')
}

    

    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={registerCost}>

            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Cadastre um Centro de Custo</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Apenas o Admin. possui essa permissão.
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                        <div className="sm:col-span-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Descrição
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="text"
                                    id="description"
                                    value={DES_CENTRO_CUSTO}
                                    onChange={ (e) => setDesc(e.target.value) } 
                                    autoComplete="text"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <div className="mt-1">
                                <div className="relative flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="ativo"
                                            name="ativo"
                                            type="checkbox"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                            value={STA_ATIVO}
                                            onChange={ (e) => {
                                                const value = e.target.checked ? 'S' : 'N';
                                                setSta(value) } 
                                            }                                        
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="admin" className="font-medium text-gray-700">
                                            Ativo
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="sigla" className="block text-sm font-medium text-gray-700">
                                Sigla
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="text"
                                    id="sigla"
                                    value={SIGLA}
                                    onChange={ (e) => setSigla(e.target.value) } 
                                    autoComplete="text"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                       <div className="sm:col-span-4">
                            <label htmlFor="initial-date" className="block text-sm font-medium text-gray-700">
                                Data inicial
                            </label>
                            <div className="mt-1">
                                <input
                                    type="date"
                                    name="number"
                                    id="initial-date"
                                    value={DATA_INICIAL}
                                    onChange={ (e) => setDataIni(e.target.value) } 
                                    autoComplete="number"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="final-date" className="block text-sm font-medium text-gray-700">
                                Data final
                            </label>
                            <div className="mt-1">
                                <input
                                    type="date"
                                    name="number"
                                    id="final-date"
                                    value={DATA_FINAL}
                                    onChange={ (e) => setDataF(e.target.value) } 
                                    autoComplete="number"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div> 

                        <div className="sm:col-span-4">
                            <label htmlFor="observation" className="block text-sm font-medium text-gray-700">
                                Observação
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="text"
                                    id="observation"
                                    value={OBSERVACOES}
                                    onChange={ (e) => setObs(e.target.value) } 
                                    autoComplete="text"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={setOpen}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={setOpen}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}