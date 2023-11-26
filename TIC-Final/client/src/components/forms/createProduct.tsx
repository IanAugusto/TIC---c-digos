import ToggleComponent from "../toggle";
import { useState, useEffect } from "react"
import { useCookies } from 'react-cookie' // hook para manipular cookies

interface CreateModalProps {
    closeModal: () => void;
}

interface declareMeasures{
    ID: number,
    DES_UNIDADE: string,
    UNID_SIGLA: string,
    USER_CAD: number,
    DATA_CAD: Date
}


interface DeclareProduct
{
    ID: number,
    COD_MATERIAL:string,
    DESCRICAO:string,
    MARCA:string,
    TIPO_PROD_ID:number,
    STA_ATIVO:string,
    QTD_ESTOQUE_MINIMO:number,
    QTD_ESTOQUE_MAXIMO:number,
    UNME_ID:number,
    DAT_INCLUSAO:Date,
    IMAGEM:string,
    USER_CAD:number,
    DATA_CAD:Date
}

interface declaretypeProducts{
    ID: number,
    SEGMENTO: string,
    STA_CONTROLA_VALIDADE: string,
    STA_MOV_ESTOQUE: string,
    UEPS_PEPS: string,
    USER_CAD: number,
    DATA_CAD: string     
}


export default function CreateProduct({ closeModal }: CreateModalProps) {



    const setOpen = () => {
        closeModal();
    }

/*get tipos de produtos*/
    const [tiposProdutos, setTiposProdutos] = useState<declaretypeProducts[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const getTiposProdutos = async () => {
            try {
                const answer = await fetch(`http://localhost:3333/api/tipo_produto/all`)
                const tiposProdutos = await answer.json();
                if(answer.ok)
                {
                    setTiposProdutos(tiposProdutos);
                }
                else
                {
                    alert(`Falha na consulta, tente novamente`)
                }
            }
            catch (error)
            {
                alert(`Erro: ${error}`)
            }
        }
        getTiposProdutos();
    }, [])
/*Termina get tipos de produtos*/

/*get unidade de medida */

const [medidas, setMedidas] = useState<declareMeasures[]>([])
useEffect(() => {
    const getMedidas = async () => {
        try {
            const answer = await fetch(`http://localhost:3333/api/unidade_medida/all`)
            const medidas = await answer.json();
            if(answer.ok)
            {
                setMedidas(medidas);
            }
            else
            {
                alert(`Falha na consulta, tente novamente`)
            }
        }
        catch (error)
        {
            alert(`Erro: ${error}`)
        }
    }
    getMedidas();
}, [])
/*fim get unidade de medida */

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


    const [products, setProducts] = useState<DeclareProduct[]>([])


    const [COD_MATERIAL, setCodMa] = useState('')
    const [DESCRICAO, setDesc] = useState('')
    const [MARCA, setMarca] = useState('')
    const [TIPO_PROD_ID, setTipo] = useState(0)
    const [STA_ATIVO, setSta] = useState('')
    const [QTD_ESTOQUE_MINIMO, setMin] = useState(0)
    const [QTD_ESTOQUE_MAXIMO, setMax] = useState(0)
    const [UNME_ID, setUnme] = useState(0)
    const [DAT_INCLUSAO, setData] = useState('')
    const [IMAGEM, setImagem] = useState('')
    const [USER_CAD, setUser] = useState(0)
    const [DATA_CAD, setDataCad] = useState('')


    /*função para criar o usuario */

    const registerProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // evita que a página seja recarregada
        // monta o objeto usuario
        let produto
          produto = {
            COD_MATERIAL,
            DESCRICAO,
            MARCA,
            TIPO_PROD_ID,
            STA_ATIVO,
            QTD_ESTOQUE_MINIMO,
            QTD_ESTOQUE_MAXIMO,
            UNME_ID,
            DAT_INCLUSAO: currenteDate,
            IMAGEM,
            USER_CAD: User_cad,
            DATA_CAD: currenteDate
          }

        let url
        let verb

          url = `http://localhost:3333/api/produto`
          verb = 'POST'
    
        try {
          // chamar a API para cadastrar o usuario
          console.log(url)
          console.log(verb)
          const createdProduct = await fetch(url, {
            method: verb,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
          })
          .then ( resp => { // quando o servidor respondeu
            return resp.json() // transforma em json
          })
           // atualiza a lista de usuario
        setProducts([...products, createdProduct])
         handleReloadClick()

      } catch(error) {
        console.log(error)
      }
    }

    

    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={registerProduct}>

            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Cadastre um Produto</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Apenas o Admin. possui essa permissão.
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Código material:
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="code"
                                    id="code"
                                    autoComplete="code"
                                    value={COD_MATERIAL}
                                    onChange={ (e) => setCodMa(e.target.value) } 
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Descrição
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    value={DESCRICAO}
                                    onChange={ (e) => setDesc(e.target.value) } 
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="marca" className="block text-sm font-medium text-gray-700">
                                Marca
                            </label>
                            <div className="mt-1">
                                <input
                                    id="marca"
                                    name="marca"
                                    type="text"
                                    autoComplete="marca"
                                    value={MARCA}
                                    onChange={ (e) => setMarca(e.target.value) } 
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="type-product" className="block text-sm font-medium text-gray-700">
                                Tipo de produto
                            </label>
                            <div className="mt-1">
                                <select
                                    id="type-product"
                                    name="type-product"
                                    autoComplete="type-product"
                                    onChange={ (e) => setTipo(Number(e.target.value)) } 
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                    <option value="0">Selecione um Tipo</option>
                                    {tiposProdutos.map((type) => (
                                        <option value={Number(type.ID)} key={type.ID}>{type.SEGMENTO}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <div className="mt-1">
                                <div className="relative flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="STA"
                                            name="STA"
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
                                        <label htmlFor="STA" className="font-medium text-gray-700">
                                            Ativo
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="stock-max" className="block text-sm font-medium text-gray-700">
                                Estoque Máximo
                            </label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    name="number"
                                    id="stock-max"
                                    value={QTD_ESTOQUE_MAXIMO}
                                    onChange={ (e) => setMax(Number(e.target.value)) } 
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="stock-min" className="block text-sm font-medium text-gray-700">
                                Estoque Mínimo
                            </label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    name="number"
                                    id="stock-min"                                
                                    value={QTD_ESTOQUE_MINIMO}
                                    onChange={ (e) => setMin(Number(e.target.value)) } 
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="un-medida" className="block text-sm font-medium text-gray-700">
                                Unidade de medida
                            </label>
                            <div className="mt-1">
                                <select
                                    id="un-medida"
                                    name="un-medida"
                                    autoComplete="un-medida"
                                    onChange={ (e) => setUnme(Number(e.target.value)) } 
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                    <option value="0">Selecione uma unidade</option>
                                    {medidas.map((medida) => (
                                        <option value={Number(medida.ID)} key={medida.ID}>{medida.UNID_SIGLA}
                                        </option>
                                        
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* <div className="sm:col-span-6">
                            <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
                                Adicione uma foto
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div> */}
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