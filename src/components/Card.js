import React, { useState, useEffect } from "react";
import "./Card.css";
import { Avatar, Chip } from "@mui/material";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ShareIcon from "@mui/icons-material/Share";
// import ModeCommentIcon from "@mui/icons-material/ModeComment";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Card({ user, data, gun }) {
  const [usersProfile, setUsersProfile] = useState({});
  const [open, setOpen] = useState(false);
  const [feed, setFeed] = useState([{}]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //TODO: to search or find users
  // useEffect(() => {
  //   gun
  //     .get("testUserProfiles")
  //     .map()
  //     .on((d) => gun.get(d).once((data) => console.log(data)));
  // }, []);

  useEffect(() => {
    gun
      .get("testUserProfiles")
      .get(user)
      .on((data) => {
        gun.get(data).once((d) =>
          setUsersProfile({
            name: d.name,
            image: d.image,
            desc: d.desc,
          })
        );
      });

    return () => {
      gun.get("testUserProfiles").off();
    };
  }, []);

  //"ODTTZCrn5p3JujEtAbQoWEvPvr2aA9BRgkhCR85QG-4.EWoyvL-RvdHMvVEqfzMh9_KfAHxc7at9VzRK0IDe-qU"
  //TODO: how to get user personal feed
  useEffect(() => {
    let last;
    gun
      .get(user)
      .map()
      .once((d) => {
        if (d === last) return;
        setFeed((feed) => [...feed, d]);
        //   console.log(last);
        last = d;
        // console.log(d);
      });
  }, []);

  return (
    <div>
      <div className="card">
        <div className="user-details">
          <div className="avatar-size">
            <Avatar
              alt={user}
              src={usersProfile.image}
              sx={{ width: 60, height: 60 }}
            />
          </div>
          <div className="user-post">
            <div>
              <Chip
                onClick={handleClickOpen}
                label={user ? usersProfile.name : "unknown user"}
                className="chip"
              />
              <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
              >
                <AppBar sx={{ position: "relative" }}>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography
                      sx={{ ml: 2, flex: 1 }}
                      variant="h6"
                      component="div"
                    >
                      {usersProfile.name}
                    </Typography>
                  </Toolbar>
                </AppBar>
                <div className="display-detail">
                  <Avatar
                    alt="Remy Sharp"
                    src={usersProfile.image}
                    sx={{ width: 300, height: 300 }}
                  />
                  <div className="display-others-profile">
                    <Typography variant="h2" component="h2">
                      {usersProfile.name}
                    </Typography>
                    <Typography variant="h4" component="h4">
                      {usersProfile.desc}
                    </Typography>
                  </div>
                </div>

                <div className="display-feed">
                  <Typography variant="h4" component="h4">
                    {` posts`}
                  </Typography>
                  {feed.map((data) => (
                    <Typography
                      className="display-post"
                      variant="h6"
                      component="h6"
                    >
                      {data.text}
                    </Typography>
                  ))}
                </div>
              </Dialog>
            </div>
            <p className="post">{data}</p>
          </div>
        </div>
      </div>
      {/* <div className="feedback">
        <FavoriteBorderIcon className="icons" />
        <ShareIcon className="icons" />
        <ModeCommentIcon className="icons" />
      </div> */}
    </div>
  );
}

export default Card;
