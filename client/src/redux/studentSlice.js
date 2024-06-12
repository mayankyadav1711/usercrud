import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

const initialState = {
  students: [],
  status: 'idle',
  error: null,
};

// Async Thunks for CRUD operations
export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await axios.get('/api/students');
  return response.data;
});

export const addStudent = createAsyncThunk('students/addStudent', async (student) => {
  const response = await axios.post('/api/students', student);
  return response.data;
});

export const updateStudent = createAsyncThunk('students/updateStudent', async ({ id, student }) => {
  const response = await axios.put(`/api/students/${id}`, student);
  return response.data;
});

export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id) => {
  await axios.delete(`/api/students/${id}`);
  return id;
});

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(student => student._id === action.payload._id);
        state.students[index] = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(student => student._id !== action.payload);
      });
  },
});

export default studentsSlice.reducer;
