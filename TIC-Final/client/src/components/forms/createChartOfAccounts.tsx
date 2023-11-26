import { useState, useEffect } from "react"
import { useCookies } from 'react-cookie' // hook para manipular cookies

interface CreateModalProps {
    closeModal: () => void;
}

interface declareChart{
    ID: number,
    COD_NIVE1: number,                     
    DESC_NIVEL1: number,
    COD_NIVE2: number
    DESC_NIVEL2: number,
    COD_NIVE3: number,
    DESC_NIVEL3: number,
    USER_CAD: number,
    DATA_CAD: Date
}

export default function CreateChartOfAccounts({ closeModal }: CreateModalProps) {

    const setOpen = () => {
        closeModal();
    }
    const [charts, setCharts] = useState<declareChart[]>([])


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


    const [products, setProducts] = useState<declareChart[]>([])


    const [COD_NIVE1, setCod1] = useState(0)
    const [DESC_NIVEL1, setDesc1] = useState('')
    const [COD_NIVE2, setCod2] = useState(0)
    const [DESC_NIVEL2, setDesc2] = useState('')
    const [COD_NIVE3, setCod3] = useState(0)
    const [DESC_NIVEL3, setDesc3] = useState('')
    const [USER_CAD, setUser] = useState(0)
    const [DATA_CAD, setDataCad] = useState('')


    /*função para criar o plano de contas */

    const registerChart = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // evita que a página seja recarregada
        // monta o objeto plano de  contas
        let chart
          chart = {
            COD_NIVE1,
            DESC_NIVEL1,
            COD_NIVE2,
            DESC_NIVEL2,
            COD_NIVE3,
            DESC_NIVEL3,
            USER_CAD: User_cad,
            DATA_CAD: currenteDate
          }

        let url
        let verb

          url = `http://localhost:3333/api/plano_contas`
          verb = 'POST'
    
        try {
          // chamar a API para cadastrar o plano de contas
          console.log(url)
          console.log(verb)
          const createdChart = await fetch(url, {
            method: verb,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(chart)
          })
          .then ( resp => { // quando o servidor respondeu
            return resp.json() // transforma em json
          })
           // atualiza a lista de usuario
        setCharts([...charts, createdChart])
         handleReloadClick()

      } catch(error) {
        console.log(error)
      }
    }

    

    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={registerChart}>

            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Cadastre um Plano de Contas</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Apenas o Admin. possui essa permissão.
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                        <div className="sm:col-span-4">
                            <label htmlFor="codeOne" className="block text-sm font-medium text-gray-700">
                                Código nível 1
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="text"
                                    id="codeOne"
                                    value={COD_NIVE1}
                                    onChange={ (e) => setCod1(Number(e.target.value)) } 
                                    autoComplete="text"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                       
                        <div className="sm:col-span-4">
                            <label htmlFor="descriptionOne" className="block text-sm font-medium text-gray-700">
                                Descrição nível 1
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="text"
                                    id="descriptionOne"
                                    value={DESC_NIVEL1}
                                    onChange={ (e) => setDesc1(e.target.value) } 
                                    autoComplete="text"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="codeTwo" className="block text-sm font-medium text-gray-700">
                                Código nível 2
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="text"
                                    id="codeTwo"
                                    value={COD_NIVE2}
                                    onChange={ (e) => setCod2(Number(e.target.value)) } 
                                    autoComplete="text"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="descriptionTwo" className="block text-sm font-medium text-gray-700">
                                Descrição nível 2
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="text"
                                    id="descriptionTwo"
                                    value={DESC_NIVEL2}
                                    onChange={ (e) => setDesc2(e.target.value) } 
                                    autoComplete="text"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="codeThree" className="block text-sm font-medium text-gray-700">
                                Código nível 3
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="text"
                                    id="codeThree"
                                    value={COD_NIVE3}
                                    onChange={ (e) => setCod3(Number(e.target.value)) } 
                                    autoComplete="text"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="descriptionThree" className="block text-sm font-medium text-gray-700">
                                Descrição nível 3
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="text"
                                    id="descriptionThree"
                                    value={DESC_NIVEL3}
                                    onChange={ (e) => setDesc3(e.target.value) } 
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