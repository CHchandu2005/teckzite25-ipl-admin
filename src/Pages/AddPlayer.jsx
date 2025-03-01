import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrashAlt, FaTimes } from 'react-icons/fa'; // Importing React Icons
import { toast } from 'react-toastify'; // Importing Toast for notifications
import ProfileCard from '../components/Profilecard';
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles";
import Oval from "react-loading-icons/dist/esm/components/oval";
//search styles
import { MdOutlineCurrencyRupee } from "react-icons/md";


const Backend_Url = import.meta.env.VITE_BACKEND_URL;


const CenterSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
  color:#ff00ff;
`;
const SearchContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin-top: 50px auto;
  padding: 3px;
  background: rgb(37, 44, 59);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
   @media (max-width: 768px) {
    margin-top:30px;
  }
`;

const SearchForm = styled.form`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 7px;
  // border: 1px solid #ff00ff;
  border-radius: 5px;
  background: rgba(37, 44, 59, 0.8);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 10px #ff00ff;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;


// Styled components
const GradientCards = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  background-color:rgb(37, 44, 59);
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  background: rgb(37, 44, 59);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.2);
  margin-top: 50px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: white;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  background-color: #333;
  color: #ff00ff;
  font-size: 1rem;
`;

const TableData = styled.td`
  padding: 12px;
  text-align: left;
  color: white;
  border-bottom: 1px solid #444;
  font-size: 0.9rem;
`;

const NeonButton = styled.button`
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  color: #fff;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.3125rem;
  cursor: pointer;
  width: 5rem;
  transition: background 0.3s ease;
  position: absolute;
  top: 30px;
  right: 20px;
  &:hover {
    background: linear-gradient(45deg, #00ffff, #ff00ff);
  }
     @media (max-width: 768px) {
    width: 8rem; /* Decrease the width */
    padding: 0.5rem 1rem; /* Adjust padding */
  }

  @media (max-width: 480px) {
    width: 4rem; /* Further decrease width for very small devices */
    padding: 0.375rem 0.75rem; /* Adjust padding */
    font-size: 0.875rem; /* Reduce font size if needed */
    top:7px;
    right:5px;
  }
`;
const NeonButton1 = styled.button`
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  color: #fff;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.3125rem;
  cursor: pointer;
  width: 5rem;
  transition: background 0.3s ease;
  position: absolute;
  top: 30px;
  right: 110px;
  &:hover {
    background: linear-gradient(45deg, #00ffff, #ff00ff);
  }
     @media (max-width: 768px) {
    width: 8rem; /* Decrease the width */
    padding: 0.5rem 1rem; /* Adjust padding */
  }

  @media (max-width: 480px) {
    width: 4rem; /* Further decrease width for very small devices */
    padding: 0.375rem 0.75rem; /* Adjust padding */
    font-size: 0.875rem; /* Reduce font size if needed */
    top:7px;
    right:80px;
  }
`;

const ActionButton = styled.button`
  background: none;
  color: #ff00ff;
  border: none;
  cursor: pointer;
  padding: 5px;
  font-size: 1.2rem;
  &:hover {
    color: #e600e6;
  }
`;

const Modal = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  background: rgb(37, 44, 59);
  color: white;
  border-radius: 10px;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  height: auto;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.h2`
  color: #ff00ff;
  text-align: center;
  font-size: 2rem;
  margin: 1rem;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ModalInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #444;
  background-color: #fff;
  color: black;
`;

const ModalSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #444;
  background-color: #fff;
  color: black;
`;

const SubmitButton = styled.button`
  background: #ff00ff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
  margin-top: 20px;
  &:hover {
    background: #e600e6;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #ff00ff;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: #e600e6;
  }
