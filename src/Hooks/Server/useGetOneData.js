import { getOneData } from "../../Services/RemoteService/Actions/getOneData";
import queryKeys from "../../Utilities/queryKeys";
import { useQuery } from "react-query";

export const useGetOneData = (searchName) =>
  useQuery(
    [queryKeys.GET_ONE_DATA_KEY, searchName],
    () => getOneData(searchName),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );
