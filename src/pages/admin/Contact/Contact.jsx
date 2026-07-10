import react from "react";
import HeadingSection from "../../../components/HeadingSection";
import CommonTable from "../../../components/CommonTable";
import { useContact, useDeleteContact } from "../../../hooks/useContact";
import { MdDeleteOutline } from "react-icons/md";

export default function Contact() {
  const { data, isLoading, error } = useContact();
  console.log(data, "contact data");


  const { mutate: deleteContactMutation } = useDeleteContact();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      deleteContactMutation(id);
    }
  };

const columns = [
    {
      name: "Name",
      selector: (row) => row.firstName + " " + row.lastName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "phone number",
      selector: (row) => row.phone,
    },
    {
      name: "Message",
      selector: (row) => row.message,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      name: "Action",
      width: "120px",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <button onClick={() => handleDelete(row._id)}>
            <MdDeleteOutline size={20} className="text-red-600" />
          </button>
        </div>
      ),
    }
  ];
  return (
   <>
    
    <div>
      <HeadingSection title="Contact" link="/contact/add" btnText="Add Contact" />
      <div className="w-full overflow-x-auto">
        <CommonTable
          columns={columns}
          data={data?.data || []}
          loading={isLoading}
        />
      </div>
    </div>
    </>
  );
}