import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(true);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <section className='bg-gradasi h-full min-h-screen font-Lexend'>
            <Head title="Log in" />

            <div className='container py-11'>
                <ApplicationLogo variant='yellow' />

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <div className='flex flex-col items-center mt-14'>
                    <div className='font-extrabold text-4xl lg:text-6xl text-center'>
                        <p className='text-white'>hi, admin</p>
                        <p className='bg-mustard-400 rounded-lg p-2 -rotate-1'>
                            <span className='text-gradasi'>Welcome Back!</span>
                        </p>
                    </div>

                    <form onSubmit={submit} className='w-full md:w-2/3 xl:w-1/2 mt-14'>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <div className="relative">
                                <TextInput
                                    id="password"
                                    type={showPassword ? 'password' : 'text'}
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full pr-10"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />

                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 focus:outline-none"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} className="w-5 h-5" />
                                </button>
                            </div>

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <PrimaryButton className="mt-14 bg-mustard-300 w-full rounded-full flex justify-center uppercase" disabled={processing}>
                            SIGN IN
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </section>
    );
}