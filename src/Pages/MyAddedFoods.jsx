import { useEffect, useState } from "react";
import { MdBrowserUpdated } from "react-icons/md";
import useAxios from "../Hooks/useAxios";
import { Helmet } from "react-helmet-async";
import { HashLoader } from "react-spinners";
import useAuth from "../Hooks/useAuth";

const MyAddedFoods = () => {
    const [foods, setFoods] = useState([])
    const [loading, setLoading] = useState(false)
    const {user} = useAuth()
    const axiosSecure = useAxios()

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            const { data } = await axiosSecure(`/foods/${user?.email}`)
            setFoods(data)
            setLoading(false)
        }
        getData()
    }, [axiosSecure, user])
    return (
        <div className="bg-black py-24 pt-28">
            <Helmet>
                <title>GRANNY | MY ADDED FOOD ITEMS</title>
            </Helmet>
            <div className="text-center">
                <h2 className="text-5xl font-bold">My Added Food Items</h2>
                <p className="w-[550px] mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam illum voluptate quis. Voluptates totam culpa .</p>
            </div>
            <div className="container mt-8 p-2 mx-auto rounded-lg sm:p-4 bg-[#1B1616] dark:text-gray-800">
                <div className="overflow-x-auto">
                    <table className="min-w-full p-5 text-sm border">
                        <thead className="bg-black">
                            <tr className="text-left text-base font-bold">
                                <th className="p-5">Name</th>
                                <th className="p-5">Buyer Email</th>
                                <th className="p-5">Category</th>
                                <th className="p-5">Quantity</th>
                                <th className="p-5">Price</th>
                                <th className="p-5">Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ? <HashLoader color="#36d7b7" /> :
                                    foods?.map((food, i) => <tr key={i} className="border-y border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                        <td className="p-4">
                                            <p>{food.name}</p>
                                        </td>
                                        <td className="p-3">
                                            <p>{food.buyer_email}</p>
                                        </td>
                                        <td className="p-3">
                                            <p>{food.category}</p>
                                        </td>
                                        <td className="p-3 font-sans">
                                            <p>{food.quantity}</p>
                                        </td>
                                        <td className="p-3 font-sans">
                                            <p>{food.price}TK</p>
                                        </td>
                                        <td className="p-3 pl-8">
                                            <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" className="w-8 h-8">
                                            <path  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg> */}
                                                <MdBrowserUpdated className="text-3xl" />
                                            </button>
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyAddedFoods;