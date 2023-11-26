import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import CreateModal from "./createModal";
import { useCookies } from 'react-cookie' // hook para manipular cookies

/* This example requires Tailwind CSS v2.0+ */
interface declareSuppliers{
    ID: number,
    PESSOA: string,
    NOM_PESSOA: string,
    DAT_CADASTRO: string,
    NUM_CGC: string,
    NUM_CPF: string,
    EMAIL: string,
    NOM_CONTATO: string,
    STA_ATIVO: string,
    NOM_APELIDO: string,
    NOM_FANTASIA: string,
    NUM_RG: string,
    DES_HISTORICO: string,
    NOM_CARGO: string,
    RAMO_ATIVIDADE: string,
    FONE: string,
    STA_POSSUI_NFE: string,
    WEBSITE: string,
    NUM_INSC_ESTATUAL: string,
    USER_CAD: number,
    DATA_CAD: string
}



export default function SuppliersGrid() {
    const [fornecedores, setFornecedores] = useState<declareSuppliers[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO', 'ID', 'ID_FORN'])

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const deactivate = (index: number) => {
        fetch(`http://localhost:3333/api/fornecedor/${index}`, {method: "PATCH"})
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    useEffect(() => {
        const getFornecedores = async () => {
            try {
                const answer = await fetch(`http://localhost:3333/api/fornecedor/all`)
                const fornecedores = await answer.json();
                if(answer.ok)
                {
                    setFornecedores(fornecedores);
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
        getFornecedores();
    }, [])
    return (
        <tbody className="divide-y divide-gray-200 bg-white">
            {fornecedores.map((supplier) => (
                <tr key={supplier.ID}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {supplier.NOM_FANTASIA}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {supplier.NOM_CONTATO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {supplier.EMAIL}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">

                        {supplier.FONE}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {supplier.NUM_CGC}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {supplier.NUM_CPF}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {supplier.NUM_RG}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {supplier.NUM_INSC_ESTATUAL}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {supplier.DES_HISTORICO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {supplier.NOM_CONTATO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {supplier.NOM_APELIDO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {supplier.NOM_CARGO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {supplier.WEBSITE}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {supplier.STA_POSSUI_NFE}

                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {supplier.RAMO_ATIVIDADE}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={(event) => {
                            openModal();
                            setCookie('ID_FORN', supplier.ID)
                        }}>
                            Editar<span className="sr-only">, {supplier.NOM_PESSOA}</span>
                        </a>
                        <CreateModal isOpen={isModalOpen} closeModal={closeModal} type='editSupplier' />
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={() => {
                            deactivate(supplier.ID)
                        }}>
                            Desativar
                        </a>
                    </td>
                    
                </tr>
            ))}
        </tbody>
    )
}
