import  { useState,useEffect } from "react";
import styled from "styled-components";
import TeamCard from "../components/TeamCard"
import {toast} from "react-toastify";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Oval from "react-loading-icons/dist/esm/components/oval";
import {useNavigate} from "react-router-dom";
const Backend_Url = import.meta.env.VITE_BACKEND_URL;



const AddTeamContainer = styled.div`
  color: #ff00ff;
  padding: 20px;
  min-height: 100vh;
  position: relative;
background-color: rgb(37, 44, 59);`;

const NeonButton = styled.button`
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  color: #fff;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 0.3125rem;
  cursor: pointer;
  width: 10rem;
  transition: background 0.3s ease;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    background: linear-gradient(45deg, #00ffff, #ff00ff);
  }

  @media (max-width: 768px) {
    width: 8rem;
    padding: 0.5rem 1rem;
  }

  @media (max-width: 480px) {
    width: 6rem;
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
     top:7px;
    right:5px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${(props) => (props.show ? "flex" : "none")};
  z-index: 9999;
  justify-content: center;
  align-items: center;
  border: 2px solid #ff00ff;
`;

const ModalContainer = styled.div`
  background-color: #333; /* Gray background */
  color: #ff00ff; /* Neon pink text */
  padding: 20px;
  width: 80%;
  max-width: 500px;
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  color: #ff00ff;
  border: none;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: #00ffff;
  }
`;

const RadioButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 20px;
  width: 100%;

  label {
    margin-right: 10px;
    font-size: 16px;
    cursor: pointer;
    color: #ff00ff;
  }

  input[type="radio"] {
    margin-right: 5px;
  }
`;

const TeamMembersContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TeamMemberInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;

  input {
    width: 70%;
    padding: 8px;
    border: 1px solid #ff00ff;
    background-color: #222;
    color: #ff00ff;
    border-radius: 4px;
    outline: none;
  }

  button {
    background-color: transparent;
    color: #ff00ff;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  border: none;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #00ffff, #ff00ff);
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
  }
`;

const TeamCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 items per row on large screens */
  gap: 20px;
  justify-items: center;
  margin-top: 60px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* 3 items per row on medium screens */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 items per row on tablets */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 item per row on mobile */
  }
