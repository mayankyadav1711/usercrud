import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../redux/studentSlice";
import Sidebar from "../components/sidebar";
import Modal from "react-modal";
Modal.setAppElement("#root");

export const Students = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const studentStatus = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    enrollmentNo: "",
    dateOfAdmission: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    if (studentStatus === "idle") {
      dispatch(fetchStudents());
    }
  }, [studentStatus, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateStudent({ id: editingId, student: form }));
    } else {
      dispatch(addStudent(form));
    }
    setForm({
      name: "",
      email: "",
      phoneNumber: "",
      enrollmentNo: "",
      dateOfAdmission: "",
    });
    setEditingId(null);
    closeModal();
  };

  const handleEdit = (student) => {
    openModal();
    const formattedStudent = {
      ...student,
      dateOfAdmission: student.dateOfAdmission.split("T")[0],
    };
    setForm(formattedStudent);
    setEditingId(student._id);
  };

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = `0${d.getDate()}`.slice(-2);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setForm({
      name: "",
      email: "",
      phoneNumber: "",
      enrollmentNo: "",
      dateOfAdmission: "",
    });
    setEditingId(null);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedStudents = filteredStudents.sort((a, b) => {
    if (sortConfig.key) {
      let aKey = a[sortConfig.key];
      let bKey = b[sortConfig.key];

      if (sortConfig.key === "dateOfAdmission") {
        aKey = new Date(aKey);
        bKey = new Date(bKey);
      }

      if (aKey < bKey) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aKey > bKey) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="container p-4 p-6 ml-64">
        <div className="flex flex-row justify-between mb-10">
          <h1 className="text-2xl font-bold mb-4">Students</h1>
          <button
            onClick={openModal}
            className="bg-green-500 text-white p-2 rounded ml-2"
          >
            Add Student
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        {studentStatus === "loading" && <p>Loading...</p>}
        {studentStatus === "failed" && <p>{error}</p>}
        {studentStatus === "succeeded" && (
          <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-header-group">
              <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative ">
                <th
                  onClick={() => requestSort("name")}
                  className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-grey-500 text-left block md:table-cell cursor-pointer"
                >
                  Name
                </th>
                <th
                  onClick={() => requestSort("email")}
                  className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-grey-500 text-left block md:table-cell cursor-pointer"
                >
                  Email
                </th>
                <th
                  onClick={() => requestSort("phoneNumber")}
                  className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-grey-500 text-left block md:table-cell cursor-pointer"
                >
                  Phone Number
                </th>
                <th
                  onClick={() => requestSort("enrollmentNo")}
                  className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-grey-500 text-left block md:table-cell cursor-pointer"
                >
                  Enrollment No
                </th>
                <th
                  onClick={() => requestSort("dateOfAdmission")}
                  className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-grey-500 text-left block md:table-cell cursor-pointer"
                >
                  Date of Admission
                </th>
                <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {sortedStudents.map((student) => (
                <tr
                  key={student._id}
                  className="bg-gray-100 border border-grey-500 md:border-none block md:table-row"
                >
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    {student.name}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    {student.email}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    {student.phoneNumber}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    {student.enrollmentNo}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    {formatDate(student.dateOfAdmission)}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <button
                      onClick={() => handleEdit(student)}
                      className="bg-yellow-500 text-white p-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add/Edit Student"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>{editingId ? "Edit Student" : "Add Student"}</h2>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              name="enrollmentNo"
              placeholder="Enrollment No"
              value={form.enrollmentNo}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="date"
              name="dateOfAdmission"
              value={form.dateOfAdmission}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
            />
            <div className="flex flex-row justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                {editingId ? "Update" : "Add"} Student
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Close
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};
