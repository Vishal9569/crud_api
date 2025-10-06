import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/all-user");
        setUsers(res.data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:8080/delete-user/${_id}`);
      setUsers(users.filter((u) => u._id !== _id));
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  return (
    <>
      <h2>All User Data</h2>
      <button onClick={() => navigate("/add-user")}>Add User</button>
      <table>
        <thead>
          <tr>
            <th>UserId</th>
            <th>Username</th>
            <th>Number</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u._id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.number}</td>
                <td>
                  <button onClick={() => navigate(`/edit-user/${u._id}`)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(u._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default AllUser;
