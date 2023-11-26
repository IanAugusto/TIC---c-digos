import CheckboxComponent from "../checkbox";
import { useState, useEffect } from "react"
import { useCookies } from 'react-cookie' // hook para manipular cookies

interface CreateModalProps {
    closeModal: () => void;
}

interface declareProductMove{
    ID: number,
    ID_PROD: number,
    E_S: string,
    DATA_MOVTO: Date,
    TIPO_MOVTO: number,
    QTD: number,
    VALOR: number,
    VALOR_TOTAL: number,
    VALOR_MEDIO: number,
    QTD_EST_ATUAL: number,
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

interface declareTypeMov{
    ID: number,
    DES_TIPO_MOVIMENTO: string,
    DES_OBSERVACAO: string,
    STA_ATIVO: string
    STA_TIPO_MOVIMENTO: string,
    USER_CAD: number,
    DATA_CAD: Date
}



export default function EditProductMovement({ closeModal }: CreateModalProps) {

    const setOpen = () => {
        closeModal();
    }

    const [moves, setmoves] = useState<declareProductMove[]>([])

    const handleReloadClick = () => {
        window.location.reload();
      };

      //pega a data atual
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const currenteDate = `${year}-${month}-${day}`

    //cookies
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO','ID', 'ID_PROD_MOV'])
    const User_cad = cookie.ID
    const id_da_mov = cookie.ID_PROD_MOV


    const [products, setProducts] = useState<declareProductMove[]>([])


    const [ID, setID] = useState(0)
    const [ID_PROD, setIDProd] = useState(0)
    const [E_S, setES] = useState('S')
    const [DATA_MOVTO, setDataMov] = useState('')
    const [TIPO_MOVTO, setTipoMov] = useState(0)
    const [QTD, setQtd] = useState(0)
    const [VALOR, setValor] = useState(0)
    const [VALOR_TOTAL, setValorTot] = useState(0)
    const [VALOR_MEDIO, setValorMed] = useState(0)
    const [QTD_EST_ATUAL, setQtdAtu] = useState(0)
    const [USER_CAD, setUser] = useState(0)
    const [DATA_CAD, setDataCad] = useState('')


    /*função para criar movimentacao */

    const registerMov = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // evita que a página seja recarregada
        // monta o objeto movimentacao
        let usuario
          usuario = {
            ID_PROD,
            E_S,
            DATA_MOVTO: currenteDate,
            TIPO_MOVTO,
            QTD,
            VALOR,
            VALOR_TOTAL,
            VALOR_MEDIO,
            QTD_EST_ATUAL,
            USER_CAD: User_cad,
            DATA_CAD: currenteDate
          }

        let url
        let verb

          url = `http://localhost:3333/api/movimentacao/${id_da_mov}`
          verb = 'PUT'
    
        try {
          // chamar a API para cadastrar a movimentacao
          console.log(url)
          console.log(verb)
          const createdMove = await fetch(url, {
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
        setmoves([...moves, createdMove])
        eliminaCookie()
        

      } catch(error) {
        console.log(error)
      }
      handleReloadClick()
    }

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

 /**Get tipos de movimentacao */
 const [Typemoves, setTypeMoves] = useState<declareTypeMov[]>([])
 useEffect(() => {
    const getMove = async () => {
        try {
            const answer = await fetch(`http://localhost:3333/api/tipo_movimento_estoque/all`)
            const Typemoves = await answer.json();
            if(answer.ok)
            {
                setTypeMoves(Typemoves);
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
    getMove();
}, [])



const editar = useEffect(() => {

    if(Number(id_da_mov) != 0)
    {
        if(id_da_mov != undefined){
            const findobj = async () => {
                try {
                    const answer = await fetch(`http://localhost:3333/api/movimentacao/${id_da_mov}`)
                    const obj = await answer.json();
                    if(answer.ok)
                    {               
                        setID(Number(obj.ID))  
                        setIDProd(obj.ID_PRODUTO);
                        setES(obj.E_S);
                        setDataMov(obj.DATA_MOVTO);
                        setTipoMov(obj.TIPO_MOVTO);
                        setQtd(obj.QTD);
                        setValor(obj.VALOR);
                        setValorTot(obj.VALOR_TOTAL);                                                                            
                        setValorMed(obj.VALOR_MEDIO);
                        setQtdAtu(obj.QTD_EST_ATUAL);                        

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
// remove o cookie ID_PRODUTO
removeCookie('ID_PROD_MOV')
}

    
/**Fim get tipos de movimentacao */
    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={registerMov}>

            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Cadastre uma movimentação</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Apenas o Admin. possui essa permissão.
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="product" className="block text-sm font-medium text-gray-700">
                                Produto
                            </label>
                            <div className="mt-1">
                                <select
                                    id="product"
                                    name="product"
                                    autoComplete="product"
                                    onChange={ (e) => setIDProd(Number(e.target.value)) } 
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
                            <label htmlFor="type-movement" className="block text-sm font-medium text-gray-700">
                                Tipo de movimentação
                            </label>
                            <div className="mt-1">
                                <select
                                    id="type-movement"
                                    name="type-movement"
                                    autoComplete="type-movement"
                                    onChange={ (e) => setTipoMov(Number(e.target.value)) } 
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                     <option value="0">Selecione um tipo de movimentacao</option>
                                    {Typemoves.map((type) => (
                                        <option value={Number(type.ID)} key={type.ID}>{type.DES_TIPO_MOVIMENTO}</option>
                                    ))}

                                </select>
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
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                Quantidade
                            </label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    name="number"
                                    id="quantity"
                                    autoComplete="number"
                                    onChange={ (e) => setQtd(Number(e.target.value)) } 
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
                                    type="number"
                                    name="number"
                                    id="value"
                                    onChange={ (e) => setValor(Number(e.target.value)) } 
                                    autoComplete="number"
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