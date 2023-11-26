import { useState, useEffect } from "react";
import CreateModal from "./createModal";
import { useCookies } from 'react-cookie' // hook para manipular cookies

interface declareRevenue{
    ID: number,
    ATIVO: string,
    DESCRICAO: string,
    OBSERVACAO: string,
    USER_CAD: number,
    DATA_CAD: Date
}
export default function ListRevenueSource() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [revenues, setRevenues] = useState<declareRevenue[]>([])
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO', 'ID', 'ID_ORIGEM_RECEITA'])

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const deactivate = (index: number) => {
        fetch(`http://localhost:3333/api/origem_receita/${index}`, {method: "PATCH"})
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }


    useEffect(() => {
        const getRevenue = async () => {
            try {
                const answer = await fetch(`http://localhost:3333/api/origem_receita/all`)
                const revenues = await answer.json();
                if(answer.ok)
                {
                    setRevenues(revenues);
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
        getRevenue();
    }, [])

    return (
        <tbody className="divide-y divide-gray-200 bg-white">
            {revenues.map((revenueSource) => (
                <tr key={revenueSource.ID}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {revenueSource.DESCRICAO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {revenueSource.ATIVO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {revenueSource.OBSERVACAO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {revenueSource.USER_CAD}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {String(revenueSource.DATA_CAD)}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={(event) => {
                            openModal();
                            setCookie('ID_ORIGEM_RECEITA', revenueSource.ID)
                        }}>
                            Editar<span className="sr-only">, {revenueSource.ID}</span>
                        </a>
                        <CreateModal isOpen={isModalOpen} closeModal={closeModal} type='editRevenueSource' />

                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={() => {
                            deactivate(revenueSource.ID)
                        }}>
                            Desativar
                        </a>
                    </td>
                    </td>
                </tr>
            ))}
        </tbody>

    )
}
