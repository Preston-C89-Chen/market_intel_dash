export const filterPositionSize = (data) => {
  // getting top 3 long
  const sortedLong = data.sort((a,b) => a.commercialPositionsLongAll - b.commercialPositionsLongAll);
  const sortedShort = data.sort((a,b) => a.commercialPositionsShortAll - b.commercialPositionsShortAll);
  return {
    "long": sortedLong.slice(0,3),
    "short": sortedShort.slice(0,3)
  };
}

export const filterSpread = () => {

}

export const filterContrarian = () => {

}