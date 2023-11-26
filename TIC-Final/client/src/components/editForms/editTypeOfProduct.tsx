import CheckboxComponent from "../checkbox";
import ToggleComponent from "../toggle";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie' // hook para manipular cookies

interface CreateModalProps {
    closeModal: () => void;
}

interface DeclareType
{
    ID: number,
    SEGMENTO:string, 
    STA_CONTROLA_VALIDADE: string,
    STA_MOV_ESTOQUE: string,
    UEPS_PEPS: string,
    USER_CAD: string
    DATA_CAD: Date
}

export default function EditTypeOfProduct({ closeModal }: CreateModalProps) {

    const setOpen = () => {
        closeModal();
    }

    const handleReloadClick = () => {
        window.location.reload();
      };

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const currenteDate = `${year}-${month}-${day}`
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO','ID', 'ID_TIPO_PROD'])
    const User_cad = cookie.ID
    const id_do_tipo = cookie.ID_TIPO_PROD

    
    const [types, setTypes] = useState<DeclareType[]>([])

    const [ID, setID] = useState(id_do_tipo)
    const [SEGMENTO, setSeg] = useState('')
    const [STA_CONTROLA_VALIDADE, setStaCon] = useState('N')
    const [UEPS_PEPS, setUeps] = useState('')
    const [USER_CAD, setUserCad] = useState(0)
    const [DATA_CAD, setDate] = useState('')


    const registerType = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // evita que a página seja recarregada
        // monta o objeto usuario
        let usuario
          usuario = {
            SEGMENTO,
            STA_CONTROLA_VALIDADE,
            STA_MOV_ESTOQUE: 'S',
            UEPS_PEPS,
            USER_CAD: User_cad,
            DATA_CAD: currenteDate
          }

        let url
        let verb

          url = `http://localhost:3333/api/tipo_produto/${id_do_tipo}`
          verb = 'PUT'
    
        try {
          // chamar a API para cadastrar o usuario
          console.log(url)
          console.log(verb)
          const createdType = await fetch(url, {
            method: verb,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
          })
          .then ( resp => { // quando o servidor respondeu
            return resp.json() // transforma em json
          })
           // atualiza a lista de usuario
        setTypes([...types, createdType])
        handleReloadClick()
        eliminaCookie

      } catch(error) {
        console.log(error)
      }
    }

    const editar = useEffect(() => {

        if(Number(id_do_tipo) != 0)
        {
            if(id_do_tipo != undefined){
                const findobj = async () => {
                    try {
                        const answer = await fetch(`http://localhost:3333/api/tipo_produto/${id_do_tipo}`)
                        const obj = await answer.json();
                        if(answer.ok)
                        {               
                            setID(Number(obj.ID))  
                            setSeg(obj.SEGMENTO);
                            setStaCon(obj.STA_CONTROLA_VALIDADE);
                            setUeps(obj.UEPS_PEPS);                            

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
    // remove o cookie ID_MEDIDA
    removeCookie('ID_TIPO_PROD')
}


    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={registerType}>

            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Cadastre um Tipo de Produto</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Apenas o Admin. possui essa permissão.
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                        <div className="sm:col-span-4">
                            <label htmlFor="segment-name" className="block text-sm font-medium text-gray-700">
                                Nome do segmento
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="segment-name"
                                    id="segment-name"
                                    autoComplete="segment-name"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required
                                    value={SEGMENTO}
                                    onChange={ (e) => setSeg(e.target.value) } 
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <div className="mt-1">
                                <div className="relative flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="validade"
                                            name="validade"
                                            type="checkbox"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"  
                                            value={STA_CONTROLA_VALIDADE}
                                            onChange={ (e) => {
                                                const value = e.target.checked ? 'S' : 'N';
                                                setStaCon(value) } 
                                            }                                             
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="validade" className="font-medium text-gray-700">
                                            Precisa de controle de validade?
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="sm:col-span-4">
                            <div className="mt-1">
                                <div className="relative flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="ueps"
                                            name="ueps"
                                            type="checkbox"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"  
                                            value={UEPS_PEPS}
                                            onChange={ (e) => {
                                                const value = e.target.checked ? 'P' : 'U';
                                                setUeps(value) } 
                                            }                                             
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="ueps" className="font-medium text-gray-700">
                                            Primeiro a entrar é o primeiro a sair?
                                        </label>
                                    </div>
                                </div>
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