`;

const AddPlayer = () => {
  const token = localStorage.getItem("Token");
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [setData, setSetData] = useState({
    setname: "",
    setno: "",
    excel: null,
  });
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    nationality: '',
    age: '',
    role: '',
    runs: '',
    wickets: '',
    strikeRate: '',
    image: null,
    basePrice: '',
    economy:"",
    average:"",
    bidplace: '',
    set: '',
    setname: ''

  });
  const [loading, setLoading] = useState(true);
  const [playerprofile, setplayerProfile] = useState(false);
  const [singleplayer, setSingleplayer] = useState({
    name: '',
    nationality: '',
    age: '',
    role: '',
    runs: '',
    wickets: '',
    strikeRate: '',
    image: null,
    basePrice: '',
    economy:'',
    average:'',
    bidplace: '',
    set: '',
    setname: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [Players, setPlayers] = useState([]);
  const [filterplayers, setFilterPlayers] = useState([]);
  const [setnames, setSetNames] = useState({
    setname: "",
    setno: ""
  });


  const [editoption, setEditoption] = useState(false);


  const handleAddPlayer = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is a radio button for setname
    if (name === "setname") {
      const [setname, set] = value.split('-'); // Split values
      setNewPlayer({
        ...newPlayer,
        setname,
        set,  // Store setno separately
      });
    } else {
      setNewPlayer({
        ...newPlayer,
        [name]: value,
      });
    }
  };
  const fetchPlayers = async () => {
    try {
      const response = await fetch(`${Backend_Url}/api/getplayers`);
      const data = await response.json();
  
      if (response.ok) {
        console.log(data);
  
        // Sort players by set number in ascending order
        const sortedData = data.message == "No players found" ?data: [...data].sort((a, b) => a.set - b.set);
        // const sortedData = data;
  
        setPlayers(sortedData);
        setFilterPlayers(sortedData);
        setLoading(false);
        console.log("In fetch players")
  
        const uniqueSetNamesAndNos = [
          ...new Set(sortedData.map(player => `${player.setname}-${player.set}`))
        ];
  
        // Extract unique combinations back to an object array
        const extractedSetNames = uniqueSetNamesAndNos.map(pair => {
          const [setname, setno] = pair.split('-');
          return { setname, setno: Number(setno) }; // Ensure setno is a number
        });
  
        // Sort extracted set names by set number
        extractedSetNames.sort((a, b) => a.setno - b.setno);
  
        setSetNames(extractedSetNames);
      } else {
        console.log("Error while fetching data");
        toast.error("Error while fetching data");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Add all fields to FormData, including the image file
    Object.keys(newPlayer).forEach((key) => {
      if (key === 'image' && newPlayer.image) {
        formData.append(key, newPlayer.image); // Append the file object
      } else {
        formData.append(key, newPlayer[key]); // Append other fields
      }
    });
    if
      (!editoption) {
      if (!newPlayer.image) {
        toast.error("Please upload an image.");
        return;
      }
    }


    console.log("New player:", newPlayer);
    setNewPlayer({
      name: '',
      nationality: '',
      age: '',
      role: '',
      runs: '',
      wickets: '',
      strikeRate: '',
      image: null,
      basePrice: '',
      economy:'',
      average:'',
      bidplace: '',
      set: '',
      setname: ''
    });
    setIsModalOpen(false);

    savePlayers(formData);
  };

  const savePlayers = async (formData) => {


    if (!token) {
      toast.error("JWT token is missing, please login again!");
      return;
    }
    setUploading(true);
    try {
      const url = `${Backend_Url}/api/createplayer`; // Create API endpoint

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        setEditoption(false)
        setUploading(false)
        fetchPlayers();
        handleCloseModal();
      } else {
        const errorData = await response.json();
        setUploading(false)
        toast.error(errorData.message || "Failed to create or edit team!");
      }
    } catch (error) {
      setUploading(false)
      toast.error("Error submitting team data, please try again!");
    }
  };


  const handleEditPlayer = (player) => {

    if(player.role && player.role == "batter")
    {
      player.role = "batsman"
    }

    if(player.role && player.role == "all-rounder")
    {
      player.role = "allrounder"
    }

    setEditoption(true);
    setNewPlayer(player)
    setIsModalOpen(true)

  };

  const handleDeletePlayer = async (player) => {

    const id = player._id;

    try {
      const response = await fetch(`${Backend_Url}/api/deletePlayer`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        // Successfully deleted the player
        alert(`Player ${player.name} deleted successfully`);

        // Optionally, update the state to remove the player from the list
        fetchPlayers()
      } else {
        toast.error('Failed to delete the player');
        console.log('Error during player deletion:', response);
      }
    } catch (error) {
      toast.error('Error occurred while deleting the player');
      console.log(error);
    }
  };

  const handleComponent = (player) => {
    setSingleplayer(player);
    setplayerProfile(true);
    console.log(playerprofile);
  }
  const handleClose = () => {
    setplayerProfile(false);
  }

  const handleSearch = (e) => {
    const query = e.toLowerCase();
    setSearchQuery(query);
  
    if (query === "") {
      setPlayers([...filterplayers].sort((a, b) => a.set - b.set)); // Sort all players by set number
    } else {
      const filteredPlayers = filterplayers
        .filter((player) => player.name.toLowerCase().includes(query))
        .sort((a, b) => a.set - b.set); // Sort filtered players by set number
  
      setPlayers(filteredPlayers);
    }
  };
  
  


  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleAddset = () => {
    setIsModalOpen1(true);
  }
  const handleCloseset = () => {
    setIsModalOpen1(false);
  }
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setSetData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handlesetdataSubmit = async (e) => {
    e.preventDefault();
    fetchPlayers();

    const { setname, setno } = setData;

    // const matchedSet = setnames.find(
    //   (item) => item.setname === setname || item.setno === setno
    // );
    const matchedSet = Array.isArray(setnames)
      ? setnames.find((item) => item.setname === setname || item.setno === setno)
      : null;

    if (matchedSet) {
      // If setname in setData matches setname in setnames
      if (matchedSet.setname === setname) {
        // Ensure setno matches too
        if (matchedSet.setno !== setno) {
          // handle case where setno doesn't match
          toast.error("Setno does not match");
          return;
        }
      }

      // If setno in setData matches setno in setnames
      if (matchedSet.setno === setno) {
        // Ensure setname matches too
        if (matchedSet.setname !== setname) {
          // handle case where setname doesn't match
          toast.error("Setname does not match");
          return;
        }
      }
    }
    // Get the uploaded file
    const file = setData.excel;
    if (!file) {
      toast.error("Please upload a file.");
      return;
    }

    // Validate the file's extension
    const validExtensions = [".xlsx", ".xls"];
    const fileExtension = file.name.slice(file.name.lastIndexOf("."));
    if (!validExtensions.includes(fileExtension)) {
      toast.error("Please upload a valid Excel file (.xlsx or .xls).");
      return;
    }

    // Create FormData for sending to the backend
    const formData = new FormData();
    formData.append("setname", setData.setname);
    formData.append("setno", setData.setno);
    formData.append("excel", file);

    try {
      // Get the JWT token from local storage
      const token = localStorage.getItem("Token");
      if (!token) {
        toast.error("JWT token not found. Please log in again.");
        return;
      }

      // Make the POST request to the backend using fetch
      const response = await fetch(`${Backend_Url}/api/addset`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Attach the JWT token
        },
        body: formData, // FormData includes the file and other fields
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload data");
      }

      // Handle success
      const responseData = await response.json();
      console.log("Upload successful:", responseData);
      toast.success("Data uploaded successfully!");
      setSetData({
        setname: "",
        setno: "",
        excel: null,
      });
      setIsModalOpen1(false);
      fetchPlayers();
    } catch (error) {
      console.error("Error uploading data:", error.message);
      toast.error("Failed to upload data. Please try again.");
    }
  };
  return (
    <GradientCards>
      <NeonButton onClick={handleAddPlayer}>New player</NeonButton>
      <br />
      <NeonButton1 onClick={handleAddset}>Add set</NeonButton1>


      {/* search field */}
      <SearchContainer>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />

        </SearchForm>
      </SearchContainer>
      {uploading && (
        <div style={{ marginTop: "30px" }}>
          <SpinningCircles
            stroke="#000"  // Spinner color
            strokeWidth={4} // Thickness of the spinner
            speed={2}       // Rotation speed
            height="40px"   // Height of the spinner
            width="40px"    // Width of the spinner
          />

          <p>Uploading data...</p>
        </div>
      )}
      <TableContainer>
        {
          !loading ? <Table>
            <thead>
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Role</TableHeader>
                <TableHeader>Runs</TableHeader>
                <TableHeader>Wickets</TableHeader>
                <TableHeader>Strike Rate</TableHeader>
                <TableHeader>Economy</TableHeader>
                <TableHeader>Base Price</TableHeader>
                <TableHeader>Set</TableHeader>
                <TableHeader>Bid Place</TableHeader>
                <TableHeader>Status</TableHeader>
              </tr>
            </thead>
            <tbody>
              {Players.length > 0 ? (
                Players.map((player, index) => (
                  <tr key={index} onClick={() => handleComponent(player)}>
                    <TableData>{player.name}</TableData>
                    <TableData>{player.role}</TableData>
                    <TableData>{player.runs}</TableData>
                    <TableData>{player.wickets}</TableData>
                    <TableData>{player.strikeRate}</TableData>
                    <TableData>{player.economy}</TableData>
                    {/* <TableData><MdOutlineCurrencyRupee />{player.basePrice}</TableData> */}
                    <TableData>
                      <span className="flex items-center">
                        <MdOutlineCurrencyRupee className="" /> {player.basePrice} L
                      </span>
                    </TableData>

                    <TableData>{player.set}</TableData>
                    <TableData>{player.bidplace}</TableData>
                    <TableData>{player.isSold ? "sold" : "unsold"}</TableData>
                    <TableData
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click event.
                      }}
                    >
                      <ActionButton onClick={() => handleEditPlayer(player)}>
                        <FaEdit />
                      </ActionButton>
                      <ActionButton onClick={() => handleDeletePlayer(player)}>
                        <FaTrashAlt />
                      </ActionButton>
                    </TableData>
                  </tr>
                ))
              ) : (
                <tr>
                  <TableData colSpan="8" style={{ textAlign: 'center' }}>
                    No players available
                  </TableData>
                </tr>
              )}
            </tbody>
          </Table> : <CenterSpinner>
            <Oval stroke="#ff00ff" />
          </CenterSpinner>
        }
      </TableContainer>

      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <CloseButton onClick={handleCloseModal}>
            <FaTimes />
          </CloseButton>
          <ModalHeader>Add New Player</ModalHeader>
          <ModalForm onSubmit={handleSubmit}>
            <ModalInput
              type="text"
              name="name"
              placeholder="Player Name"
              value={newPlayer.name}
              onChange={handleInputChange}
              required
            />
            <ModalInput
              type="text"
              name="nationality"
              placeholder="Nationality"
              value={newPlayer.nationality}
              onChange={handleInputChange}
              required
            />
            <ModalInput
              type="number"
              name="age"
              placeholder="Age"
              value={newPlayer.age}
              onChange={handleInputChange}
              required
            />
            <ModalSelect
              name="role"
              value={newPlayer.role}
              onChange={handleInputChange}
              required
            >
              <option value="">select role</option>
              <option value="batsman">Batsman</option>
              <option value="bowler">Bowler</option>
              <option value="allrounder">All-Rounder</option>
              <option value="wicketkeeper">Wicket Keeper</option>
            </ModalSelect>
            <ModalInput
              type="number"
              name="runs"
              placeholder="Runs"
              value={newPlayer.runs}
              onChange={handleInputChange}
              required
            />
            <ModalInput
              type="number"
              name="wickets"
              placeholder="Wickets"
              value={newPlayer.wickets}
              onChange={handleInputChange}
              required
            />
            <ModalInput
              type="text"
              name="strikeRate"
              placeholder="Strike Rate"
              value={newPlayer.strikeRate}
              onChange={handleInputChange}
              required
            />
              <ModalInput
              type="text"
              name="economy"
              placeholder="Economy"
              value={newPlayer.economy}
              onChange={handleInputChange}
              required
            />
              <ModalInput
              type="text"
              name="average"
              placeholder="Average"
              value={newPlayer.average}
              onChange={handleInputChange}
              required
            />
            <ModalInput
              type="file"
              name="image"

              title="Upload player image"
              onChange={(e) => {
                const file = e.target.files[0];
                setNewPlayer({ ...newPlayer, image: file });
              }}

            />
            <ModalInput
              type="number"
              name="basePrice"
              placeholder="Base Price"
              value={newPlayer.basePrice}
              onChange={handleInputChange}
              required
            />
            <label style={{ marginRight: '10px' }}>
              Bid Place</label>
            <ModalInput
              type="number"
              name="bidplace"
              placeholder="Bid Place"
              value={newPlayer.bidplace}
              onChange={handleInputChange}
              required
            />
            {Array.isArray(setnames) ? (
              setnames.map((player, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="setname"
                    value={`${player.setname}-${player.setno}`}  // Combine values
                    checked={newPlayer.setname === player.setname}
                    onChange={handleInputChange}
                    required
                  />

                  {player.setname}
                </label>
              ))
            ) : (
              <p>No sets to add</p>
            )}


            <SubmitButton type="submit">Submit</SubmitButton>
          </ModalForm>
        </ModalContent>
      </Modal>



      {
        playerprofile && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
            }}
          >
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
            <ProfileCard player={singleplayer} />
          </div>
        )
      }

      <Modal isOpen={isModalOpen1}>
        <ModalContent>
          <CloseButton onClick={handleCloseset}>
            <FaTimes />
          </CloseButton>
          <ModalHeader>Enter Player Information</ModalHeader>
          <ModalForm onSubmit={handlesetdataSubmit}>
            <ModalInput
              type="text"
              name="setname"
              placeholder="Enter setname"
              required
              value={setData.setname}
              onChange={handleChange}
            />
            <ModalInput
              type="number"
              name="setno"
              placeholder="Enter set number:"
              required
              value={setData.setno}
              onChange={handleChange}
            />
            <ModalInput
              type="file"
              name="excel"
              title="Upload Excel file:"
              accept=".xlsx, .xls" // Allows only Excel files
              onChange={handleChange}
            />
            <SubmitButton type="submit">Submit</SubmitButton>
          </ModalForm>
        </ModalContent>
      </Modal>
    </GradientCards>
  );
};

export default AddPlayer;
