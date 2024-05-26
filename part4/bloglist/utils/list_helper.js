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
  //for every blog object, return a new object with only map numbers and array got passed to find the max
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.length === 0
    ? {}
    : blogs
        .map((blog) => ({
          title: blog.title,
          author: blog.author,
          likes: blog.likes,
        })) //find the object with that most numbers
        .find((blog) => mostLikes === blog.likes);
};

const mostBlogs = (blogs) => {
  //only return the list with author name
  const simplifyBlogs = _.map(blogs, "author");
  //count the numbers of author name, similar to using COUNT with GROUP BY in SQL
  const count = _.countBy(simplifyBlogs);
  //find the most appeared author based on the last object created
  const mostBlogs = _.maxBy(Object.values(count));
  //use the highest value to find the original key which is the author's name
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
