import CreateModal from "./createModal";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'


interface declareTypeMov {
    ID: number,
    DES_TIPO_MOVIMENTO: string,
    DES_OBSERVACAO: string,
    STA_ATIVO: string
    STA_TIPO_MOVIMENTO: string,
    USER_CAD: number,
    DATA_CAD: Date
}


export default function ListTypeMovements() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [moves, setMoves] = useState<declareTypeMov[]>([])

    const open = () => {
        setIsModalOpen(true);
    };

    const close = () => {
        setIsModalOpen(false);
    };

    const deactivate = (index: number) => {
        fetch(`http://localhost:3333/api/tipo_movimento_estoque/${index}`, { method: "PATCH" })
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    useEffect(() => {
        const getMove = async () => {
            try {
                const answer = await fetch(`http://localhost:3333/api/tipo_movimento_estoque/all`)
                const moves = await answer.json();
                if (answer.ok) {
                    setMoves(moves);
                }
                else {
                    alert(`Falha na consulta, tente novamente`)
                }
            }
            catch (error) {
                alert(`Erro: ${error}`)
            }
        }
        getMove();
    }, [])

    return (
        <tbody className="divide-y divide-gray-200 bg-white">
            {moves.map((type) => (
                <tr key={type.ID}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {type.DES_TIPO_MOVIMENTO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {type.DES_OBSERVACAO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {type.STA_ATIVO}
                    </td>

                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {type.USER_CAD}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {String(type.DATA_CAD)}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={open}>
                            Editar<span className="sr-only">, {type.ID}</span>
                        </a>
                        <CreateModal isOpen={isModalOpen} closeModal={close} type='editTypeMovement' />
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={() => {
                            deactivate(type.ID)
                        }}>
                            Desativar
                        </a>
                    </td>
                </tr>
            ))}
        </tbody>

    )
}