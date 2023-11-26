import CheckboxComponent from "../checkbox";
import { useState, useEffect } from "react"
import { useCookies } from 'react-cookie' // hook para manipular cookies

interface CreateModalProps {
    closeModal: () => void;
}

interface declareMov{
    ID: number,
    E_S: string,
    ID_CENTRO_CUSTO: number,
    DATA_MOVTO: Date,
    ID_ORIG_RECEITA: number,
    VALOR: number,
    ID_FORN: number,
    ID_PLANO: number,
    OBSERVACAO: string,
    USER_CAD: number,
    DATA_CAD: Date
}


export default function CreateFinantialMovement({ closeModal }: CreateModalProps) {

    const setOpen = () => {
        closeModal();
    }

    const [moves, setMoves] = useState<declareMov[]>([])


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


    const [products, setProducts] = useState<declareMov[]>([])


    const [E_S, setES] = useState('S')
    const [ID_CENTRO_CUSTO, setCentro] = useState(0)
    const [DATA_MOVTO, setDataMov] = useState('')
    const [ID_ORIG_RECEITA, setOrigem] = useState(0)
    const [VALOR, setValor] = useState(0)
    const [ID_FORN, setForn] = useState(0)
    const [ID_PLANO, setPlano] = useState(0)
    const [OBSERVACAO, setObs] = useState('')
    const [USER_CAD, setUser] = useState(0)
    const [DATA_CAD, setDataCad] = useState('')


    /*função para criar a movimentacao financeira */

    const registerMove = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // evita que a página seja recarregada
        // monta o objeto movimentacao financeira
        let move
          move = {
            E_S,
            ID_CENTRO_CUSTO,
            DATA_MOVTO,
            ID_ORIG_RECEITA,
            VALOR,
            ID_FORN,
            ID_PLANO,
            OBSERVACAO,
            USER_CAD: User_cad,
            DATA_CAD: currenteDate
          }

        let url
        let verb

          url = `http://localhost:3333/api/movimentacao_financeira`
          verb = 'POST'
    
        try {
          // chamar a API para cadastrar a movimentacao financeira
          console.log(url)
          console.log(verb)
          const createdMove = await fetch(url, {
            method: verb,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(move)
          })
          .then ( resp => { // quando o servidor respondeu
            return resp.json() // transforma em json
          })
           // atualiza a lista de movimentacao financeira
        setMoves([...moves, createdMove])
        //  handleReloadClick()

      } catch(error) {
        console.log(error)
      }
    }

    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={registerMove}>

            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Cadastre uma movimentação financeira</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Apenas o Admin. possui essa permissão.
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="idCostCenter" className="block text-sm font-medium text-gray-700">
                                Id Centro de Custo
                            </label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    name="number"
                                    id="idCostCenter"
                                    value={ID_CENTRO_CUSTO}
                                    onChange={ (e) => setCentro(Number(e.target.value)) } 
                                    autoComplete="number"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="moved-at" className="block text-sm font-medium text-gray-700">
                                Data da movimentação
                            </label>
                            <div className="mt-1">
                                <input
                                    type="date"
                                    name="date"
                                    id="moved-at"
                                    value={DATA_MOVTO}
                                    onChange={ (e) => setDataMov(e.target.value) } 
                                    autoComplete="date"
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
                                            value={E_S}
                                            onChange={ (e) => {
                                                const value = e.target.checked ? 'E' : 'S';
                                                setES(value) } 
                                            }                                        
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="admin" className="font-medium text-gray-700">
                                            Movimento de Entrada?
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="idRevenueSource" className="block text-sm font-medium text-gray-700">
                                Id Origem de receita
                            </label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    name="number"
                                    id="idRevenueSource"
                                    value={ID_ORIG_RECEITA}
                                    onChange={ (e) => setOrigem(Number(e.target.value)) } 
                                    autoComplete="number"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                                Valor
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="text"
                                    id="value"
                                    value={VALOR}
                                    onChange={ (e) => setValor(Number(e.target.value)) } 
                                    autoComplete="value"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="idSupplier" className="block text-sm font-medium text-gray-700">
                                Id Fornecedor
                            </label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    name="number"
                                    id="idSupplier"
                                    value={ID_FORN}
                                    onChange={ (e) => setForn(Number(e.target.value)) } 
                                    autoComplete="number"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        
                        <div className="sm:col-span-4">
                            <label htmlFor="idChartAccount" className="block text-sm font-medium text-gray-700">
                                Id Plano de Contas
                            </label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    name="number"
                                    id="idChartAccount"
                                    value={ID_PLANO}
                                    onChange={ (e) => setPlano(Number(e.target.value)) } 
                                    autoComplete="number"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="observation" className="block text-sm font-medium text-gray-700">
                                Observação
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="observation"
                                    value={OBSERVACAO}
                                    onChange={ (e) => setObs(e.target.value) } 
                                    name="observation"
                                    rows={2}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
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