import { isUserSignedUp } from "../../Services/RemoteService/Actions/isUserSignedUp";
import queryKeys from "../../Utilities/queryKeys";
import { useQuery } from "react-query";

export const useIsUserSignedUp = () =>
  useQuery(queryKeys.IS_USER_SIGNED_UP_KEY, isUserSignedUp, {
    refetchOnWindowFocus: false,
  });
