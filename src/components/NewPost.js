import React, { useState } from "react";
import Gun from "gun";
import { SEA } from "gun";
import "./NewPost.css";
import { TextField, Button } from "@mui/material";
import { Web3Storage, getFilesFromPath } from "web3.storage";

const apiToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEUxYjc5QTZmM0I0ZkY5M2FjYjgwYjc3YUI0NDUzQUJGMUUyNjkxMDciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDc5NjY2ODE5NTEsIm5hbWUiOiJkLWNoYXQifQ.4eEl-M2x2d7IA_DwloL4-T7RA_TwO_zN_UsOGDoVxfw";

// const client = new Web3Storage({ token: apiToken });

function NewPost({ gun }) {
  const key = JSON.parse(localStorage.getItem("auth"));
  const [post, setPost] = useState("");
  const [file, setFile] = useState("");

  // const handleUpload = async () => {
  //   alert(document.getElementById("input").files[0]);
  //   var fileInput = document.getElementById("input");

  //   const rootCid = await client.put(fileInput.files, {
  //     name: "d-chat",
  //     maxRetries: 3,
  //   });

  //   alert(rootCid);

  //   //TODO: display image side code
  //   // const res = await client.get(rootCid);
  //   // const files = await res.files();
  //   // console.log(files);
  //   // const url = URL.createObjectURL(files[0]);
  //   // console.log(url);
  //   // setFile(url);
  // };

  const handlePost = () => {
    if (key.pub) {
      gun
        .user()
        .get("post_v1")
        .set({
          text: post,
          userPub: key.pub,
        })
        .on(async (data) => {
          let soul = Gun.node.soul(data);
          var hash = await SEA.work(soul, null, null, { name: "SHA-256" });

          gun.get("newFeed3.0").get(hash).put(soul);
        });

      setPost("");

      gun.get(key.pub).set({
        text: post,
        userPub: key.pub,
      });
    }
  };
  return (
    <div className="NewPost">
      <TextField
        className="input-field"
        id="Lets Post"
        label="Lest post"
        variant="outlined"
        multiline
        rows={2}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <div className="btn">
        <Button variant="contained" onClick={handlePost}>
          Send
        </Button>
      </div>
    </div>
  );
}

export default NewPost;
