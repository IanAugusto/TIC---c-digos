
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import CreateModal from "./createModal";
import { useCookies } from 'react-cookie' // hook para manipular cookies

/* This example requires Tailwind CSS v2.0+ */
interface declaretypeProducts{
    ID: number,
    SEGMENTO: string,
    STA_CONTROLA_VALIDADE: string,
    STA_MOV_ESTOQUE: string,
    UEPS_PEPS: string,
    USER_CAD: number,
    DATA_CAD: string     
}


export default function ListTypeProducts() {

    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO', 'ID', 'ID_TIPO_PROD'])
    const [tiposProdutos, setTiposProdutos] = useState<declaretypeProducts[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };



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



    return (
        <tbody className="divide-y divide-gray-200 bg-white">
            {tiposProdutos.map((type) => (
                <tr key={type.ID}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {type.SEGMENTO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {type.STA_CONTROLA_VALIDADE}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={(event) => {
                            openModal();
                            setCookie('ID_TIPO_PROD', type.ID)
                        }}>
                            Editar<span className="sr-only">, {type.ID}</span>
                        </a>
                        <CreateModal isOpen={isModalOpen} closeModal={closeModal} type='editTypeProduct' />
                    </td>
                </tr>
            ))}
        </tbody>

    )
}
