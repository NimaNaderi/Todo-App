import { getAllData } from "../../Services/RemoteService/Actions/getAllData";
import queryKeys from "../../Utilities/queryKeys";
import { useQuery } from "react-query";

export const useGetAllData = () =>
  useQuery(queryKeys.GET_ALL_DATA_KEY, getAllData, {
    refetchOnWindowFocus: false,
  });
