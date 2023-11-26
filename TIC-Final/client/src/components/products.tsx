
import { useState, useEffect } from "react"
import { PathMatch } from "../../node_modules/react-router-dom/dist/index";
import { useCookies } from 'react-cookie' // hook para manipular cookies

import CreateModal from "./createModal";

/* This example requires Tailwind CSS v2.0+ */
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


export default function ListProducts() {

    
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO','ID', 'ID_PRODUTO'])
    const [produtos, setProdutos] = useState<declareProduct[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const deactivate = (index: number) => {
        fetch(`http://localhost:3333/api/produto/${index}`, {method: "PATCH"})
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

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



    return (

        <tbody className="divide-y divide-gray-200 bg-white">
            {produtos.map((product) => (
                <tr key={product.ID}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {product.DESCRICAO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {product.COD_MATERIAL}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {product.TIPO_PROD_ID}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {product.QTD_ESTOQUE_MAXIMO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {product.QTD_ESTOQUE_MINIMO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                        {product.MARCA}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                        {product.STA_ATIVO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {product.UNME_ID}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {product.DAT_INCLUSAO.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                        {product.USER_CAD}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={(event) => {
                        openModal();
                        setCookie('ID_PRODUTO', product.ID)
                    }} >
                            Editar<span className="sr-only">, {product.COD_MATERIAL}</span>
                        </a>
                        <CreateModal isOpen={isModalOpen} closeModal={closeModal} type='editProduct' />
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={() => {deactivate(product.ID)}}>
                            Desativar<span className="sr-only">, {product.COD_MATERIAL}</span>
                        </a>
                    </td>
                </tr>
            ))}
        </tbody>

    )
}

