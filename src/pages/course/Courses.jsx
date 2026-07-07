import { MdEdit, MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import HeadingSection from "../../components/HeadingSection";
import CommonTable from "../../components/CommonTable";
import { useCourses, useDeleteCourse } from "../../hooks/useCourses";
export default function Courses() {
  const navigate = useNavigate();
  const { data, isLoading } = useCourses();
  const { mutate: deleteCourseMutation } = useDeleteCourse();
  const handleDelete = (id) => {
    if (window.confirm("Delete this course?")) {
      deleteCourseMutation(id);
    }
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },

    {
      name: "Price",
      selector: (row) => `₹${row.price}`,
    },

    {
      name: "Discount Price",
      selector: (row) => `₹${row.discountPrice}`,
    },

    {
      name: "Level",
      selector: (row) => row.level,
    },

    {
      name: "Status",
      selector: (row) => row.status,
    },

    {
      name: "Action",
      width: "150px",

      cell: (row) => (
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(`/courses/edit/${row._id}`)}>
            <MdEdit size={20} className="text-primary" />
          </button>

          <button onClick={() => handleDelete(row._id)}>
            <MdDeleteOutline size={20} className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <HeadingSection
        title="Courses"
        link="/courses/add"
        btnText="Add Course"
      />

      <CommonTable
        columns={columns}
        data={data?.data || []}
        loading={isLoading}
      />
    </>
  );
}