`;

const CardContainer = styled.div`
  background: linear-gradient(to top, rgb(37, 44, 59), #ff00ff);
  color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 0.75rem;
  width: 13rem;
  transition: transform 0.5s;
  position: relative;
  &:hover {
    transform: scale(1.05);
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;

const TeamImage = styled.img`
  width: 100%;
  height: 8rem;
  object-fit: cover;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
`;

const Table = styled.table`
  width: 100%;
`;

const TableCell = styled.td`
  vertical-align: top;
  padding-left: ${(props) => (props.pl ? '0.5rem' : '0')};
`;

const Title = styled.h2`
  font-size: 0.75rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const Subtitle = styled.h3`
  font-size: 0.75rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const Text = styled.p`
  margin-bottom: 0.125rem;
  font-size: 0.625rem;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 0.5rem;
  font-size: 0.625rem;
`;

const ListItem = styled.li``;

const IconButton = styled.button`
  color: ${(props) => props.color};
  &:hover {
    color: ${(props) => props.hoverColor};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const ViewButton = styled.button`
background: linear-gradient(45deg, #ff00ff, #00ffff);  color: white;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.625rem;
  &:hover {
    background: linear-gradient(45deg, #00ffff, #ff00ff);
  }
`;

const CenterSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color:#ff00ff;
`;
const AddTeam = () => {
  const [showModal, setShowModal] = useState(false);
  const [teamID, setTeamID] = useState("");
  const [teamMembers, setTeamMembers] = useState(["", "", ""]);
  const [teamData, setTeamData] = useState([]); // State for storing fetched team data
  const [isEditing, setIsEditing] = useState(false); // New state to check if we're editing a team
  const [editingTeamID, setEditingTeamID] = useState(""); // Store the teamID of the team being edited
  const [remainingteams,setremainingteams] = useState([]);
  const [loading,setLoading] = useState(true);


  const navigate = useNavigate();

  const handleOpenModal = (team = null) => {
    console.log("isEditing:",isEditing);
    
    if (team) {
      setIsEditing(true); // Set to true when editing
      setTeamID(team.teamID);
      setTeamMembers(team.teamMembers || ["", "", ""]);
      setEditingTeamID(team.teamID); // Store the teamID for editing
    } else {
      if(teamData.length == 10)
        {
          toast.warn("All teams are filled");
          return;
        }
      setIsEditing(false); // Reset to false when adding new team
      setTeamID("");
      setTeamMembers(["", "", ""]);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditingTeamID(""); // Reset the editing state on modal close
  };

  const handleTeamIDChange = (e) => setTeamID(e.target.value);

  const handleTeamMemberChange = (index, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = value;
    setTeamMembers(updatedMembers);
  };

  const handleAddTeamMember = () => {
    if (teamMembers.length < 5) {
      setTeamMembers([...teamMembers, ""]);
    }
  };

  const handleSubmit = async () => {
    if (teamID === "") {
      toast.warn("teamID is required!");
      return;
    }
  
    const nonEmptyMembers = teamMembers.filter((member) => member.trim() !== "");
    if (nonEmptyMembers.length < 3) {
      toast.warn("Enter at least three team members!");
      return;
    }

    if (!isEditing) {
      // Check for duplicate team members across all teams when not editing
      const duplicateMember = teamData.some((team) =>
        team.teamMembers.some((member) => nonEmptyMembers.includes(member))
      );
    
      if (duplicateMember) {
        toast.warn("One or more members are already part of another team!");
        return;
      }
    } else {
      // Check for duplicate members in other teams during editing
      const duplicateMember = teamData.some((team) =>
        team.teamID !== teamID && // Skip the current team being edited
        team.teamMembers.some((member) => nonEmptyMembers.includes(member))
      );
      if (duplicateMember) {
        toast.error("One or more team members are already part of another team!");
        return;
      }
    }

  
    const teamDataToSubmit = {
      teamID,
      teamMembers: nonEmptyMembers,
    };
    console.log(teamDataToSubmit);
  
    const token = localStorage.getItem("Token");
  
    if (!token) {
      toast.error("JWT token is missing, please login again!");
      return;
    }
  
    try {
      const url = `${Backend_Url}/api/createTeam`; // Create API endpoint
  
      const response = await fetch(url, {
        method: "POST", // Use PUT for editing, POST for adding
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(teamDataToSubmit),
        
      });
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        fetchTeams();
        handleCloseModal();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to create or edit team!");
      }
    } catch (error) {
      toast.error("Error submitting team data, please try again!");
    }
  };
  

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${Backend_Url}/api/getTeams`);
      const data = await response.json();
      if (response.ok) {
        setTeamData(data);
  
        // List of all teams
        const allTeams = ["RCB", "MI", "CSK", "KKR", "DC", "GT", "LSG", "PBKS", "RR","SRH"];
  
        // Extract existing team IDs from the fetched data
        const existingTeams = data.map((team) => team.teamID);
  
        // Filter out teams that are already present in the data
        const availableTeams = allTeams.filter((team) => !existingTeams.includes(team));
  
        console.log("Available teams:", availableTeams);
        setremainingteams(availableTeams);
        setLoading(false);
        // You can set availableTeams in state if needed or use it directly
      } else {
        toast.error("Failed to fetch team data.");
      }
    } catch (err) {
      toast.error("Error fetching team data.");
      console.error(err);
    }
  };
  

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this team?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("Token"); // Ensure you retrieve the token
  
        if (!token) {
          toast.error("JWT token is missing, please login again!");
          return;
        }
  
        const response = await fetch(`${Backend_Url}/api/deleteTeam`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }), // Send the ID in the request body
        });
  
        if (response.ok) {
          const data = await response.json();
          toast.success(data.message);
          fetchTeams(); // Refresh the team list after successful deletion
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Failed to delete team!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error deleting team!");
      }
    }
  };
  

  return (
    <AddTeamContainer>
      {
        loading ? <CenterSpinner>
        <Oval stroke="#ff00ff" />
      </CenterSpinner> :
        <>
        <NeonButton onClick={() => handleOpenModal()}>Add Team</NeonButton>
      <TeamCardsContainer>
        {teamData.length!=0 ? teamData.map((team, index) => (
          <CardContainer key={index}>
            <ImageContainer>
              <TeamImage
                src={`${team.teamID}.jpg`}
                alt="ipl team"
              />
            </ImageContainer>
            <Table>
              <tr>
                <TableCell>
                  <Title>
                    Team ID: <span style={{ color: '#ff00ff' }}>{team.teamID}</span>
                  </Title>
                  <Text>
                    <BoldText>Initial Purse:</BoldText> {team.initialPurse} L
                  </Text>
                  <Text>
                    <BoldText>Remaining Purse:</BoldText> {team.remainingPurse} L
                  </Text>
                  <Text>
                    <BoldText>Bowlers:</BoldText> {team.bowlers}
                  </Text>
                  <Text>
                    <BoldText>Batsmen:</BoldText> {team.batsmen}
                  </Text>
                  <Text>
                    <BoldText>Allrounders:</BoldText> {team.allrounder}
                  </Text>
                  <Text>
                    <BoldText>Wickykeeper:</BoldText> {team.wicketkeeper}
                  </Text>
                </TableCell>
                <TableCell pl>
                  <Subtitle>Team Owners:</Subtitle>
                  <List>
                    {team.teamMembers.map((member, index) => (
                      <ListItem key={index}>{member}</ListItem>
                    ))}
                  </List>
                </TableCell>
              </tr>
            </Table>
            <ButtonContainer>
              <div>
                <IconButton color="#1E90FF" hoverColor="#1C86EE" onClick={() => handleOpenModal(team)}>
                  <FaEdit size={12} />
                </IconButton>&nbsp;
                <IconButton color="#FF4500" hoverColor="#FF6347" onClick={()=>{handleDelete(team._id)}}>
                  <FaTrash size={12} />
                </IconButton>
              </div>
              <ViewButton onClick={() => navigate(`/teams/${team._id}`)}>View Players</ViewButton>
            </ButtonContainer>
          </CardContainer>
        )):<div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',  // Full viewport height
          textAlign: 'center',
          // marginLeft:'200px',
          fontSize: '20px',  // Optional: Adjust text size
          color: '#ff00ff',  // Optional: Adjust text color
        }}
      >
        No Teams Found
      </div>}
      </TeamCardsContainer>

      <ModalOverlay show={showModal}>
        <ModalContainer>
          <CloseButton onClick={handleCloseModal}>×</CloseButton>
          <h2>{isEditing ? "Edit Team" : "Select Team"}</h2>
          
          <RadioButtonGroup>
            {remainingteams.map((team, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="teamID"
                  value={team}
                  checked={team == teamID}
                  onChange={handleTeamIDChange}
                  required
                  disabled = {isEditing}
                />
                {team}
              </label>
            ))}
          </RadioButtonGroup>

          <h3>Team Members</h3>
          <TeamMembersContainer>
            {teamMembers.map((member, index) => (
              <TeamMemberInput key={index}>
                <input
                  type="text"
                  value={member}
                  onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                  placeholder={`Member ${index + 1}`}
                  required
                />
                {index >= 2 && (
                  <button onClick={handleAddTeamMember}>+</button>
                )}
              </TeamMemberInput>
            ))}
          </TeamMembersContainer>

          <ActionButtonsContainer>
            <ActionButton onClick={handleSubmit}>
              {isEditing ? "Update Team" : "Submit"}
            </ActionButton>
          </ActionButtonsContainer>
        </ModalContainer>
      </ModalOverlay>
      </>
      }
    </AddTeamContainer>
  );
};
export default AddTeam;
