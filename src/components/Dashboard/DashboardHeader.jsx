import SortIcon from "../../assets/SortIcon";
import { SORT_POST } from "../../store/action";
import Pagination from "./Pagination";

import { connect } from "react-redux";

const DashboardHeader = ({
  handlePrev,
  handleNext,
  posts,
  dispatch,
  sort,
  searchKeyword,
  handleSearch,
}) => {
  const handleSort = () => {
    dispatch({
      type: SORT_POST,
      payload: {
        data: posts,
        sort: sort === "asc" ? "desc" : "asc",
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row p-4 justify-center space-y-4 md:space-x-4 md:space-y-0 items-center ">
      <div className="w-full">
        <input
          onChange={handleSearch}
          type="text"
          value={searchKeyword}
          placeholder="Search by title..."
          className="px-4 py-2 border w-full border-gray-200 rounded-lg outline-none focus:outline-blue-200 transition-all duration-300"
        />
      </div>
      <div className="flex space-x-4 w-full md:w-auto justify-end">
        <button
          type="button"
          onClick={handleSort}
          className={`flex text-gray-500 text-base items-center space-x-2 hover:bg-gray-100 hover:text-gray-600 rounded-lg p-2 transition-all duration-300 ${
            sort === "asc" && "bg-gray-100"
          }`}
        >
          <SortIcon />
          <span>Sort</span>
        </button>
        <Pagination handlePrev={handlePrev} handleNext={handleNext} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

const mapStateToProps = (state) => {
  return {
    posts: state.postState.posts,
    sort: state.postState.sort,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
