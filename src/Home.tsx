import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Popup from './Popup';
import './Home.css';

interface resultDataFormat {
    id: string;
    amount: number;
    due_date: string;
    description: string;
    user_id: string;
}

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [resultData, setResultData] = useState<resultDataFormat[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<any | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedSession = localStorage.getItem('isLoggedIn');
        if (storedSession) {
            setIsLoggedIn(true);
        } else {
            navigate('/');
        }
    }, []);

    const handleRowClick = (data: any) => {
        setSelectedData(data);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch('http://localhost:3000/invoices');
                if (response.ok) {
                    const data = await response.json();
                    setResultData(data);
                } else {
                    console.error('Failed to fetch content:', response.statusText);
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        };

        fetchContent();
    }, []);

    const formatCurrency = (value: number | bigint | null) => {
        if (value == null) return '';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(value);
    };

    const formatDate = (value: string) => {
        if (value == null) return '';
        return new Date(value).toLocaleDateString('en-US');
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        navigate('/');
    };

    return (
        <>
        <div className="container">
            <div className="menu">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Dashboards</a></li>
                    <li><a href="#">Invoices</a></li>
                    <li><a href="#">Bills</a></li>
                    <li><a href="#">Expenses</a></li>
                    <li><a href="#">Reports</a></li>
                    <li><a href="#">Accounting</a></li>
                    <li><a href="#" onClick={handleLogout}>Logout</a></li>
                </ul>
            </div>
            <div className="content">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th>Description</th>
                            <th>User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultData.map(item => (
                            <tr onClick={() => handleRowClick({
                                id: item.id, 
                                amount: formatCurrency(item.amount),
                                due_date: formatDate(item.due_date),
                                description: item.description,
                                user_id: item.user_id
                            })} key={item.id}>
                                <td>{item.id}</td>
                                <td>{formatCurrency(item.amount)}</td>
                                <td>{formatDate(item.due_date)}</td>
                                <td>{item.description}</td>
                                <td>{item.user_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            
        </div>
        <div className="popup">
                {isPopupOpen && <Popup onClose={handleClosePopup} data={selectedData} />}
            </div>
        </>
    );
};

export default Home;