import { useState, useEffect } from "react"
import CreateModal from "./createModal";
import { useCookies } from 'react-cookie' // hook para manipular cookies

interface declareUser{
    ID: number,
    USUARIO: string,
    NOME: string,
    EMAIL: string,
    CELULAR: string,
    DDD_CELULAR: string
}



export default function QueryUsers() {
    const [usuarios, setUsuarios] = useState<declareUser[]>([])

    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO', 'ID', 'ID_USUARIO'])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const open = () => {
        setIsModalOpen(true);
    };

    const close = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const getUsuarios = async () => {
            try {
                const answer = await fetch(`http://localhost:3333/api/usuario/all`)
                const usuarios = await answer.json();
                if(answer.ok)
                {
                    setUsuarios(usuarios);
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
        getUsuarios();
    }, [])


    return (
        <tbody className="divide-y divide-gray-200 bg-white">
            {usuarios.map((user) => (
                <tr key={user.ID}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {user.NOME}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {user.USUARIO}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {user.EMAIL}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {user.DDD_CELULAR}
                        {user.CELULAR}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={(event) => {
                            open();
                            setCookie('ID_USUARIO', user.ID);
                        }}>
                            Editar<span className="sr-only">, {user.NOME}</span>
                        </a>
                    </td>
                    <CreateModal isOpen={isModalOpen} closeModal={close} type='editUser' />

                </tr>
            ))}
        </tbody>
    )
}
