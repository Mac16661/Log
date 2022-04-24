import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Feed.css";

function Feed({ gun }) {
  const [feed, setFeed] = useState([]);
  //TODO: fetching feed data
  useEffect(() => {
    let last;
    gun
      .get("newFeed3.0")
      .map()
      .on((data) => {
        gun.get(data).once((d) => {
          if (d === last) return;
          setFeed((feed) => [
            ...feed,
            { id: data, text: d.text, userPub: d.userPub },
          ]);
          //   console.log(last);
          last = d;
          // console.log(d);
        });
      });
    return () => {
      gun.get("newFeed3.0").off();
    };
  }, []);

  return (
    <div className="Post">
      {feed.map((data) => (
        <Card key={data.id} user={data.userPub} data={data.text} gun={gun} />
      ))}
    </div>
  );
}

export default Feed;
