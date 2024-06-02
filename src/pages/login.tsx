import { GET_USERS } from '@/api/users/GET';
import { UserData } from '@/api/users/POST';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserData[]>([
        {
            createdAt: 0,
            email: '',
            password: '',
            id: '2',
            role: 'guest',
        },
    ]);

    const emailInputRef = useRef<HTMLInputElement | null>(null);
    const [emailInput, setEmailInput] = useState<string>('');
    const [emailError, setEmailError] = useState(false);

    const passwordInputRef = useRef<HTMLInputElement | null>(null);
    const [passwordInput, setPasswordInput] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const [isUserFound, setIsUserFound] = useState<boolean>(false);

    const [disabled, setDisabled] = useState<boolean>(true);

    useEffect(() => {
        if (emailInput.includes('@') && !emailError && passwordInput.length >= 8 && !passwordError) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [emailInput, passwordInput, emailError, passwordError]);

    useEffect(() => {
        const getUser = () => GET_USERS().then((users) => setUsers(users));
        getUser();
    }, []);

    const handleEmailInput = () => {
        if (emailInputRef.current) {
            setEmailInput(emailInputRef.current.value);

            // Check if the email is empty
            if (emailInputRef.current.value === '') {
                setEmailError(true);
            } else {
                setEmailError(false);
            }
        }
    };

    const handlePasswordInput = () => {
        if (passwordInputRef.current) {
            setPasswordInput(passwordInputRef.current.value);

            // Check if password length less than 8
            if (passwordInputRef.current.value.length < 8) {
                setPasswordError(true);
            } else {
                setPasswordError(false);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = users?.find((user) => user.email === emailInput && user.password === passwordInput);

        if (user) {
            localStorage.setItem(
                'User',
                JSON.stringify({
                    email: user.email,
                    role: user.role,
                })
            );
            setIsUserFound(false);
            return navigate('/dashboard');
        } else {
            setIsUserFound(true);
            return;
        }
    };

    const handlePageChange = () => navigate('/register');

    return (
        // Container
        <div className="h-screen w-screen bg-customBlack flex justify-center items-center">
            {/* Card */}
            <div className="flex flex-col justify-center items-center bg-white w-fit rounded-md p-4 gap-y-6">
                {/* Icon */}
                <div className="flex flex-col items-center gap-y-1 icon">
                    <div className="h-6 w-6 bg-customBlue rounded-full"></div>
                    <h1 className="text-customGray font-medium">Dashboard Kit</h1>
                </div>

                {/* Title */}
                <div className="flex flex-col items-center gap-y-1">
                    <h1 className="text-xl font-semibold">Log In to Dashboard Kit</h1>
                    <h1 className="text-customGray text-sm">Enter your email and password below</h1>
                </div>

                {/* Forms */}
                <form onSubmit={(e) => handleSubmit(e)} className="w-full flex flex-col gap-y-6" noValidate={true}>
                    <div className="flex flex-col gap-y-2">
                        <label className="font-medium text-customGray">EMAIL</label>
                        <div className="relative h-fit">
                            <input
                                className="p-3 border-customGray border rounded-md w-full"
                                placeholder="Email address"
                                ref={emailInputRef}
                                type="email"
                                value={emailInput}
                                onChange={() => handleEmailInput()}
                            />
                            {emailError && (
                                <span className="text-red-500 text-sm absolute block">Email is required</span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className="flex justify-between items-center w-full">
                            <label className="font-medium text-customGray ">PASSWORD</label>
                            <h1 className="font-medium text-sm text-customGray">Forgot password ?</h1>
                        </div>
                        <div className="relative h-fit">
                            <input
                                className="p-3 border-customGray border rounded-md w-full"
                                placeholder="Password"
                                ref={passwordInputRef}
                                onChange={() => handlePasswordInput()}
                                type="password"
                                value={passwordInput}
                            />
                            {passwordError && (
                                <span className="text-red-500 text-sm absolute block">
                                    Password minimum 8 characters
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        disabled={disabled}
                        className={`w-full  ${
                            disabled ? 'bg-customGray' : 'bg-customBlue'
                        } text-white font-medium py-2 mt-2 rounded-md`}
                        type="submit"
                    >
                        Log In
                    </button>
                </form>

                {isUserFound && <h1 className="text-red-500 text-sm">User not found</h1>}

                <h1 className="text-customGray text-sm">
                    Don't have an account?{' '}
                    <span onClick={() => handlePageChange()} className="text-customBlue font-medium cursor-pointer">
                        Sign Up
                    </span>
                </h1>
            </div>
        </div>
    );
};
