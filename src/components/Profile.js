//TODO: get ALL THE USERS PROFILE
gun
  .get("testUserProfiles")
  .map()
  .on((data) => {
    gun
      .get(data)
      .once((d) =>
        setUser((user) => [...user, { name: d.name, image: d.image }])
      );
  });

//TODO: HOW TO EDIT USER GRAPH @Mac16661 user.get('thingToEdit').put({some: 'edited', data: 'here'})! Same as usual! No different!

//TODO: FOR USER PROFILE PAGE FEED(OR USERS PERSONAL FEED) completely working
// useEffect(() => {
//   gun
//     .get("newFeed")
//     .get(
//       "ODTTZCrn5p3JujEtAbQoWEvPvr2aA9BRgkhCR85QG-4.EWoyvL-RvdHMvVEqfzMh9_KfAHxc7at9VzRK0IDe-qU"
//     )
//     .map()
//     .once((data) => {
//       gun.get(data).once((d) => console.log(d));
//     });
// }, []);
