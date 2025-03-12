import styled from 'styled-components';
import { toast } from 'react-toastify';
import { getBidIncrement, getBidDecrement } from './BidConfig';
import {
  FaFlag,
  FaBaseballBall,
  FaCalendarAlt,
  FaChartLine,
  FaDollarSign,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
const Backend_Url = import.meta.env.VITE_BACKEND_URL;


const Container = styled.div`
  height: 80vh;
  background: linear-gradient(to bottom right, #1f1f1f, #000);
  color: white;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    height: 91vh;
  }
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 91vh;
  overflow:hidden;

  @media (min-width: 768px) {
    height: 91vh;
    width: 50%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 91vh;
  object-fit: cover;
  object-position: top;
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, #1f1f1f, rgba(31, 31, 31, 0.5), transparent);
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    padding: 3rem;
  }
`;

const HeroText = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: bold;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: clamp(2rem, 4vw, 4rem);
  }

  @media (min-width: 1024px) {
    font-size: clamp(2.5rem, 3vw, 5rem);
  }
`;

const HeroSubText = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: clamp(0.8rem, 2vw, 1rem);
  color: #d1d1d1;

  @media (min-width: 768px) {
    gap: 1rem;
    font-size: clamp(1rem, 2.5vw, 1.2rem);
  }
`;

const MainContent = styled.div`
  width: 100%;
  padding: 1rem;
  height:auto;
  background-color:black; 

  @media (min-width: 768px) {
    width: 50%;
    padding: 1rem;
    height:88vh;
  }

  @media (min-width: 1024px) {
    padding: 1rem;
  }
`;

const Card = styled.div`
  background: rgba(31, 31, 31, 0.8);
  backdrop-filter: blur(10px);
  padding: 10px;
  margin-bottom: 1rem;
  transition: all 0.3s ease-in-out;
  // height:32vh;

  @media (max-width: 768px) {
    margin-top:40px;
  }
`;

const CardTitle = styled.h2`
  font-size: 0rem;
  font-weight: bold;
  margin-top: 2rem;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    font-size: 0.8rem;
    padding:10px
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const CardItem = styled.div`
  background: rgba(90, 65, 91, 0.7);
  border-radius: 0.75rem;
  padding: 0.4rem;
  height:auto;

  @media (min-width: 768px) {
    padding: 0.4rem;
  }
`;

const CardItemTitle = styled.div`
  color: #d1d1d1;
  margin-bottom: 0.2rem;
`;

const CardItemValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
`;

const Button = styled.button`
  flex: 1;
  background: #ff00ff;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s ease-in-out;

  &:hover {
    background: #d600d6;
    transform: scale(1.01);

  }

  @media (min-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1.25rem;
  }
`;

const AssignButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;

`;
const NeonButton = styled.button`
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  color: #fff;
  border: none;
  padding: 0.4rem 0.7rem;
  border-radius: 1rem;
  cursor: pointer;
  width: 8rem;
  transition: background 0.3s ease;
  z-index:2;
  margin-top:5px;

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
    top: 2px;
    right: 0;
  }
