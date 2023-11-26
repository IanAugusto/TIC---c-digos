import CreateModal from '../../../src/components/createModal';
import { Dashboard } from '../../../src/components/sidebar';
import { useState } from 'react';
import FilterCategories from '../../../src/components/filter';
import ListFinantialMovements from '../../../src/components/finantialMovement';
import { useCookies } from 'react-cookie' // hook para manipular cookies
import Login from '../login';

export default function FinantialMovement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO', 'ID'])

    const open = () => {
        setIsModalOpen(true);
    };

    const close = () => {
        setIsModalOpen(false);
    };

    const titleContent = <div>Movimentação Financeira</div>

    const mainContent =
        <main>
            <div className="py-4">
                <FilterCategories />
                <div className="-mx-4 mt-8 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Centro de custo
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Data da movimentação
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    E/S
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Origem de receita
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Valor
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Fornecedor
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Plano de contas
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Observação
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Usuário
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Data cadastro
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Editar</span>
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Excluir</span>
                                </th>
                            </tr>
                        </thead>
                        <ListFinantialMovements/>
                    </table>
                </div>
                <button
                    type="button"
                    className="absolute m-6 bottom-0 right-0 inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={open}
                >
                    Adicionar uma movimentação financeira
                </button>
                <CreateModal isOpen={isModalOpen} closeModal={close} type='finantialMovement' />
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