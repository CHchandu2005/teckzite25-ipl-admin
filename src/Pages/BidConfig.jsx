export const getBidIncrement = (basePrice) => {
    if (basePrice <= 20000000) {
      return 2000000; // 20 lakh
    } else if (basePrice > 20000000 && basePrice < 100000000) {
      return 5000000; // 50 lakh
    } else {
      return 10000000; // 1 crore
    }
  };
  