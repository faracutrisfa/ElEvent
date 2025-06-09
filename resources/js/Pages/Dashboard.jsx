import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-cream-500 min-h-screen">
                <div className="flex flex-col items-center justify-center">
                    <div className='font-extrabold text-4xl lg:text-6xl text-center w-1/2'>
                        <p className='text-blue-700'>hi, admin</p>
                        <p className='bg-mustard-400 rounded-lg p-2 -rotate-1'>
                            <span className='text-gradasi'>Welcome Back!</span>
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}