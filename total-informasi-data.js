const totalCount = await User.countDocuments(); 
const totalPages = Math.ceil(totalCount / limit);

res.json({
  users,
  currentPage: page,
  totalPages,
  totalUsers: totalCount,
});
