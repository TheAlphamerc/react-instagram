import { useEffect, useState } from "react";
import { Profile } from "../models/profile";
import ProfileService from "../services/profile";
import useScroll from "./use-scroll";

/**
 * Get suggested users list
 * @param {string} userId Get suggested users list
 * @param {number} pageLimit set page limit
 * @param {number} maxLimit set max limit
 * @returns
 */
function usePeople(userId: string, pageLimit: number, maxLimit: number) {
  const [people, setpeople] = useState<Array<Profile> | undefined>();
  const [lastId, setLastId] = useState<string>("");
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);

  useScroll(hasMoreData, loadMore, isLoading, setLoadMore);

  /// Restrict Effect to get people more then asked limit
  useEffect(() => {
    if (people && maxLimit && people.length == maxLimit) {
      setHasMoreData(false);
      setLoadMore(false);
    }
  }, [people]);

  /// Get people list from firebase
  useEffect(() => {
    async function fetchSuggestedProfiles() {
      setIsLoading(true);
      const list = await ProfileService.getSuggestedProfiles(
        userId,
        lastId,
        pageLimit
      );
      if (list && list.length > 0) {
        setLastId(list.reverse()[0].userId);
        list.sort((a, b) => b.createdAt - a.createdAt);

        /// Check and set if all data is loaded
        setHasMoreData(list.length == pageLimit);

        /// Set people list for first time
        if (people === undefined) {
          setpeople(list);
        } else {
          /// Set people list for next time
          var newList = people.concat(list);
          setpeople(newList);
        }
      } else {
        setpeople([]);
        setHasMoreData(false);
      }
      setLoadMore(false);
      setIsLoading(false);
    }
    if (userId && !isLoading) {
      if (hasMoreData) {
        fetchSuggestedProfiles();
      } else {
        console.log("No more data available");
      }
    }
  }, [userId, loadMore]);

  return people;
}

export default usePeople;
