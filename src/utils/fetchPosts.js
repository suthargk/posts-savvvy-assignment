const fetchPosts = ({ page }) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`);
};

export default fetchPosts;
