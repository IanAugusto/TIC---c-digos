import { useState, useEffect } from "react"
import CreateModal from "./createModal";
import { useCookies } from 'react-cookie' // hook para manipular cookies

interface declareAssocitation{
    ID: number,
    ID_FORN: number,
    ID_PROD: number,
    USER_CAD: number,
    DATA_CAD: Date
}


export default function ListProductsSuppliers() {
    const [associations, setAssociation] = useState<declareAssocitation[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO', 'ID', 'ID_FORN_PROD'])

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const deactivate = (index: number) => {
        fetch(`http://localhost:3333/api/fornecedor_produto/${index}`, {method: "DELETE"})
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }
    

    useEffect(() => {
        const getAssociation = async () => {
            try {
                const answer = await fetch(`http://localhost:3333/api/fornecedor_produto/all`)
                const associations = await answer.json();
                if(answer.ok)
                {
                    setAssociation(associations);
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
        getAssociation();
    }, [])
    
    

    return (
        <tbody className="divide-y divide-gray-200 bg-white">
            {associations.map((item) => (
                <tr key={item.ID}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {item.ID_PROD}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {item.ID_FORN}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={() => {deactivate(item.ID)}}>
                            Desativar<span className="sr-only">, {item.ID}</span>
                        </a>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={(event) => {
                            openModal();
                            setCookie('ID_FORN_PROD', item.ID)
                        }}>
                            Editar<span className="sr-only">, {item.ID}</span>                            
                        </a>
                        <CreateModal isOpen={isModalOpen} closeModal={openModal} type='editSupplierProduct' />
                    </td>
                </tr>
            ))}
        </tbody>

    )
}
