import { getUiInfoStorage } from "../Services/LocalService/localService";
import queryKeys from "./queryKeys";

const updateQueryData = (
  defaultData,
  { searchName, newData, queryClient, sortedType }
) => {
  const updatedData = {
    defaultData,
    data: [
      {
        [searchName]: newData,
        userEmail: getUiInfoStorage().email,
        sortedType,
      },
    ],
  };

  queryClient.setQueryData(
    [queryKeys.GET_ONE_DATA_KEY, searchName],
    updatedData
  );
};
export default updateQueryData;
