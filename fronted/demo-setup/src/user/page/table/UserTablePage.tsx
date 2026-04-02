import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../../common-components/common-button/ButtonPrimary";

type UserDetail = {
    id:string;
    fullName: string;
    email: string;
    password?: string;
    is_active: boolean;
}

const UserTablePage = () => {

    const [userDetail, setUserDetail] = useState<UserDetail[]>([])
    const navigate = useNavigate()

    const handledata = async () => {
        try {
            const res = await fetch("http://localhost:4000/user");

            if (!res.ok) {
                throw new Error("API error");
            }

            const data = await res.json();
            console.log(data);
            setUserDetail(data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const handledelete = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:4000/user/${(id)}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("API error");
            }

            const data = await res.json();
            console.log(data);
            handledata();
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        handledata();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">User Table</h1>
            <ButtonPrimary
                title="Back to Register"
                onClick={() => navigate('/register')}
                className="mb-4 px-4 py-2 text-sm"
            />

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Sr.No</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Full Name</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Email</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Password</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {userDetail.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 text-slate-600">{index + 1}</td>
                                <td className="px-6 py-4 text-slate-600">{item.fullName}</td>
                                <td className="px-6 py-4 text-slate-600">{item.email}</td>
                                <td className="px-6 py-4 text-slate-600">{item.password}</td>
                                <td className="px-6 py-4 text-slate-600">{item.is_active ? "Active" : "Inactive"}</td>
                                <td className="px-6 py-4 text-slate-600">
                                    <ButtonPrimary
                                        title="Delete"
                                        onClick={() => handledelete(item.id)}
                                        className="text-white bg-linear-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
                                    />
                                    <ButtonPrimary
                                        title="Edit"
                                        onClick={() => navigate(`/register-data-update/${item.id}`)}
                                        className="text-white bg-linear-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 ml-3"
                                    />
                                </td>
                            </tr>
                        ) )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTablePage;
