import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Button, Modal, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Drawer } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function StudentsPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false); 
  const [currentStudent, setCurrentStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    section: '',
    rollNumber: '',
    address: '',
    phone: '',
    dob: '',
    email: '',
    guardian: '',
    guardianPhone: '',
    gender: '',
    hobbies: ''
  });

  const fetchStudents = async () => {
    const studentsCollection = collection(db, 'students');
    const studentsSnapshot = await getDocs(studentsCollection);
    setStudents(studentsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    try {
      await addDoc(collection(db, 'students'), newStudent);
      setShowModal(false);
      fetchStudents(); 
      setNewStudent({}); 
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleEditStudent = async () => {
    if (currentStudent) {
      const studentRef = doc(db, 'students', currentStudent.id);
      try {
        await updateDoc(studentRef, newStudent);
        setShowModal(false);
        fetchStudents(); 
        setNewStudent({}); 
        setIsEdit(false); 
        setCurrentStudent(null); 
      } catch (error) {
        console.error('Error updating student:', error);
      }
    }
  };

  const handleDeleteStudent = async (studentId) => {
    const studentRef = doc(db, 'students', studentId);
    try {
      await deleteDoc(studentRef);
      fetchStudents(); 
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const openEditModal = (student) => {
    setIsEdit(true);
    setCurrentStudent(student);
    setNewStudent(student);
    setShowModal(true);
  };

  const openAddModal = () => {
    setIsEdit(false); 
    setNewStudent({}); 
    setShowModal(true);
  };

  const handleViewStudent = (student) => {
    alert(`Student Details:\nName: ${student.name}\nClass: ${student.class}\nSection: ${student.section}\nRoll No: ${student.rollNumber}\nEmail: ${student.email}`);
  };

  const handleNavigateToStudents = () => {
    navigate('/students'); 
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
        <Drawer
          sx={{
            width: 250,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 250,
              boxSizing: 'border-box',
              backgroundColor: '#fefefe',
              color: '#fff',
            },
          }}
          variant="permanent"
          anchor="left"
        >
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" color="black" sx={{ fontWeight: 'bold', mb:2 }}>Dashboard</Typography>
          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            sx={{ mt: 2 }} 
            onClick={handleNavigateToStudents}
          >
            Students Page
          </Button>
          <Button 
            fullWidth 
            variant="contained" 
            color="error"
            sx={{ mt: 2 }} 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#ededf0' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', }}>
          Students List
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={openAddModal}
          sx={{ mb: 2 }}
        >
          Add Student
        </Button>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Roll Number</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      onClick={() => handleViewStudent(student)} 
                      sx={{ mr: 1 }}
                    >
                      <Visibility />
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="warning" 
                      onClick={() => openEditModal(student)} 
                      sx={{ mr: 1 }}
                    >
                      <Edit />
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Student Modal */}
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%', 
            maxWidth: 600, 
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            overflowY: 'auto',
            maxHeight: '80vh',
          }}>
            <Typography variant="h6" gutterBottom>
              {isEdit ? 'Edit Student' : 'Add Student'}
            </Typography>
            <form>
              <TextField 
                label="Name"
                fullWidth
                margin="normal"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              />
              <TextField 
                label="Class"
                fullWidth
                margin="normal"
                value={newStudent.class}
                onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
              />
              <TextField 
                label="Section"
                fullWidth
                margin="normal"
                value={newStudent.section}
                onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
              />
              <TextField 
                label="Roll Number"
                fullWidth
                margin="normal"
                value={newStudent.rollNumber}
                onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
              />
              {/* Add other form fields */}
              <TextField 
                label="Address"
                fullWidth
                margin="normal"
                value={newStudent.address}
                onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
              />
              <TextField 
                label="Phone"
                fullWidth
                margin="normal"
                value={newStudent.phone}
                onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
              />
              <TextField 
                label="Email"
                fullWidth
                margin="normal"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              />
              <TextField 
                label="Guardian Name"
                fullWidth
                margin="normal"
                value={newStudent.guardian}
                onChange={(e) => setNewStudent({ ...newStudent, guardian: e.target.value })}
              />
              <TextField 
                label="Guardian Phone"
                fullWidth
                margin="normal"
                value={newStudent.guardianPhone}
                onChange={(e) => setNewStudent({ ...newStudent, guardianPhone: e.target.value })}
              />
              <TextField 
                label="Gender"
                fullWidth
                margin="normal"
                value={newStudent.gender}
                onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
              />
              <TextField 
                label="Hobbies"
                fullWidth
                margin="normal"
                value={newStudent.hobbies}
                onChange={(e) => setNewStudent({ ...newStudent, hobbies: e.target.value })}
              />
            </form>
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={isEdit ? handleEditStudent : handleAddStudent}
                sx={{ mr: 2 }}
              >
                {isEdit ? 'Update' : 'Submit'}
              </Button>
              <Button variant="outlined" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default StudentsPage;
