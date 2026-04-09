import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, deleteOrders, selectOrder} from "../store/orderSlice";
import { type AppDispatch } from "../store";

const OrderList = () => {
    const dispatch = useDispatch<AppDispatch>()
    const orders = useSelector(selectOrder);


    useEffect(() => { dispatch(fetchOrders()); }, [dispatch]);

    return (
        <div>
            {/*Order Container*/}
            <div className="p-10 flex flex-col">

                <div className="gap-10 flex flex-col">

                    {orders.map(order => (
                        /*Left Side*/
                        <div className="p-10 rounded-3xl flex justify-between items-center border-3 border-gray-300">
                            <div key={order.id} className="flex flex-col text-lg gap-3">
                                <h1>{order.tour_name}</h1>
                                <h1>{order.date}</h1>
                                <h1>{order.hotel_name}</h1>
                                <h1>{order.guest_number}</h1>
                            </div>
                            <div className="gap-10 flex flex-col">
                                <button className="p-3 text-red-500 border border-red-500 rounded-lg
                                hover:text-white hover:bg-red-500 transition-all duration-500"
                                onClick={() => dispatch(deleteOrders(order.id))}>Delete</button>
                            </div>
                        </div>
                    ))
                    }

                </div>
            </div>
        </div>
    )
}

export default OrderList;