`;


const NeonButton1 = styled.button`
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  color: #fff;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  width: 5rem;
  transition: background 0.3s ease;
  position:fixed;
  top:3px;
  right:0px;

  &:hover {
    background: linear-gradient(45deg, #00ffff, #ff00ff);
  }

  @media (max-width: 768px) {
    width: 8rem;
    padding: 0.5rem 1rem;
    top:8px;
    right:3px;
  }

  @media (max-width: 480px) {
    width: 6rem;
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    top: 2px;
    right: 0;
  }
`;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Modal } from "react-bootstrap";
const socket = io(Backend_Url);

const HomePage = () => {
  const [player, setPlayer] = useState(null); // Current player data
  const [bidAmount, setBidAmount] = useState(0); // Current bid amount
  const [selectedTeam, setSelectedTeam] = useState(''); // Selected team for the bid
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedSet, setSelectedSet] = useState('');
  const [continueauction, setContinue] = useState(true);
  const [successbid, setSuccessbid] = useState(false);
  const [accelerate, setAccelerate] = useState(false);
  const [setnames, setSetnames] = useState({
    setname: [],
    set: [],
    setwithoutplayer_set: [],
    setwithoutplayer_setname: []
  }
  )
  const [teamnames, setTeamNames] = useState([]);
  // Fetch the current player on component load
  useEffect(() => {
    fetchTeams();
  }, []);
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const fetchTeams = async () => {
    console.log("fetching sets")
    try {
      const response = await fetch(`${Backend_Url}/api/getsets`);
      const data = await response.json();
      if (response.ok) {
        console.log(data)
        setSetnames({
          setname: data.setname || [],
          set: data.set || [],
          setwithoutplayer_set: data.setwithoutplayers_set || [],
          setwithoutplayer_setname: data.setwithoutplayers_setname || [],
        });
        setTeamNames(data.teamnames);
        setShowModal2(true)
      }
      else {
        console.log("error while fetching data");
        alert("Error while fetching data");
      }
    }
    catch (error) {
      console.log(error);
    }

  }

  const fetchPlayer = (set, bidplace = null, direction) => {
    console.log(set)
    console.log(player)
    setShowModal2(false)
    setAccelerate(false)
    if (!continueauction) {
      toast.error("auction is paused,resume it");
      return;
    }
    const url = bidplace
      ? `${Backend_Url}/api/playersToBuy?set=${set}&bidplace=${bidplace}&direction=${direction}`
      : `${Backend_Url}/api/playersToBuy?set=${set}`;


    axios
      .get(url)
      .then((response) => {
        socket.emit('adminConnected');
        if (response.data && typeof response.data === 'object') {
          setPlayer(response.data);

          setBidAmount(response.data.basePrice || 0);
          setSelectedTeam('');
          socket.emit('updateViewer', response.data);
        } else {
          setPlayer(null);
          socket.emit('updateViewer', null)
          socket.emit('pauseAuction', true)
          setShowModal2(true)
          fetchTeams()
        }
      })
      .catch((err) => {
        console.error('Error fetching player:', err);
      });
  };

  const handleNext = () => {
    if (accelerate) {
      if (player?.set && player?.bidplace) {
        accelerateplayers(player.set, player.bidplace, "next");
      } else {
        accelerateplayers();
      }
    }
    else {
      if (player?.set && player?.bidplace) {
        fetchPlayer(selectedSet, player.bidplace, "next");
      } else {
        fetchPlayer(selectedSet);
      }
    }
  };

  const handlePrev = () => {
    if (accelerate) {
      if (player?.bidplace && player.bidplace > 1 && player?.set) {
        accelerateplayers(player.set, player.bidplace, "prev");
      }
      else {
        accelerateplayers()
      }
    }
    else {
      if (player?.bidplace && player.bidplace > 1 && player?.set) {
        fetchPlayer(selectedSet, player.bidplace, "prev");
      }
      else {
        fetchPlayer(selectedSet)
      }
    }
  };

  const handleIncreaseBid = () => {
    if (!continueauction) {
      toast.error("Auction is paused,Resume it");
      return;
    }
    if (player) {
      const increment = getBidIncrement(bidAmount)
      setBidAmount((prev) => prev + increment);
      console.log(bidAmount)
      socket.emit('bidAmount', bidAmount + increment);
    }
  };

  const handleDecreaseBid = () => {
    if (!continueauction) {
      toast.error("Auction is paused,Resume it");
      return;
    }
    if (player) {
      const decrement = getBidDecrement(bidAmount)
      setBidAmount((prev) => Math.max(player.basePrice, prev - decrement));
      socket.emit('bidAmount', Math.max(player.basePrice, bidAmount - decrement));
    }
  };
  const handleAssignClick = () => {
    if (!continueauction) {
      toast.error("Auction is paused,Resume it");
      return;
    }
    setShowModal(true); // Open the modal
  };

  const handleConfirmSelection = (selectedTeam) => {
    console.log(selectedTeam)
    if (selectedTeam == "") {
      toast.error("please select team");
      return;
    }
    setShowModal(false); // Close the modal
    handleConfirmBid(); // Call the confirm bid handler
  };
  const handleConfirmBid = () => {

    console.log("In handleconfirm bod:", bidAmount);
    if (player) {
      axios
        .post(
          `${Backend_Url}/api/bid`,
          {
            playerId: player._id,
            biddingAmount: bidAmount,
            teamName: selectedTeam,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          socket.emit("bidConfirmed", true, selectedTeam);
          //fetchPlayer( player.set,player.bidplace, "next");
          setSuccessbid(true)
          setPlayer(false)
          setTimeout(() => {
            socket.emit("bidConfirmed", false, null);
            setSuccessbid(false)

            if (accelerate) {
              accelerateplayers(player.set, player.bidplace, "next");
            }
            fetchPlayer(selectedSet, player.bidplace, "next");
          }, 2000);
        })
        .catch((error) => {
          console.error('Error confirming bid:', error);

          if (error.response && error.response.data && error.response.data.error) {

            toast.error(error.response.data.error);
          } else {
            // Generic or network error
            toast.error("An unexpected error occurred while confirming the bid.");
          }
        });
    } else {
      alert("No player selected to bid.");
    }
  };

  const chooseset = (set) => {

    setSelectedSet(set)
    fetchPlayer(set);
  }
  const handleunsold = async (id) => {
    if (!continueauction) {
      toast.error("Auction is paused,Resume it");
      return;
    }
    const confirmed = confirm("do you want to make player as unsold?")
    if (!confirmed) {
      return;
    }

    let inaccelerate = false
    if (accelerate) {
      inaccelerate = true;

    }
    try {
      const response = await fetch(`${Backend_Url}/api/unsold`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ id, inaccelerate }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
    socket.emit("bidConfirmed", true, null);
    setSuccessbid(true)
    setPlayer(false)
    setTimeout(() => {
      socket.emit("bidConfirmed", false, null);
      setSuccessbid(false)
      if (accelerate) {
        accelerateplayers(player.set, player.bidplace, "next");
      } else {
        fetchPlayer(selectedSet, player.bidplace, "next");
      }
    }, 2000);

  }
  const accelerateplayers = async (set, bidplace = null, direction) => {
    if (!continueauction) {
      toast.error("auction is paused,resume it");
      return;
    }
    setAccelerate(true)
    setShowModal2(false)
    const url = bidplace
      ? `${Backend_Url}/api/accelerateplayers?set=${set}&bidplace=${bidplace}&direction=${direction}`
      : `${Backend_Url}/api/accelerateplayers?`;
    axios
      .get(url)
      .then((response) => {
        socket.emit('adminConnected');
        if (response.data && typeof response.data === 'object') {
          setPlayer(response.data);

          setBidAmount(response.data.basePrice || 0);
          setSelectedTeam('');
          socket.emit('updateViewer', response.data);
        } else {
          setPlayer(null);
          socket.emit('updateViewer', null)
          socket.emit('pauseAuction', true)
          setShowModal2(true)
          fetchTeams()
        }
      })
      .catch((err) => {
        console.error('Error fetching player:', err);
      });
  }
  const endauction = () => {
    socket.emit("endauction", true)

    navigate('/');
  }
  const pauseAuction = () => {

    setContinue((prev) => {
      const newState = !prev; // Toggle state

      if (newState) {

        socket.emit("pauseAuction", false);
      } else {

        socket.emit("pauseAuction", true);
      }

      return newState;
    });
  }

  return (
    <Container>
      <HeroSection>
        {successbid && (
          <div className="fixed z-110 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-green-300 p-8 rounded-lg shadow-lg">
              <h2 className="text-4xl font-bold mb-4">Successfully sold or unsold</h2>
            </div>
          </div>
        )}
        {player ? (
          <>

            <ImageContainer>
              <Image src={player.image} alt={player.name} />
              <GradientOverlay />
              <HeroContent>

                <HeroText>
                  <div className="flex items-center space-x-3 text-gray-200 mb-2">
                    <FaFlag className="w-5 h-5 text-[#ff00ff]" />
                    <span className="text-lg">Team {player.nationality}</span>
                  </div>
                  <HeroTitle>{player.name}</HeroTitle>
                  <HeroSubText>
                    <div className="flex items-center">
                      <FaBaseballBall className="w-5 h-5 mr-2 text-[#ff00ff]" />
                      <span>{player.role}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="w-5 h-5 mr-2 text-[#ff00ff]" />
                      <span>{player.age}</span>
                    </div>
                  </HeroSubText>
                </HeroText>
              </HeroContent>

            </ImageContainer>

            <MainContent>

              <Card>
                <CardTitle>
                  <FaChartLine className=" mr-1  text-[#ff00ff]" />
                  <NeonButton1 onClick={() => pauseAuction()}>{continueauction ? "pause" : "resume"}</NeonButton1>

                  Career Statistics
                </CardTitle>
                <CardGrid>
                  <CardItem>
                    <CardItemTitle>Runs</CardItemTitle>
                    <CardItemValue>{player.runs}</CardItemValue>
                  </CardItem>
                  <CardItem>
                    <CardItemTitle>Wickets</CardItemTitle>
                    <CardItemValue>{player.wickets}</CardItemValue>
                  </CardItem>
                  <CardItem>
                    <CardItemTitle>Strike Rate</CardItemTitle>
                    <CardItemValue>{player.strikeRate}</CardItemValue>
                  </CardItem>
                  <CardItem>
                    <CardItemTitle>Average</CardItemTitle>
                    <CardItemValue>{player.average}</CardItemValue>
                  </CardItem>
                </CardGrid>
              </Card>
              <Card>
                <CardTitle>
                  <FaDollarSign className="mr-1 text-[#ff00ff]" />
                  Auction Details
                </CardTitle>
                <CardGrid>
                  <CardItem>
                    <CardItemTitle>BasePrice</CardItemTitle>
                    <CardItemValue>{player.basePrice.toLocaleString()} L</CardItemValue>
                  </CardItem>
                  <CardItem>
                    <CardItemTitle>Current Bid</CardItemTitle>
                    <CardItemValue style={{ color: 'green' }}>{bidAmount} L</CardItemValue>
                  </CardItem>
                </CardGrid>
                <ButtonGroup>
                  <Button onClick={handleDecreaseBid}>
                    <FaMinus />
                  </Button>
                  <Button onClick={handleIncreaseBid}>
                    <FaPlus />
                  </Button>
                  <Button onClick={() => handleunsold(player._id)}>
                    Unsold
                  </Button>
                  <Button onClick={handlePrev}>
                    <FaArrowLeft />
                  </Button>
                  <Button onClick={handleNext}>
                    <FaArrowRight />
                  </Button>
                </ButtonGroup>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Select a Team</Modal.Title>
                  </Modal.Header>
                  {/* <Modal.Body>
                    <select
                      value={selectedTeam}
                      onChange={(e) => setSelectedTeam(e.target.value)}

                    >
                      <option value="">Select Team</option>
                      {teamnames.map((team, i) => (
                        <option key={i} value={`${team}`}>
                          {team}
                        </option> 
                      ))}
                    </select>
                  </Modal.Body> */}
                  <Modal.Body>
                    {teamnames.map((team, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`team-${i}`}
                          name="team"
                          value={team}
                          checked={selectedTeam === team}
                          onChange={(e) => setSelectedTeam(e.target.value)}
                        />
                        <label htmlFor={`team-${i}`}>{team}</label>
                      </div>
                    ))}
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmSelection(selectedTeam)}>
                      Confirm
                    </Button>
                  </Modal.Footer>
                </Modal>

                <AssignButton onClick={handleAssignClick}>Assign to Team</AssignButton>
              </Card>
            </MainContent>
          </>

        ) : !showModal2 && !successbid ? <ButtonGroup>
          <Card><p>No players available</p></Card>
        </ButtonGroup > : null}
      </HeroSection>
      {showModal2 ? (
        <>
          <div className='bg-[rgb(37,44,59)]'>
            <div className="min-h-screen bg-[rgb(37,44,59)] relative flex justify-center items-center z-10 w-full p-5 overflow-y-auto">
              <div className="flex flex-col justify-center items-center gap-5 max-w-[700px] mt-[200px] md:mt-[10px]">
                {setnames.setname.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                    {setnames.setname.map((setno, index) => (
                      <NeonButton
                        key={index}
                        className="w-1/2"
                        onClick={() => chooseset(setnames.set[index])}
                      >
                        {setno}
                      </NeonButton>
                    ))}
                  </div>
                )}

                {setnames.setwithoutplayer_setname.length > 0 && (
                  <>
                    <h4>Sets without Players</h4>
                    {/* {setnames.setwithoutplayer_setname.map((setObj, index) => (
                      
                      <div
                        key={`without-${index}`}
                        className="m-2.5 flex justify-center w-full"
                      >
                        <NeonButton onClick={() => toast.error("no players in this set")}>
                          {setObj}
                        </NeonButton>
                      </div>
                    ))} */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 w-full">
                      {setnames.setwithoutplayer_setname.map((setObj, index) => (
                        <div key={`without-${index}`} className="flex justify-center">
                          <NeonButton
                            className="w-full"
                            onClick={() => toast.error("no players in this set")}
                          >
                            {setObj}
                          </NeonButton>
                        </div>
                      ))}
                    </div>

                  </>
                )}
              </div>
            </div>
            <NeonButton onClick={() => accelerateplayers()}>Accelerate</NeonButton>
            <NeonButton onClick={() => endauction()}>EndAuction</NeonButton>
          </div>
        </>
      ) : (
        ""
      )}

    </Container>

  );
}

export default HomePage;




