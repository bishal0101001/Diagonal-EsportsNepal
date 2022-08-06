// import React, { useState, useEffect, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import io from "socket.io-client";

// import Tournament from "./Tournament";
// // import {
// //   totalSquadsForGrandEventAction,
// //   totalSquadsAction,
// //   totalDuoAction,
// //   totalSoloAction,
// // } from "../actions/totalPlayerAction";

// import {
//   tournamentData as dataAction,
//   updateTournamentParticipants,
// } from "../actions/tournamentDataActions";

// const Tournaments = () => {
//   const [tourData, setData] = React.useState(null);

//   const dispatch = useDispatch();
//   // const { totalSquadsForEvent, totalSquads, totalDuo, totalSolo } = useSelector(
//   //   (state) => state.totalPlayers
//   // );
//   const {
//     userLogin: { userInfo },
//     tournamentData,
//   } = useSelector((state) => state);

//   const auth = userInfo ? true : false;

//   const renderRoomLeft = (type, participants) => {
//     switch (type) {
//       case "Squad Event":
//         return 25 - participants;
//       case "Squad":
//         return 25 - participants;
//       case "Duo":
//         return 45 - participants;
//       case "Solo":
//         return 90 - participants;
//       default:
//         return 0;
//     }
//   };

//   // useEffect(() => {
//   //   dispatch(totalSquadsForGrandEventAction());
//   //   dispatch(totalSquadsAction());
//   //   dispatch(totalDuoAction());
//   //   dispatch(totalSoloAction());
//   // }, [dispatch]);

//   // React.useEffect(() => {
//   //   const socket = io("/api/socket");
//   //   socket.on("updatedData", (data) => {
//   //     setData(data);
//   //     console.log(data);
//   //   });
//   // });

//   useEffect(() => {
//     !tournamentData && dispatch(dataAction());
//   });

//   useMemo(() => {
//     const socket = io("/api/socket");
//     socket.on("updatedData", (data) => {
//       console.log(data, "new Data");
//       setData(data);
//       data && dispatch(updateTournamentParticipants(tourData));
//     });
//   }, [dispatch, tourData]);

//   return (
//     <div className="__tournament-card_container">
//       {tournamentData &&
//         tournamentData.data?.map((item) => (
//           // <div key={item._id}>
//           <Tournament
//             key={item._id}
//             heading={item.name}
//             img="/imgs/grand-squad-clash.jpg"
//             poolPrize={item.poolPrize}
//             roomLeft={renderRoomLeft(item.type, item.participants.length)}
//             participants={item.participants.length}
//             route="/events/grand-event"
//             auth={auth}
//           />
//         ))}
//       {/* <Tournament
//         heading="Grand Squad Clash"
//         img="/imgs/grand-squad-clash.jpg"
//         poolPrize="Rs 10000"
//         roomLeft={26 - totalSquadsForEvent}
//         participants={totalSquadsForEvent}
//         route="/events/grand-event"
//         auth={auth}
//       />
//       <Tournament
//         heading="Beast Squad"
//         img="/imgs/Squad-Battle.jpg"
//         poolPrize="Rs 5000"
//         roomLeft={26 - totalSquads}
//         totalPlayers={totalSquads}
//         route="/events/squad-clash"
//         auth={auth}
//       />
//       <Tournament
//         heading="Deadly Duo"
//         img="/imgs/Deadly-Duo.jpg"
//         poolPrize="Rs 3000"
//         roomLeft={50 - totalDuo}
//         totalPlayers={totalDuo}
//         route="/events/deadly-duo"
//         auth={auth}
//       />
//       <Tournament
//         heading="Solo Rule"
//         img="/imgs/solo-clash.webp"
//         poolPrize="Rs 2500"
//         roomLeft={100 - totalSolo}
//         totalPlayers={totalSolo}
//         route="/events/solo-rule"
//         auth={auth}
//       /> */}
//     </div>
//   );
// };

// export default Tournaments;
