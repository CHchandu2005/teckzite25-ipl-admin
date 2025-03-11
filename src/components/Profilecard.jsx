import React from 'react';
import { MdOutlineCurrencyRupee } from 'react-icons/md';
import styled from 'styled-components';

// Styled component
const Card = styled.div`
  width: 262.5px; /* 75% of 350px */
  height: auto;
  margin-inline: auto;
  border: 2.25px solid transparent; /* 75% of 3px */
  background: linear-gradient(#ff00ff, black) border-box; /* Purple & Black Border */
  border-radius: 11.25px; /* 75% of 15px */
  padding: 11.25px; /* 75% of 15px */
  background-clip: padding-box, border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 768px) {
    width: 210px; /* 75% of 280px */
    padding: 7.5px; /* 75% of 10px */
  }

  @media (max-width: 480px) {
    width: 180px; /* 75% of 240px */
    padding: 6px; /* 75% of 8px */
  }
`;

const CardImage = styled.img`
  width: 90px; /* 75% of 120px */
  height: 90px; /* 75% of 120px */
  border-radius: 50%;
  object-fit: cover;
  border: 2.25px solid #ff00ff; /* 75% of 3px */
  margin-bottom: 11.25px; /* 75% of 15px */

  @media (max-width: 480px) {
    width: 75px; /* 75% of 100px */
    height: 75px;
  }
`;

const CardTitle = styled.h2`
  font-weight: 700;
  font-size: 1.05rem; /* 75% of 1.4rem */
  color: #fff;
  margin-bottom: 6px; /* 75% of 8px */
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.9rem; /* 75% of 1.2rem */
  }
`;

const CardSubtitle = styled.p`
  font-size: 0.675rem; /* 75% of 0.9rem */
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 11.25px; /* 75% of 15px */
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.6rem; /* 75% of 0.8rem */
  }
`;

const ContainerCard = styled.div`
  background: #222222; /* Dark background for the details */
  border-radius: 7.5px; /* 75% of 10px */
  padding: 11.25px; /* 75% of 15px */
  color: white;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    padding: 7.5px; /* 75% of 10px */
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 7.5px; /* 75% of 10px */

  @media (max-width: 480px) {
    font-size: 0.6rem; /* 75% of 0.8rem */
  }
`;

const TableHeader = styled.th`
  padding: 6px; /* 75% of 8px */
  text-align: left;
  background-color: #333;
  color: #ff00ff;
  font-size: 0.6375rem; /* 75% of 0.85rem */

  @media (max-width: 480px) {
    font-size: 0.5625rem; /* 75% of 0.75rem */
  }
`;

const TableData = styled.td`
  padding: 6px; /* 75% of 8px */
  text-align: left;
  color: white;
  font-size: 0.6375rem; /* 75% of 0.85rem */
  border-bottom: 0.75px solid #444; /* 75% of 1px */

  @media (max-width: 480px) {
    font-size: 0.5625rem; /* 75% of 0.75rem */
  }
`;

const ProfileCard = ({ player }) => {
  return (
    <Card>
      {/* Player Image */}
      <CardImage src={player.image} alt={player.name} />

      {/* Player Name */}
      <CardTitle>{player.name}</CardTitle>

      {/* Player Role */}
      <CardSubtitle>{player.role}</CardSubtitle>

      <ContainerCard>
        {/* Table for Player Details */}
        <Table>
          <thead>
            <tr>
              <TableHeader>Detail</TableHeader>
              <TableHeader>Information</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableData>Nationality</TableData>
              <TableData>{player.nationality}</TableData>
            </tr>
            <tr>
              <TableData>Age</TableData>
              <TableData>{player.age}</TableData>
            </tr>
            <tr>
              <TableData>Runs</TableData>
              <TableData>{player.runs || 'N/A'}</TableData>
            </tr>
            <tr>
              <TableData>Wickets</TableData>
              <TableData>{player.wickets || 'N/A'}</TableData>
            </tr>
            <tr>
              <TableData>Base Price</TableData>
              {/* <TableData>${player.basePrice}</TableData> */}
               <TableData>
                                    <span className="flex items-center">
                                      <MdOutlineCurrencyRupee className="" /> {player.basePrice} L
                                    </span>
                                  </TableData>
            </tr>
            <tr>
              <TableData>Strike Rate</TableData>
              <TableData>{player.strikeRate || 'N/A'}</TableData>
            </tr>
            {/* <tr>
              <TableData>50/100</TableData>
              <TableData>{player.fiftybyhundred}</TableData>
            </tr> */}
            <tr>
              <TableData>Economy</TableData>
              <TableData>{player.economy}</TableData>
            </tr>
            <tr>
              <TableData>Average</TableData>
              <TableData>{player.average}</TableData>
            </tr>
            <tr>
              <TableData>Sold</TableData>
              <TableData>{player.isSold ? 'Yes' : 'No'}</TableData>
            </tr>
            {player.isSold && (
              <>
                <tr>
                  <TableData>Sold Team</TableData>
                  <TableData>{player.soldTeam}</TableData>
                </tr>
                <tr>
                  <TableData>Sold Amount</TableData>
                  <TableData>
                    {/* ${player.soldAmount} */}
                     <span className="flex items-center">
                                            <MdOutlineCurrencyRupee className="" /> {player.soldAmount} L
                                          </span>
                    </TableData>
                </tr>
              </>
            )}
          </tbody>
        </Table>
      </ContainerCard>
    </Card>
  );
};

export default ProfileCard;
