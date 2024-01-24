import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import EditForm from "./EditForm";

const Main = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [updateData, setUpdateData] = useState({
    name: "",
    rollNo: "",
    course: "React js",
  })

  const [studentData, setStudentData] = useState({
    name: "",
    rollNo: "",
    course: "React js",
  });

  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    fetchSubmittedData();
  }, []);

  const fetchSubmittedData = async () => {
    try {
      const authToken = localStorage.getItem("token");
      console.log("Token sent in request:", authToken);

      const response = await axios.get("http://localhost:5713/api/tutor/getSubmittedData", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("API Response Data:", response.data);

      if (Array.isArray(response.data)) {
        setSubmittedData(response.data);
      } else {
        console.error("Invalid data format received:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleDelete = async (studentId) => {
    try {
      const response = await axios.delete("http://localhost:5713/api/tutor/deleteData/" + studentId );
      console.log("API Response Data:", response.data);
      fetchSubmittedData()
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleUpdate = (data) => {
    setUpdateData(data)
    setIsEdit(true)  
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem("token");
      console.log("Token sent in request:", authToken);

      const response = await axios.post("http://localhost:5713/api/tutor/getTutorId", { token: authToken });

      const tutorId = response.data.tutorId;

      const submitResponse = await axios.post("http://localhost:5713/api/tutor/submitStudentData", {
        tutorId,
        name: studentData.name,
        rollNo: studentData.rollNo,
        course: studentData.course,
      });

      console.log("Submit Response:", submitResponse.data);

      fetchSubmittedData();

      setStudentData({
        name: "",
        rollNo: "",
        course: "js",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Tutor Portal</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className={styles.form_container}>
        {!isEdit && <form onSubmit={handleSubmit}>
          <label>
            Student Name:
            <input
              type="text"
              name="name"
              value={studentData.name}
              onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
            />
          </label>

          <label>
            Roll Number:
            <input
              type="text"
              name="rollNo"
              value={studentData.rollNo}
              onChange={(e) => setStudentData({ ...studentData, rollNo: e.target.value })}
            />
          </label>

          <label>
            Course:
            <select
              name="course"
              value={studentData.course}
              onChange={(e) => setStudentData({ ...studentData, course: e.target.value })}
            >
              <option value="React js">React JS</option>
              <option value="Node js">Node JS</option>
              <option value="Next js">Next JS</option>
              <option value="Three js">Three JS</option>
              {/* Add more options as needed */}
            </select>
          </label>

          <button type="submit" >ADD STUDENT</button>
        </form>}
        {isEdit && <EditForm data={updateData} setIsEdit={setIsEdit} fetchSubmittedData={fetchSubmittedData}/>}
      </div>

      <div className={styles.table_container}>
        <h2 style={{textAlign: "center"}}>Students List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Course</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data) => (
              <tr key={data._id}>
                <td>{data.name}</td>
                <td>{data.rollNo}</td>
                <td>{data.course}</td>
                <td><button onClick={()=>{handleDelete(data._id)}} className={styles.delete}>Delete</button></td>
                <td><button onClick={()=>{handleUpdate(data)}} className={styles.update}>Update</button></td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
