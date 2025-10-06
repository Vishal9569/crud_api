import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddUser = () => {
  const { id } = useParams();  
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");  
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");

  
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/user/${id}`)
        .then((res) => {
          const user = res.data;
          setUserId(user.id);
          setUsername(user.username);
          setNumber(user.number);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !username || !number) {
      alert("All fields are required!");
      return;
    }

    try {
      if (id) {
      
        await axios.patch(`http://localhost:8080/update-user/${id}`, {
          username,
          number: Number(number),
        });
        alert("User updated successfully!");
      } else {
        
        await axios.post("http://localhost:8080/add-user", {
          id: Number(userId),
          username,
          number: Number(number),
        });
        alert("User added successfully!");
      }
      navigate("/all-users");
    } catch (error) {
      console.error(error);
      alert("Error saving user!");
    }
  };

  return (
    <div>
      <h2>{id ? "Update User" : "Add User"} Detail</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter id:</label>
          <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} disabled={!!id} />
        </div>
        <div>
          <label>Enter username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Enter number:</label>
          <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>
        <button type="submit">{id ? "Update User" : "Add User"}</button>
      </form>
    </div>
  );
};

export default AddUser;
