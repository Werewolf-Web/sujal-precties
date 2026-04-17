import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../../common-components/common-button/ButtonPrimary";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
// import { toast } from "react-toastify/unstyled";
// import InputType from "../../../common-components/common-input-type/InputType";

const UserTablePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [perPageRecords, setperPageRecords] = useState<number>(5);
  const [statusFilter, setstatusFilter] = useState<number>()
  const [satusData, setsatusData] = useState('')
  // const [filteredData, setFilteredData] = useState([]);
  // const [tableData, settableData] = useState()

  const [currentPage, setCurrentPage] = useState(1);
  // const perPageRecord = 5;

  const lastIndex = currentPage * perPageRecords;
  const firstIndex = lastIndex - perPageRecords;

  const {
    // Api call
    data = [],
    // isLoading,
    // error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/user");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    // delete mutaion
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

  // active / inactive filter ==


// // const activeData = data;
// if (statusFilter !== 2 ){
//   // const statusData = data.filter(
//   //   (item :any)=> {
//   //     item.is_active === statusFilter
//   //   }
//   // )
//  setsatusData(
//   data.filter((item:any) => item.is_active === statusFilter)
// );
// }
const filtered = data.filter((item:any)=>
 item.is_active === statusFilter
);

setsatusData(filtered);


  //           search feilter
const keyword = search.trim().toLowerCase();

const filteredData = data.filter((item:any) => {

  const matchSearch =
    item.fullName?.toLowerCase().includes(keyword) ||
    item.email?.toLowerCase().includes(keyword);

  const matchStatus =
    statusFilter === 2
      ? true
      : statusFilter === 1
      ? item.is_active === true
      : item.is_active === false;

  return matchSearch && matchStatus;
});
  //            search / filter    WITH  Pagination
  const currentData = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / perPageRecords);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  console.log(perPageRecords);
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 ">User Table</h1>
      <div className="flex items-center justify-between mb-4 me-4 gap-5">
        <div>
          <ButtonPrimary
            title="Back to Register"
            onClick={() => navigate("/register")}
            className="mb-4 px-4 py-2 text-sm"
          />
        </div>
        <div>
          <label >Status :{'  '}
          <select value={statusFilter} onChange={(e)=>{
            setstatusFilter(Number(e.target.value))
          }}>
            {/* <option value={"all"}>All</option> */}
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
          </label>
          {/* <button
            data-modal-target="popup-modal"
            data-modal-toggle="popup-modal"
            className="text-black bg-amber-300 box-border border border-transparent text-sm px-4 py-2.5 "
            type="button"
          >
            Toggle modal
          </button> */}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name..."
            className="border border-slate-700 h-9 w-50 pl-2 rounded-md"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button
            className="border w-18 bg-green-700 text-amber-50 font-semibold rounded-md"
            onClick={() => {
              setSearch("");
              // setFilteredData([]);
              // setstatusFilter();
            }}
          >
            Reset
          </button>
        </div>
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
            {currentData.length > 0 ? (
              currentData.map((user: any, index: number) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-slate-600">
                    {" "}
                    {(currentPage - 1) * perPageRecords + index + 1}
                  </td>
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
                      onClick={() =>
                        navigate(`/register-data-update/${user.id}`)
                      }
                      className="text-white bg-linear-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 ml-3"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-slate-600 text-center flex justify-content-center">
                  data not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-2.5 flex justify-center gap-x-8 h-10">
        <select
          value={perPageRecords}
          onChange={(e) => {
            setperPageRecords(Number(e.target.value));
          }}
        >
          <option value={5}>5</option>
          <option value={10}> 10</option>
          <option value={20}>20</option>
        </select>
        <button
          onClick={handlePrev}
          className="bg-cyan-500 h-10 w-20 rounded-xl text-white cursor-pointer"
        >
          Prev
        </button>

        <button className="bg-cyan-500 h-10 w-20 rounded-xl text-white">
          {currentPage}
        </button>

        <button
          onClick={handleNext}
          className="bg-cyan-500 h-10 w-20 rounded-xl text-white cursor-pointer"
        >
          Next
        </button>
        <div className="justify-items-end">
          <section>
            <span className="font-medium text-cyan-600">
              {firstIndex + 1}-{lastIndex} of {filteredData.length}
            </span>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserTablePage;
