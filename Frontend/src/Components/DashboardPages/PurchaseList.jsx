import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Panel from "../Panel";
import axios from "../../interceptors/axios";
import jsPDFInvoiceTemplate, {
  OutputType,
  jsPDF,
} from "jspdf-invoice-template";
import { toast } from "react-toastify";
import SideBar from "../SideBar";
function PurchaseList() {
  const [departments, setDepartments] = useState([]);
  const token = useSelector((store) => {
    return store.user.accesstoken;
  });
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get("api/user/purchase_order/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setDepartments(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  async function saveFile() {
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
            title: "Purchase Order Number",
            style: {
              width: 50,
            },
          },
          {
            title: "Purchase Date",
            style: {
              width: 50,
            },
          },
          {
            title: "Supplier",
            style: {
              width: 50,
            },
          },
          {
            title: "Total Value(in Rupees)",
            style: {
              width: 50,
            },
          },
        ],
        table: Array.from([...boom], (item) => [
          item.purchase_order_number,
          item.purchase_order_date,
          item.supplier,
          item.total_value,
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
          Purchase Orders
        </h1>
        <div className="relative my-8 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-5 py-3">Purchase order number</th>
                <th className="px-5 py-3">Purchase date</th>
                <th className="px-5 py-3">Supplier</th>
                <th className="px-5 py-3">Total value</th>
              </tr>
            </thead>
            <tbody>
              {departments &&
                departments.map((data, index) => (
                  <tr
                    key={index}
                    className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-5 py-3">{data.purchase_order_number}</td>
                    <td className="px-5 py-3">{data.purchase_order_date}</td>
                    <td className="px-5 py-3">{data.supplier}</td>
                    <td className="px-5 py-3">&#8377;{data.total_value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

export default PurchaseList;