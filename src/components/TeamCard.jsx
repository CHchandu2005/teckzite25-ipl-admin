import React from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CardContainer = styled.div`
  background: linear-gradient(to top, rgb(37, 44, 59), #ff00ff);
  color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 0.75rem;
  width: 15rem;
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

const IPLTeamCard = ({team}) => {
  return (
    <CardContainer>
      <ImageContainer>
        <TeamImage
          src="https://placehold.co/300x300?text=RCB+Team+Logo"
          alt="Royal Challengers Bangalore team logo"
        />
        {/* <IconOverlay>
          <FaCricket size={16} />
        </IconOverlay> */}
      </ImageContainer>
      <Table>
        <tr>
          <TableCell>
            <Title>
              Team ID: <span style={{ color: '#ff00ff' }}>{team.teamID}</span>
            </Title>
            <Text>
              <BoldText>Initial Purse:</BoldText> {team.initialPurse}
            </Text>
            <Text>
              <BoldText>Remaining Purse:</BoldText> {team.remainingPurse}
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
                {
                team.teamMembers.map((member, index) => (
                    <ListItem key={index}>{member}</ListItem>
                ))
                }

            </List>
          </TableCell>
        </tr>
      </Table>
      <ButtonContainer>
        <div>
          <IconButton color="#1E90FF" hoverColor="#1C86EE">
            <FaEdit size={12} />
          </IconButton>&nbsp;
          <IconButton color="#FF4500" hoverColor="#FF6347">
            <FaTrash size={12} />
          </IconButton>
        </div>
        <ViewButton>View Players</ViewButton>
      </ButtonContainer>
    </CardContainer>
  );
};

export default IPLTeamCard;