
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import CreateModal from "./createModal";
import React, { createContext, useContext } from 'react';
import { useCookies } from 'react-cookie' // hook para manipular cookies


/* This example requires Tailwind CSS v2.0+ */
interface declareMeasures {
    ID: number,
    DES_UNIDADE: string,
    UNID_SIGLA: string,
    USER_CAD: number,
    DATA_CAD: Date
}


export default function ListMeasure() {


    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO', 'ID', 'ID_MEDIDA'])
    const [medidas, setMedidas] = useState<declareMeasures[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };





    useEffect(() => {
        const getMedidas = async () => {
            try {
                const answer = await fetch(`http://localhost:3333/api/unidade_medida/all`)
                const medidas = await answer.json();
                if (answer.ok) {
                    setMedidas(medidas);
                }
                else {
                    alert(`Falha na consulta, tente novamente`)
                }
            }
            catch (error) {
                alert(`Erro: ${error}`)
            }
        }
        getMedidas();
    }, [])

    const location = useLocation();
    const navigate = useNavigate();
    function navigateTo(route: string) {
        navigate(route, { state: { medidas: medidas } })
    }

    const editar = (key: any, route: string) => {
        navigate(route, { state: { medidas: medidas, selected: key } })
    };



    return (
        <tbody className="divide-y divide-gray-200 bg-white">
            {medidas.map((measure) => (
                <tr key={measure.ID}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {measure.DES_UNIDADE}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {measure.UNID_SIGLA}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={(event) => {
                            openModal();
                            setCookie('ID_MEDIDA', measure.ID)
                        }}>
                            Editar
                        </a>
                        <CreateModal isOpen={isModalOpen} closeModal={closeModal} type='editMeasure' />
                    </td>
                </tr>
            ))}
        </tbody>

    )
}



