import { useEffect } from "react";

/**
 * Get suggested users list
 * @param {boolean} hasMoreData
 * @param {boolean} loadMore
 * @param {boolean} isLoading
 * @param {Function} setLoadMore
 * @returns
 */

function useScroll(
  hasMoreData: boolean,
  loadMore: boolean,
  isLoading: boolean,
  setLoadMore: (e: boolean) => void
) {
  /// Trigger  load more effect
  useEffect(() => {
    // create callback
    const callBack = () => {
      if (
        window.innerHeight + window.scrollY + 100 >=
        document.body.offsetHeight
      ) {
        // Fetch more post feed when user scrolls to bottom
        if (hasMoreData && !isLoading && !loadMore) {
          console.log("Load more");
          setLoadMore(true);
        }
      }
    };
    console.log("Scroll listener attached:");
    window.addEventListener("scroll", callBack);
    return () => {
      console.log("Scroll listener Removed:");
      window.removeEventListener("scroll", callBack);
    };
  }, []);
}

export default useScroll;
