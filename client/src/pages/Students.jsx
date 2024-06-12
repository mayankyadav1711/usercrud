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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

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

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    enrollmentNo: "",
    dateOfAdmission: "",
  };

  const StudentScheme = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .min(10, "Phone number should be 10 digits long")
      .required("Phone Number is required"),
    enrollmentNo: Yup.string().required("Enrollment is required"),
    dateOfAdmission: Yup.date().required("Date is required"),
  });
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
          className="modal w-[40rem]"
          overlayClassName="modal-overlay"
        >
          <h2>{editingId ? "Edit Student" : "Add Student"}</h2>
          <Formik
            initialValues={editingId ? form : initialValues}
            validationSchema={StudentScheme}
            onSubmit={(values, { setSubmitting }) => {
              if (editingId) {
                dispatch(updateStudent({ id: editingId, student: values }));
              } else {
                dispatch(addStudent(values));
              }
              setSubmitting(false);
              closeModal();
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="border p-2 mb-2 w-full"
                />
                <ErrorMessage name="name" component="div" />

                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="border p-2 mb-2 w-full"
                />
                <ErrorMessage name="email" component="div" />

                <Field
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="border p-2 mb-2 w-full"
                />
                <ErrorMessage name="phoneNumber" component="div" />
                <Field
                  type="text"
                  name="enrollmentNo"
                  placeholder="Enrollment No"
                  className="border p-2 mb-2 w-full"
                />
                <ErrorMessage name="enrollmentNo" component="div" />
                <Field
                  type="date"
                  name="dateOfAdmission"
                  className="border p-2 mb-2 w-full"
                />
                <ErrorMessage name="dateOfAdmission" component="div" />
                <div className="flex flex-row justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                    disabled={isSubmitting}
                  >
                    {editingId ? "Update" : "Add"} Student
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-500 text-white p-2 rounded"
                  >
                    Close
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    </div>
  );
};
