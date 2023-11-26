import CreateModal from '../../components/createModal';
import ListProducts from '../../components/products'
import { Dashboard } from '../../components/sidebar'
import { useState } from 'react'
import FilterCategories from '../../components/filter';
import { useCookies } from 'react-cookie' // hook para manipular cookies
import Login from '../login';

export default function Products() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['USUARIO', 'ID'])

    const open = () => {
        setIsModalOpen(true);
    };

    const close = () => {
        setIsModalOpen(false);
    };

    const titleContent = <div>Produtos</div>

    const mainContent =
        <main>
            <div className="py-4">
                <FilterCategories />
                <div className="-mx-4 mt-8 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Descrição
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Código Material
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Tipo do produto
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Máx. estoque
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Mín. em estoque
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Marca
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Status
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Unidade de medida
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Data
                                </th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Usuário 
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Editar</span>
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Excluir</span>
                                </th>
                            </tr>
                        </thead>
                        <ListProducts />
                    </table>
                </div>
                <button
                    type="button"
                    className="absolute m-6 bottom-0 right-0 inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={open}
                >
                    Adicionar um novo produto
                </button>
                <CreateModal isOpen={isModalOpen} closeModal={close} type='product' />
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