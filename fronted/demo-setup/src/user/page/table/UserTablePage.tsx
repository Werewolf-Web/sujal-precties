import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../../common-components/common-button/ButtonPrimary";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify/unstyled";
import InputType from "../../../common-components/common-input-type/InputType";

const UserTablePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/user");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`http://localhost:4000/user/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 ">User Table</h1>
      <div className="d-flex items-center justify-between mb-4 me-4 gap-5">

      <ButtonPrimary
        title="Back to Register"
        onClick={() => navigate("/register")}
        className="mb-4 px-4 py-2 text-sm"
        />
    <input type="search" placeholder="Search by name..." className="border border-slate-200" />
        </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Sr.No</th>
              <th className="px-6 py-4 font-semibold text-slate-700">
                Full Name
              </th>
              <th className="px-6 py-4 font-semibold text-slate-700">Email</th>
              <th className="px-6 py-4 font-semibold text-slate-700">
                Password
              </th>
              <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data?.map((user: any, index: number) => (
              <tr key={index}>
                <td className="px-6 py-4 text-slate-600">{index + 1}</td>
                <td className="px-6 py-4 text-slate-600">{user.fullName}</td>
                <td className="px-6 py-4 text-slate-600">{user.email}</td>
                <td className="px-6 py-4 text-slate-600">{user.password}</td>
                <td className="px-6 py-4 text-slate-600">
                  {user.is_active ? "Active" : "Inactive"}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <ButtonPrimary
                    title="Delete"
                    onClick={() => handleDelete(user.id)}
                    className="text-white bg-linear-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
                  />
                  <ButtonPrimary
                    title="Edit"
                    onClick={() => navigate(`/register-data-update/${user.id}`)}
                    className="text-white bg-linear-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 ml-3"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTablePage;
