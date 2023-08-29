currentUserHandler = (req, res) => {
  const currentlyLoggedinUser = req.session.user;

  if (currentlyLoggedinUser === undefined) {
    res.redirect("/login"); 
  } else {
    res.json({
      username: currentlyLoggedinUser.username,
      id: currentlyLoggedinUser.id,
    });
  }
};


module.exports = currentUserHandler;