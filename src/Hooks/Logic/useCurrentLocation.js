import { useLocation } from "react-router-dom";

export const useCurrentLocation = () => {
  const locationData = {
    pathName: useLocation().pathname,
    search: useLocation().search,
  };
  const currentLocation = `${locationData.pathName}${locationData?.search}`;
  return [currentLocation, locationData.pathName, locationData.search];
};
