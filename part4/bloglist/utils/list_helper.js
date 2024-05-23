var _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  return blogs.length === 0
    ? 0
    : blogs.map((blog) => blog.likes).reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.length === 0
    ? {}
    : blogs
        .map((blog) => ({
          title: blog.title,
          author: blog.author,
          likes: blog.likes,
        }))
        .find((blog) => mostLikes === blog.likes);
};

const mostBlogs = (blogs) => {
  const simplifyBlogs = _.map(blogs, "author");
  const count = _.countBy(simplifyBlogs);
  const mostBlogs = _.maxBy(Object.values(count));
  const authorName = _.findKey(count, (blog) => blog === mostBlogs);
  return blogs.length === 0
    ? {}
    : {
        author: authorName,
        blogs: mostBlogs,
      };
};

const mostLikes = (blogs) => {
  //make an array list with author name as the main key
  const groupedData = _.groupBy(blogs, "author");
  //map all of the values keys into the sum of likes based on author name, the format was like author_name : total_likes
  const likesByAuthor = _.mapValues(groupedData, (entries) =>
    _.sumBy(entries, "likes")
  );
  //getting the most amount of likes by maxBy function and getting all the value from the object list which is the total likes
  const mostLiked = _.maxBy(Object.values(likesByAuthor));
  //use that mostLikes value as an interger to find the key of it
  const mostLovedAuthor = _.findKey(
    likesByAuthor,
    (blog) => blog === mostLiked
  );
  return blogs.length === 0
    ? {}
    : {
        author: mostLovedAuthor,
        likes: mostLiked,
      };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
