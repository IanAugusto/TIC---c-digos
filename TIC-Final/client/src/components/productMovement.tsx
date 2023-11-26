import CreateModal from "./createModal";
import { useState, useEffect } from "react"
import { useCookies } from 'react-cookie' // hook para manipular cookies



interface declareProductMove {
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


export default function ListProductMovements() {
    const [moves, setmoves] = useState<declareProductMove[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO', 'ID', 'ID_PROD_MOV'])

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const getProdutosMov = async () => {
            try {
                const answer = await fetch(`http://localhost:3333/api/movimentacao/all`)
                const moves = await answer.json();
                if (answer.ok) {
                    setmoves(moves);
                }
                else {
                    alert(`Falha na consulta, tente novamente`)
                }
            }
            catch (error) {
                alert(`Erro: ${error}`)
            }
        }
        getProdutosMov();
    }, [])


    return (

        <tbody className="divide-y divide-gray-200 bg-white">
            {moves.map((movement) => (
                <tr key={movement.ID}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {movement.ID_PROD}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {String(movement.DATA_MOVTO)}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {movement.TIPO_MOVTO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {movement.E_S}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {movement.QTD}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {movement.VALOR}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                        {movement.VALOR_TOTAL}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                        {movement.VALOR_MEDIO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {movement.QTD_EST_ATUAL}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {movement.USER_CAD}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                        {String(movement.DATA_CAD)}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={(event) => {
                            openModal();
                            setCookie('ID_PROD_MOV', movement.ID)
                        }}>
                            Editar<span className="sr-only">, {movement.ID}</span>
                        </a>
                        <CreateModal isOpen={isModalOpen} closeModal={closeModal} type='editProductMovement' />
                    </td>
                </tr>
            ))}
        </tbody>

    )
}

