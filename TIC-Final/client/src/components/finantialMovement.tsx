import { useState, useEffect } from "react";
import CreateModal from "./createModal";
import { useCookies } from 'react-cookie' // hook para manipular cookies

interface declareMov {
    ID: number,
    E_S: string,
    ID_CENTRO_CUSTO: number,
    DATA_MOVTO: Date,
    ID_ORIG_RECEITA: number,
    VALOR: number,
    ID_FORN: number,
    ID_PLANO: number,
    OBSERVACAO: string,
    USER_CAD: number,
    DATA_CAD: Date
}


export default function ListFinantialMovements() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [moves, setMoves] = useState<declareMov[]>([])
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO', 'ID', 'ID_FIN_MOV'])

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const getMoves = async () => {
            try {
                const answer = await fetch(`http://localhost:3333/api/movimentacao_financeira/all`)
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
        getMoves();
    }, [])



    return (
        //aqui vai ter que pegar as infos pelo ID

        <tbody className="divide-y divide-gray-200 bg-white">
            {moves.map((movement) => (
                <tr key={movement.ID}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {movement.ID_CENTRO_CUSTO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {String(movement.DATA_MOVTO)}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {movement.E_S}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {movement.ID_ORIG_RECEITA}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {movement.VALOR}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                        {movement.ID_FORN}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ">
                        {movement.ID_PLANO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {movement.OBSERVACAO}
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
                            setCookie('ID_FIN_MOV', movement.ID)
                        }}>
                            Editar<span className="sr-only">, {movement.ID}</span>
                        </a>
                        <CreateModal isOpen={isModalOpen} closeModal={closeModal} type='editFinantialMovement' />
                    </td>
                </tr>
            ))}
        </tbody>

    )
}

