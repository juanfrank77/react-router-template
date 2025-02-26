import { useState } from 'react';
import { Input } from '~/components/input';

export default function SubApp() {
    const [data, setData] = useState('');

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <Input value={data} onChange={e => setData(e.target.value)} />
            <div className="mt-8 w-full max-w-4xl overflow-x-auto">
                <table className="w-full border-collapse bg-gray-100 shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4">John Doe</td>
                            <td className="px-6 py-4">john@example.com</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">{data}</td>
                            <td className="px-6 py-4">{data}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}