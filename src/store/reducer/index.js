import {
  FETCH_NEXT_POSTS,
  FETCH_POSTS,
  FETCH_PREV_POSTS,
  SEARCH_POST,
  SORT_POST,
} from "../action";

const INITIALDATA = {
  posts: [],
  current_page: 1,
  sort: "",
};

const applySortPost = (sort, data) => {
  let sortedData;
  let sorting = "";
  if (sort === "asc") {
    sorting = "asc";
    sortedData = [...data].sort((a, b) => {
      if (a.title < b.title) return -1;
      if (b.title < a.title) return 1;
    });
    return { sorting, sortedData };
  } else {
    sortedData = [...data].sort((a, b) => {
      if (a.title < b.title) return 1;
      if (b.title < a.title) return -1;
    });
    sorting = "desc";
    return { sorting, sortedData };
  }
};

export const reducer = (state = INITIALDATA, action) => {
  switch (action.type) {
    case FETCH_POSTS: {
      const { data, currentPage } = action.payload;
      return {
        ...state,
        posts: data,
        current_page: currentPage,
      };
    }
    case FETCH_PREV_POSTS: {
      const { data, currentPage, sort } = action.payload;
      const { sorting, sortedData } = applySortPost(sort, data);
      return {
        ...state,
        posts: sortedData,
        sort: sorting,
        current_page: currentPage,
      };
    }
    case FETCH_NEXT_POSTS: {
      const { data, currentPage, sort } = action.payload;
      const { sorting, sortedData } = applySortPost(sort, data);
      return {
        ...state,
        posts: sortedData,
        sort: sorting,
        current_page: currentPage,
      };
    }

    case SORT_POST: {
      const { data, sort } = action.payload;
      const { sorting, sortedData } = applySortPost(sort, data);
      return { ...state, posts: sortedData, sort: sorting };
    }

    case SEARCH_POST: {
      const { data } = action.payload;
      return { ...state, posts: data };
    }
    default:
      return state;
  }
};
