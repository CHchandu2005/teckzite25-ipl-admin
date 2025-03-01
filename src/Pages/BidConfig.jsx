export const getBidIncrement = (currentBidPrice) => {
  if (currentBidPrice <100) {
    return 5; // 5 lakh
  } else if (currentBidPrice >=100 && currentBidPrice < 200) {
    return 10; // 10 lakh
  } else if(currentBidPrice>=200 && currentBidPrice<500) {
    return 20; // 20 lakh
  }
  else{
    return 25;
  }
};
