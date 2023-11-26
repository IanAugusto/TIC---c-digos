import CheckboxComponent from "../checkbox";
import { useState, useEffect } from "react"
import { useCookies } from 'react-cookie' // hook para manipular cookies

interface CreateModalProps {
    closeModal: () => void;
}

interface declareRevenue{
    ID: number,
    ATIVO: string,
    DESCRICAO: string,
    OBSERVACAO: string,
    USER_CAD: number,
    DATA_CAD: Date
}

export default function createRevenueSource({ closeModal }: CreateModalProps) {

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
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO','ID'])
    const User_cad = cookie.ID


    const [revenues, setRevenues] = useState<declareRevenue[]>([])


    const [ATIVO, setAtivo] = useState('')
    const [DESCRICAO, setDes] = useState('')
    const [OBSERVACAO, setObs] = useState('')
    const [USER_CAD, setUser] = useState(0)
    const [DATA_CAD, setData] = useState('')
 

    /*função para criar o origem receita */

    const registerOrigem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // evita que a página seja recarregada
        // monta o objeto origem receita
        let origem
          origem = {
            ATIVO,
            DESCRICAO,
            OBSERVACAO,
            USER_CAD: User_cad,
            DATA_CAD: currenteDate
          }

        let url
        let verb

          url = `http://localhost:3333/api/origem_receita`
          verb = 'POST'
    
        try {
          // chamar a API para cadastrar origem receita
          console.log(url)
          console.log(verb)
          const createdOrigem = await fetch(url, {
            method: verb,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(origem)
          })
          .then ( resp => { // quando o servidor respondeu
            return resp.json() // transforma em json
          })
           // atualiza a lista de centro de custos
        setRevenues([...revenues, createdOrigem])
        handleReloadClick()

      } catch(error) {
        console.log(error)
      }
    }


    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={registerOrigem}>

            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Cadastre uma Origem de Receita</h3>
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
                                    value={DESCRICAO}
                                    onChange={ (e) => setDes(e.target.value) } 
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
                                            value={ATIVO}
                                            onChange={ (e) => {
                                                const value = e.target.checked ? 'S' : 'N';
                                                setAtivo(value) } 
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
                            <label htmlFor="observation" className="block text-sm font-medium text-gray-700">
                                Observação
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="text"
                                    id="observation"
                                    value={OBSERVACAO}
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