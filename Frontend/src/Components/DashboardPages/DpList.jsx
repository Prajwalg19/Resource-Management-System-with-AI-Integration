import { useEffect, useState } from "react";
import jsPDFInvoiceTemplate, {
  OutputType,
  jsPDF,
} from "jspdf-invoice-template";
import { useSelector } from "react-redux";
import axios from "../../interceptors/axios";
import Panel from "../Panel";
import Button from "../Button";
import { toast } from "react-toastify";
import SideBar from "../SideBar";
function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const store = useSelector((store) => {
    return store;
  });
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get("api/user/department/", {
          headers: {
            Authorization: `Bearer ${store.user.accesstoken}`,
          },
        });
        setDepartments(response.data);
      } catch (error) {}
    }
    fetchData();
  }, [store.user]);
  async function saveFile() {
    console.log("ok");
    const [...boom] = departments;
    let props = {
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: "Invoice",
      orientationLandscape: false,
      compress: true,
      business: {
        name: "Global Academy of Technology",
        address:
          "Rajarajeshwarinagar, Ideal Homes Township, Bangalore-560098, Karnataka, India",
        phone: "+919243190105",
        email: "info@gat.ac.in",
        website: "https://gat.ac.in",
      },
      invoice: {
        invGenDate: Date(),
        headerBorder: false,
        tableBodyBorder: false,
        header: [
          {
            title: "SI",
            style: {
              width: 50,
            },
          },
          {
            title: "Department Number",
            style: {
              width: 50,
            },
          },
          {
            title: "Department Name",
            style: {
              width: 50,
            },
          },
          {
            title: "HOD Name",
            style: {
              width: 50,
            },
          },
        ],
        table: Array.from([...boom], (item, index) => [
          index + 1,
          item.department_number,
          item.department_name,
          item.hod_name,
        ]),
      },
      footer: {
        text: "The invoice is created on a computer and is valid without the signature and stamp.",
      },
      pageEnable: true,
      pageLabel: "Page ",
    };
    try {
      const pdfObject = jsPDFInvoiceTemplate(props);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="flex">
      <SideBar />
      <Panel departments={departments} saveFile={saveFile}>
        <h1 className="w-full pt-4 my-4 text-3xl font-bold text-center">
          Department List
        </h1>
        <div className="relative my-8 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-5 py-3">Department Number</th>
                <th className="px-5 py-3">Department Name</th>
                <th className="px-5 py-3">HOD Name</th>
              </tr>
            </thead>
            <tbody>
              {departments &&
                departments.map((data, index) => (
                  <tr
                    key={index}
                    className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{data.department_number}</td>
                    <td className="px-6 py-4">{data.department_name}</td>
                    <td className="px-6 py-4">{data.hod_name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

export default DepartmentList;
