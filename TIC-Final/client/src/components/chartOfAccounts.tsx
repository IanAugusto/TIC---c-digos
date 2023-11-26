import { useState, useEffect } from "react";
import CreateModal from "./createModal";
import { useCookies } from 'react-cookie' // hook para manipular cookies
interface declareChart{
    ID: number,
    COD_NIVE1: number,                     
    DESC_NIVEL1: number,
    COD_NIVE2: number
    DESC_NIVEL2: number,
    COD_NIVE3: number,
    DESC_NIVEL3: number,
    USER_CAD: number,
    DATA_CAD: Date
}

export default function ListChartOfAccounts() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [charts, setCharts] = useState<declareChart[]>([])
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO', 'ID', 'ID_PLANO'])

    const open = () => {
        setIsModalOpen(true);
    };

    const close = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const getChart = async () => {
            try {
                const answer = await fetch(`http://localhost:3333/api/plano_contas/all`)
                const charts = await answer.json();
                if(answer.ok)
                {
                    setCharts(charts);
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
        getChart();
    }, [])

    return (
        <tbody className="divide-y divide-gray-200 bg-white">
            {charts.map((chartOfAccount) => (
                <tr key={chartOfAccount.ID}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {chartOfAccount.COD_NIVE1}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {chartOfAccount.DESC_NIVEL1}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {chartOfAccount.COD_NIVE2}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {chartOfAccount.DESC_NIVEL2}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {chartOfAccount.COD_NIVE3}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {chartOfAccount.DESC_NIVEL3}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {chartOfAccount.USER_CAD}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {String(chartOfAccount.DATA_CAD)}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={(event) => {
                            open();
                            setCookie('ID_PLANO', chartOfAccount.ID)
                        }}>
                            Editar<span className="sr-only">, {chartOfAccount.ID}</span>
                        </a>
                        <CreateModal isOpen={isModalOpen} closeModal={close} type='editchartOfAccounts' />
                    </td>

                    
                </tr>
            ))}
        </tbody>

    )
}
