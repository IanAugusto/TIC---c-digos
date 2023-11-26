import { useState, useEffect } from "react";
import CreateModal from "./createModal";
import { useCookies } from 'react-cookie' // hook para manipular cookies

interface declareCostCenter {
    ID: number,
    DES_CENTRO_CUSTO: string,
    STA_ATIVO: string,
    SIGLA: string,
    DATA_INICIAL: Date,
    DATA_FINAL: Date,
    OBSERVACOES: string
}


export default function ListCostCenter() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cost, setcost] = useState<declareCostCenter[]>([])
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO', 'ID', 'ID_CENTRO'])

    const open = () => {
        setIsModalOpen(true);
    };

    const close = () => {
        setIsModalOpen(false);
    };

    const deactivate = (index: number) => {
        fetch(`http://localhost:3333/api/centro_custo/${index}`, { method: "PATCH" })
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    useEffect(() => {
        const getCost = async () => {
            try {
                const answer = await fetch(`http://localhost:3333/api/centro_custo/all`)
                const cost = await answer.json();
                if (answer.ok) {
                    setcost(cost);
                }
                else {
                    alert(`Falha na consulta, tente novamente`)
                }
            }
            catch (error) {
                alert(`Erro: ${error}`)
            }
        }
        getCost();
    }, [])


    return (
        <tbody className="divide-y divide-gray-200 bg-white">
            {cost.map((costCenter) => (
                <tr key={costCenter.ID}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {costCenter.DES_CENTRO_CUSTO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {costCenter.STA_ATIVO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {costCenter.SIGLA}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {String(costCenter.DATA_INICIAL)}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {String(costCenter.DATA_FINAL)}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {costCenter.OBSERVACOES}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={(event) => {
                            open();
                            setCookie('ID_CENTRO', costCenter.ID)
                        }}>
                            Editar<span className="sr-only">, {costCenter.ID}</span>
                        </a>
                        <CreateModal isOpen={isModalOpen} closeModal={close} type='editCostCenter' />
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={() => {
                            deactivate(costCenter.ID)
                        }}>
                            Desativar
                        </a>
                    </td>

                </tr>
            ))}
        </tbody>

    )
}
