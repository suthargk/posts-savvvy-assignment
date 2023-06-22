import { useEffect, useState } from "react";
import { connect } from "react-redux";

import DashboardTable from "./DashboardTable";
import DashboardHeader from "./DashboardHeader";
import fetchPosts from "../../utils/fetchPosts";
import {
  FETCH_NEXT_POSTS,
  FETCH_POSTS,
  FETCH_PREV_POSTS,
} from "../../store/action";

const Dashboard = ({ posts, dispatch, currentPage, sort }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts({ page: currentPage })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: FETCH_POSTS,
          payload: { data, currentPage },
        });
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handlePrev = () => {
    setIsLoading(true);
    fetchPosts({ page: currentPage - 1 })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: FETCH_PREV_POSTS,
          payload: {
            data,
            currentPage: currentPage - 1,
            sort: sort,
          },
        });
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleNext = () => {
    setIsLoading(true);
    fetchPosts({ page: currentPage + 1 })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: FETCH_NEXT_POSTS,
          payload: {
            data,
            currentPage: currentPage + 1,
            sort: sort,
          },
        });
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSearch = (event) => {
    const value = event.target.value;

    setSearchKeyword(value);

    if (value) {
      setIsLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${value}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: FETCH_POSTS,
            payload: { data, currentPage },
          });
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      fetchPosts({ page: currentPage })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: FETCH_PREV_POSTS,
            payload: {
              data,
              currentPage,
              sort: sort,
            },
          });
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div
      className="border border-gray-200 rounded-lg"
      style={{ maxWidth: "82rem" }}
    >
      <DashboardHeader
        handlePrev={handlePrev}
        handleNext={handleNext}
        searchKeyword={searchKeyword}
        handleSearch={handleSearch}
      />
      <DashboardTable posts={posts} isLoading={isLoading} error={error} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

const mapStateToProps = (state) => {
  return {
    posts: state.postState.posts,
    currentPage: state.postState.current_page,
    sort: state.postState.sort,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
