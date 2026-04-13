
import { useNavigate, useParams } from "react-router-dom"
import ButtonPrimary from "../../../../common-components/common-button/ButtonPrimary"
import InputType from "../../../../common-components/common-input-type/InputType"


import { useEffect, useState } from "react"
type UserDetail = {
    id: string;
    fullName: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    is_active: boolean;
}


const RegisterDataUpdate = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [editData, setEditData] = useState<UserDetail | null>(null)
    const handleData = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:4000/user/${id}`)
            if (!res.ok) {
                throw new Error("API error")
            }
            const data = await res.json()
            setEditData(data)
        }
        catch (error) {
            console.log(error)
        }
    }


    const handleChange = (e: any) => {
        const { id, value, type, checked } = e.target;
        setEditData((prev) => prev ? ({
            ...prev,
            [id]: type === "checkbox" ? checked : value
        }) : null);
    };
    console.log(editData)
    useEffect(() => {
        if (id) {
            handleData(id);
        }
    }, [id]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // ✅ validation (frontend)
        if (editData?.password !== editData?.confirmPassword) {
            alert("Password not match");
            return;
        }

        try {
            const res = await fetch(`http://localhost:4000/user/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editData),
            });

            if (!res.ok) {
                throw new Error("Update failed");
            }

            const data = await res.json();
            console.log(data);

            navigate("/user/table");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {editData && (
                <div key={editData?.id}>
                    <div className="p-8">
                        <h1 className="text-3xl font-bold mb-6">User Table</h1>
                        <form onSubmit={handleSubmit} >
                            <div className="w-69 mb-5">
                                <InputType
                                    onChange={handleChange}
                                    id="fullName"
                                    label="Full Name"
                                    placeholder="John Doe"
                                    className="w-50"
                                    value={editData?.fullName}
                                />
                            </div>
                            <div className="w-69 mb-5">
                                <InputType
                                    onChange={handleChange}
                                    id="email"
                                    label="Email"
                                    placeholder="John Doe"
                                    className="w-50"
                                    value={editData?.email}
                                />
                            </div>
                            <div className="w-69 mb-5">
                                <InputType
                                    onChange={handleChange}
                                    id="password"
                                    label="Password"
                                    placeholder="John Doe"
                                    className="w-50"
                                    value={editData?.password}
                                />
                            </div>
                            <div className="w-69 mb-5">
                                <InputType
                                    onChange={handleChange}
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    placeholder="John Doe"
                                    className="w-50"
                                    value={editData?.confirmPassword}
                                />
                            </div>
                            <div >
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={editData?.is_active}
                                    onChange={handleChange}
                                />
                                <label > is active </label>
                            </div>
                            <div className="flex gap-3">
                            <div className="text-center pt-2">
                                <ButtonPrimary
                                    title="Update"
                                    type="submit"
                                    className="w-full"
                                />
                            </div>
                            <div className="text-center pt-2 ">
                                <ButtonPrimary
                                    title="Back to Table"
                                    onClick={() => navigate('/user/table')}
                                    className="mb-4 px-4 py-2 text-sm"
                                />
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default RegisterDataUpdate