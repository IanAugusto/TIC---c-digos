import CreateModal from '../../../src/components/createModal';
import { Dashboard } from '../../../src/components/sidebar'
import { useState } from 'react'
import ListCostCenter from '../../../src/components/costCenter';
import { useCookies } from 'react-cookie' // hook para manipular cookies
import Login from '../login';

export default function CostCenter() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO', 'ID'])
    const open = () => {
        setIsModalOpen(true);
    };

    const close = () => {
        setIsModalOpen(false);
    };

    const titleContent = <div>Centro de Custos</div>

    const mainContent =
        <main>
            <div className="py-4">
                <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Descrição	
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Status
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Sigla
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Data Inicial
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Data Final
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Observações
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Usuário Cadastrado
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Criado em
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Editar</span>
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Exluir</span>
                                </th>
                            </tr>
                        </thead>
                        <ListCostCenter />
                    </table>
                </div>
                <button
                    type="button"
                    className="absolute m-6 bottom-0 right-0 inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={open}
                >
                    Adicionar um novo centro de custos

                </button>
                <CreateModal isOpen={isModalOpen} closeModal={close} type='costCenter' />
            </div>
        </main>;

if(cookie.USUARIO == undefined){
    return <Login/>
}else{
    return (
        <Dashboard main={mainContent} title={titleContent} />
    )
}
}