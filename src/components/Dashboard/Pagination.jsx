import { connect } from "react-redux";
import LeftChevron from "../../assets/LeftChevron";
import RightChervon from "../../assets/RightChervon";

const Pagination = ({ handlePrev, handleNext, currentPage, posts }) => {
  return (
    <div
      style={{ width: "120px" }}
      className="text-gray-500 border border-gray-300 flex rounded-lg divide-x justify-between overflow-hidden"
    >
      <button
        type="button"
        className={`p-2 w-10 hover:bg-gray-100 transition-all duration-300 ${
          (currentPage === 1 || posts.length === 0) &&
          "cursor-not-allowed text-gray-300"
        }`}
        onClick={handlePrev}
        disabled={currentPage === 1 || posts.length === 0}
      >
        <LeftChevron />
      </button>
      <div className="p-2 flex text-sm items-center justify-center text-gray-700 w-10">
        {currentPage}
      </div>
      <button
        type="button"
        className={`p-2 w-10 hover:bg-gray-100 transition-all duration-300 ${
          (currentPage === 10 || posts.length === 0) &&
          "cursor-not-allowed text-gray-300"
        }`}
        onClick={handleNext}
        disabled={currentPage === 10 || posts.length === 0}
      >
        <RightChervon />
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPage: state.postState.current_page,
    posts: state.postState.posts,
  };
};

export default connect(mapStateToProps)(Pagination);
