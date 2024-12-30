import { useEffect, useState } from "react";
import api from "../api";
import Profile from "../components/Profile";
import Modal from "../components/Modal";
import "../styles/Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [resources, setResources] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getProfiles();
    getQuotes();
  }, []);
  const getProfiles = async () => {
    // fetch all users from the backend
    try {
      const response = await api.get("/users/");
      setUsers([...response.data.users]);
    } catch (err) {
      alert("Failed to fetch the users.");
    }
  };
  const getQuotes = async () => {
    try {
      const result = await api.get("/quotes/");
      setQuotes([...result.data.quotes]);
    } catch (err) {
      alert("Failed to fetch the quotes.");
    }
  };

  const organizeResources = (users, quotes) => {
    const newResources = users.reduce((acc, user) => {
      acc[user.id] = quotes.filter((quote) => quote.userId === user.id);
      return acc;
    }, {});
    setResources(newResources);
  };

  useEffect(() => {
    organizeResources(users, quotes);
  }, [users, quotes]);

  const handleProfileClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <h1
        className="center"
        style={{
          marginTop: "150px",
          textDecoration: "underline",
          textDecorationThickness: "1px",
          marginBottom: "50px",
        }}>
        Users
      </h1>
      <div className="users-container">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => handleProfileClick(user)}>
            <Profile
              id={`profile-${user.id}`}
              quotes={resources[user.id]} // pass the resources entry for user, so the component receives the quotes too
              username={user.username}
            />
          </div>
        ))}
        {isModalOpen && selectedUser && (
          <Modal
            user={selectedUser}
            quotes={resources[selectedUser.id]} // pass the resources entry for selectedUser, so the modal receives the quotes too
            onClose={closeModal}></Modal>
        )}
      </div>
    </div>
  );
}

export default Users;
