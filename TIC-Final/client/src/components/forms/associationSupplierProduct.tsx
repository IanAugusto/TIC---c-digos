import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie' // hook para manipular cookies

interface CreateModalProps {
    closeModal: () => void;
}

interface declareSuppliers{
    ID: number,
    PESSOA: string,
    NOM_PESSOA: string,
    DAT_CADASTRO: string,
    NUM_CGC: string,
    NUM_CPF: string,
    EMAIL: string,
    NOM_CONTATO: string,
    STA_ATIVO: string,
    NOM_APELIDO: string,
    NOM_FANTASIA: string,
    NUM_RG: string,
    DES_HISTORICO: string,
    NOM_CARGO: string,
    RAMO_ATIVIDADE: string,
    FONE: string,
    STA_POSSUI_NFE: string,
    WEBSITE: string,
    NUM_INSC_ESTATUAL: string,
    USER_CAD: number,
    DATA_CAD: string
}


interface declareAssocitation{
    ID: number,
    ID_FORN: number,
    ID_PROD: number,
    USER_CAD: number,
    DATA_CAD: Date
}

interface declareProduct{
    ID: number,                 
    COD_MATERIAL: string,     
    DESCRICAO: string,        
    MARCA: string,            
    TIPO_PROD_ID: number,     
    STA_ATIVO: string,        
    QTD_ESTOQUE_MINIMO: number, 
    QTD_ESTOQUE_MAXIMO: number, 
    UNME_ID: number,            
    DAT_INCLUSAO: Date,       
    IMAGEM: string,             
    USER_CAD: number,           
    DATA_CAD: Date           
}


export default function AssociationSupplierProduct({ closeModal }: CreateModalProps) {

    const setOpen = () => {
        closeModal();
    }

    //atualiza a lista
    
    const handleReloadClick = () => {
        window.location.reload();
      };

    //define a data
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const currenteDate = `${year}-${month}-${day}`
    //

    //cookies
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO','ID'])
    const User_cad = cookie.ID
    //

    const [associations, setAssociation] = useState<declareAssocitation[]>([])
    const [ID, setID] = useState(0)
    const [ID_FORN, setForn] = useState(0)
    const [ID_PROD, setProd] = useState(0)
    const [USER_CAD, setUserCad] = useState(0)
    const [DATA_CAD, setDataCad] = useState('')

    const registerAssociation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // evita que a página seja recarregada
        // monta o objeto medida
        let association
        association = {
            ID_FORN,
            ID_PROD,
            USER_CAD: User_cad,
            DATA_CAD: currenteDate
          }

        let url 
        let verb 
            url = `http://localhost:3333/api/fornecedor_produto`
            verb = 'POST'

    
        try {
          // chamar a API para criar forn_prod
          console.log(url)
          console.log(verb)
          const createdAssociation = await fetch(url, {
            method: verb,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(association)
          })
          .then ( resp => { // quando o servidor respondeu
            return resp.json() // transforma em json
          })
           // atualiza a lista de forn_prod
           setAssociation([...associations, createdAssociation])
           handleReloadClick()

      } catch(error) {
        console.log(error)
      }
    }
     /*fim da função para criar forn_prod */

    

    /*get produtos*/
    const [produtos, setProdutos] = useState<declareProduct[]>([])
    useEffect(() => {
        const getProdutos = async () => {
            try {
                const answer = await fetch(`http://localhost:3333/api/produto/all`)
                const produtos = await answer.json();
                if(answer.ok)
                {
                    setProdutos(produtos);
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
        getProdutos();
    }, [])
    
/**Fim get Produtos */

/**Get fornecedores */
const [fornecedores, setFornecedores] = useState<declareSuppliers[]>([])
useEffect(() => {
    const getFornecedores = async () => {
        try {
            const answer = await fetch(`http://localhost:3333/api/fornecedor/all`)
            const fornecedores = await answer.json();
            if(answer.ok)
            {
                setFornecedores(fornecedores);
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
    getFornecedores();
}, [])

/**Fim get fornecedores */


    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={registerAssociation}>

            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Cadastrar Associação de Fornecedor com Produto</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Apenas o Admin. possui essa permissão.
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                        <div className="sm:col-span-4">
                            <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
                                Produto
                            </label>
                            <div className="mt-1">
                                <select
                                    id="supplier"
                                    name="type-product"
                                    autoComplete="type-product"
                                    onChange={ (e) => setProd(Number(e.target.value)) } 
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                    <option value="0">Selecione um Produto</option>
                                    {produtos.map((type) => (
                                        <option value={Number(type.ID)} key={type.ID}>{type.DESCRICAO}</option>
                                    ))}

                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
                                Fornecedor
                            </label>
                            <div className="mt-1">
                                <select
                                    id="supplier"
                                    name="type-product"
                                    autoComplete="type-product"
                                    onChange={ (e) => setForn(Number(e.target.value)) } 
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                    <option value="0">Selecione um Fornecedor</option>
                                    {fornecedores.map((type) => (
                                        <option value={Number(type.ID)} key={type.ID}>{type.NOM_CONTATO}</option>
                                    ))}

                                </select>
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
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}