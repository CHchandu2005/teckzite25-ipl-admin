import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify'; // Importing Toast for notifications
import ProfileCard from '../components/ProfileCard';
import Oval from "react-loading-icons/dist/esm/components/oval";
import { useParams } from 'react-router-dom';
const Backend_Url = import.meta.env.VITE_BACKEND_URL;

const GradientCards = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  background-color: rgb(37, 44, 59);
`;

const CenterSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
  color: #ff00ff;
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 30px auto;
  padding: 3px;
  background: rgb(37, 44, 59);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
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

const Teamplayers = () => {
  const [loading, setLoading] = useState(true);
  const [playerProfile, setPlayerProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [singlePlayer, setSinglePlayer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {

      const response = await fetch(`${Backend_Url}/api/getteamplayers/${id}`);
      const data = await response.json();
      if (response.ok) {
        setPlayers(data);
        setFilteredPlayers(data);
        setLoading(false);
      } else {
        toast.error("Error fetching players data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = players.filter((player) =>
      player.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlayers(filtered);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleCloseModal = () => {
    setPlayerProfile(false);
  };
  const handleOpenModal = (player) =>{
    setPlayerProfile(true);
    setSinglePlayer(player);
  }

  return (
    <GradientCards>
      {/* Search Field */}
      <SearchContainer>
        <SearchForm onSubmit={handleSearchSubmit}>
          <SearchInput
            type="text"
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </SearchForm>
      </SearchContainer>

      <TableContainer>
        {!loading ? (
          <Table>
            <thead>
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Role</TableHeader>
                <TableHeader>Runs</TableHeader>
                <TableHeader>Wickets</TableHeader>
                <TableHeader>Strike Rate</TableHeader>
                <TableHeader>Base Price</TableHeader>
                <TableHeader>Bid Place</TableHeader>
                <TableHeader>Status</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers && filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <tr key={player.id} onClick={()=>handleOpenModal(player)}>
                    <TableData>{player.name}</TableData>
                    <TableData>{player.role}</TableData>
                    <TableData>{player.runs}</TableData>
                    <TableData>{player.wickets}</TableData>
                    <TableData>{player.strikeRate}</TableData>
                    <TableData>${player.basePrice}</TableData>
                    <TableData>{player.bidplace}</TableData>
                    <TableData>{player.isSold ? "Sold" : "Unsold"}</TableData>
                  </tr>
                ))
              ) : (
                <tr>
                  <TableData colSpan="9" style={{ textAlign: 'center' }}>
                    No players available
                  </TableData>
                </tr>
              )}
            </tbody>
          </Table>
        ) : (
          <CenterSpinner>
            <Oval stroke="#ff00ff" />
          </CenterSpinner>
        )}
      </TableContainer>

      {playerProfile && (
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
            onClick={handleCloseModal}
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
          <ProfileCard player={singlePlayer} />
        </div>
      )}
    </GradientCards>
  );
};

export default Teamplayers;
