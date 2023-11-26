import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie' // hook para manipular cookies

interface DeclareMeasure 
{
    ID: number,
    DES_UNIDADE: string,
    UNID_SIGLA: string,
    USER_CAD: number,
    DATA_CAD: Date
}

interface CreateModalProps {
    closeModal: () => void;
}

export default function CreateMeasure({ closeModal }: CreateModalProps) {

    const setOpen = () => {
        closeModal();
    }


    //define a data
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const currenteDate = `${year}-${month}-${day}`
    //

    //cookies
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO','ID','ID_MEDIDA'])
    const User_cad = cookie.ID
    const id_da_medida = cookie.ID_MEDIDA
    console.log(id_da_medida)
    //

    const [measures, setMeasurers] = useState<DeclareMeasure[]>([])
    const [ID, setID] = useState('')
    const [DES_UNIDADE, setDesUnidade] = useState('')
    const [UNID_SIGLA, setUnidSigla] = useState('')
    const [USER_CAD, setUserCad] = useState(0)
    const [EMAIL, setEmail] = useState('')
    const [DATA_CAD, setDataCad] = useState('')


    /*função para criar medida */

    const registerMeasure = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // evita que a página seja recarregada
        // monta o objeto medida
        let measure
          measure = {
            DES_UNIDADE,
            UNID_SIGLA,
            USER_CAD: User_cad,
            EMAIL,
            DATA_CAD: currenteDate
          }

        let url = `http://localhost:3333/api/unidade_medida/${id_da_medida}`
        let verb = 'PUT'
          if(Number(id_da_medida) == 0 || id_da_medida == undefined){
            url = `http://localhost:3333/api/unidade_medida`
            verb = 'POST'
          }
    
        try {
          // chamar a API para criar medida
          console.log(url)
          console.log(verb)
          const createdMeasure = await fetch(url, {
            method: verb,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(measure)
          })
          .then ( resp => { // quando o servidor respondeu
            return resp.json() // transforma em json
          })
           // atualiza a lista de medidas
        setMeasurers([...measures, createdMeasure])

      } catch(error) {
        console.log(error)
      }
    }
     /*fim da função para criar medida */

     useEffect(() => {

            if(Number(id_da_medida) != 0)
            {
                if(id_da_medida != undefined){
                    const findobj = async () => {
                        try {
                            const answer = await fetch(`http://localhost:3333/api/unidade_medida/${id_da_medida}`)
                            const obj = await answer.json();
                            if(answer.ok)
                            {                    
                                setID(obj.ID);
                                setDesUnidade(obj.DES_UNIDADE);
                                setUnidSigla(obj.UNID_SIGLA);
                                setUserCad(obj.USER_CAD);
                                setEmail(obj.EMAIL);
                                setDataCad(obj.DAT_CADASTRO);
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
        
    })

    
    function eliminaCookie() {
        // remove o cookie ID_MEDIDA
        removeCookie('ID_MEDIDA')
    }

    function eliminaCookieSetOpen(){
        eliminaCookie()
        setOpen()
    }


    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={registerMeasure}>

            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Cadastre uma medida</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Apenas o Admin. possui essa permissão.
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                        <div className="sm:col-span-4">
                            <label htmlFor="measure" className="block text-sm font-medium text-gray-700">
                                Nome/Descrição da medida
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="measure"
                                    id="measure"
                                    autoComplete="measure"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                    value={DES_UNIDADE}
                                    onChange={ (e) => setDesUnidade(e.target.value) }
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="acronym" className="block text-sm font-medium text-gray-700">
                                Sigla
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="acronym"
                                    id="acronym"
                                    autoComplete="acronym"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                    value={UNID_SIGLA}
                                    onChange={ (e) => setUnidSigla(e.target.value) }
                                />
                            </div>
                        </div>


                        <div className="sm:col-span-4">
                            <label htmlFor="acronym" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="acronym"
                                    id="acronym"
                                    autoComplete="acronym"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                    value={EMAIL}
                                    onChange={ (e) => setEmail(e.target.value) }
                                />
                            </div>
                        </div>

                    </div>

                    
                </div>
                

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={eliminaCookieSetOpen}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={eliminaCookieSetOpen}
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