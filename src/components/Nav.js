import React, { useState, useEffect } from "react";
import Gun from "gun";
import "./Nav.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Nav({ gun }) {
  const key = JSON.parse(localStorage.getItem("auth"));
  const [yourProfile, setYourProfile] = useState({});
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [feed, setFeed] = useState([{}]);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (key.pub) {
      gun
        .user()
        .get("profile")
        .put({
          name: name,
          image: image,
          desc: desc,
        })
        .on(async (data) => {
          let soul = Gun.node.soul(data);

          gun.get("testUserProfiles").get(key.pub).put(soul);
        });
    } else {
      console.log("There is no user");
    }

    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.setItem("auth", null);
    navigate("/");
  };

  useEffect(() => {
    // console.log(key);
    //TODO: getting USER OWN PROFILE DATA
    if (key) {
      gun
        .get("testUserProfiles")
        .get(key.pub)
        .on((data) => {
          gun.get(data).once((d) =>
            setYourProfile({
              name: d.name,
              image: d.image,
              desc: d.desc,
            })
          );
        });
    }

    return () => {
      gun.get("testUserProfiles").off();
    };
  }, []);

  useEffect(() => {
    if (key) {
      let last;
      gun
        .get(key.pub)
        .map()
        .once((d) => {
          if (d === last) return;
          setFeed((feed) => [...feed, d]);
          //   console.log(last);
          last = d;
          // console.log(d);
        });
    }
  }, []);

  return (
    <div className="border">
      <div className="nav">
        {/* <img
        className="size"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1200px-Twitter-logo.svg.png"
        alt="logo"
      /> */}
        <h2 className="text">Log {yourProfile.name}</h2>
        <div className="icons">
          <AccountCircleIcon className="size space" onClick={handleClickOpen} />
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
                  Your Profile
                </Typography>
                <Button autoFocus color="inherit" onClick={handleSave}>
                  save
                </Button>
              </Toolbar>
            </AppBar>
            <div className="dispaly-docs">
              <Avatar
                alt="s"
                src={yourProfile.image}
                sx={{ width: 300, height: 300 }}
              />
              <div className="display-name">
                <Typography variant="h2" component="h2">
                  {` ${yourProfile.name}`}
                </Typography>

                <Typography variant="h4" component="h4">
                  {`${yourProfile.desc}`}
                </Typography>
              </div>
            </div>
            <div className="display-edit">
              <TextField
                id="standard-basic"
                label="name"
                variant="standard"
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                id="standard-basic"
                label="image link"
                variant="standard"
                onChange={(e) => setImage(e.target.value)}
              />
              <TextField
                id="standard-basic"
                label="description"
                variant="standard"
                onChange={(e) => setDesc(e.target.value)}
              />
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
          <SearchIcon className="size space" />
          <ChatBubbleIcon className="size space" />
          <LogoutIcon className="size space" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
}

export default Nav;
