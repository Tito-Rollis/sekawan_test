import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
    const [role, setRole] = useState('guest');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const [fakeImg, setfakeImg] = useState('');

    useEffect(() => {
        const FAKE_IMG = () =>
            axios.get('https://randomuser.me/api/').then((res) => setfakeImg(res.data.results[0].picture.thumbnail));
        FAKE_IMG();

        const getData = localStorage.getItem('User');

        if (getData) {
            setEmail(JSON.parse(getData).email);
            setRole(JSON.parse(getData).role);
        } else {
            setRole('guest');
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('User');
        navigate('/login');
    };

    return (
        <div className="w-screen h-screen flex flex-col bg-customGray p-8">
            <div className="flex flex-col gap-y-6 w-full h-full">
                <div className="flex justify-between items-center gap-x-6">
                    {role === 'admin' && (
                        <h1 className="text-customBlack font-semibold text-lg">
                            This is Dashboard Page and all the features
                        </h1>
                    )}
                    <div className="flex items-center gap-x-8">
                        <div className="flex items-center gap-x-2">
                            <h1 className="text-customBlack">{email}</h1>
                            <img className="w-9 h-9 rounded-full" src={fakeImg} alt="" />
                        </div>
                        <button
                            onClick={() => handleLogout()}
                            className="text-white font-medium cursor-pointer py-1 px-2 bg-orange-500 rounded-md"
                        >
                            Log out
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center grow">
                    <h1 className="font-normal text-customBlack">No tickets were created</h1>
                    <button className="bg-customBlue text-white py-2 px-4 rounded-md">Create Task</button>
                </div>
            </div>
        </div>
    );
};
