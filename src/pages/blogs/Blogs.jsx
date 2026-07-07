import { useNavigate } from "react-router-dom";
import CommonTable from "../../components/CommonTable";
import HeadingSection from "../../components/HeadingSection";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useBlogs, useDeleteBlog } from "../../hooks/useBlogs";

export default function Blogs() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useBlogs();

  const { mutate: deleteBlogMutation } = useDeleteBlog();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlogMutation(id);
    }
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
    },
    {
      name: "Description",
      cell: (row) => (
        <div className="max-w-[400px] line-clamp-1">
          <div
            dangerouslySetInnerHTML={{
              __html: row.description,
            }}
          />
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
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
          <button
            onClick={() => {
              console.log(row, "alskdfjlaksdjflkasdkf");
              navigate(`/blogs/edit/${row._id}`);
            }}
          >
            <MdEdit size={20} className="text-primary-600" />
          </button>

          <button onClick={() => handleDelete(row._id)}>
            <MdDeleteOutline size={20} className="text-red-600" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div>
      <HeadingSection title="Blogs" link="/blogs/add" btnText="Add Blog" />

      <div className="w-full overflow-x-auto">
        <CommonTable
          columns={columns}
          data={data?.data || []}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
