import React, { useState, useEffect } from 'react';
import './Orders.css';
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import Order from './Order';

const Orders = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc') //order itmes in returned snapshot by date created
            .onSnapshot(snapshot => ( //return snapshot of the database
                setOrders(snapshot.docs.map(item => ({
                    id: item.id,
                    data: item.data()
                })))
            ))
        } else {
            setOrders([]);
        }
        
    }, [user]) //with brackets makes the function different

    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders-order">
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    );
}
 
export default Orders;