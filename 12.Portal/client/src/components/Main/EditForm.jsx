import React, { useState } from "react";
import axios from "axios";
// import styles from "./styles.module.css";

const EditForm = ({ data, setIsEdit, fetchSubmittedData }) => {
  const [studentData, setStudentData] = useState(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentId =  studentData._id
    try {
      const response = await axios.put(
        "http://localhost:5713/api/tutor/updateData/",
        {
          studentId,
          name: studentData.name,
          rollNo: studentData.rollNo,
          course: studentData.course,
        }
      );
      console.log("API Response Data:", response.data);
      fetchSubmittedData()
      setIsEdit(false)
    //   window.location.reload();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Student Name:
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={(e) =>
              setStudentData({ ...studentData, name: e.target.value })
            }
          />
        </label>

        <label>
          Roll Number:
          <input
            type="text"
            name="rollNo"
            value={studentData.rollNo}
            onChange={(e) =>
              setStudentData({ ...studentData, rollNo: e.target.value })
            }
          />
        </label>

        <label>
          Course:
          <select
            name="course"
            value={studentData.course}
            onChange={(e) =>
              setStudentData({ ...studentData, course: e.target.value })
            }
          >
            <option value="React js">React JS</option>
            <option value="Node js">Node JS</option>
            <option value="Next js">Next JS</option>
            <option value="Three js">Three JS</option>
            {/* Add more options as needed */}
          </select>
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditForm;
