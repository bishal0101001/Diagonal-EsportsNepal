import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Tournament from "./Tournament";
import {
  tournamentData as dataAction,
  updateTournamentParticipants,
} from "../actions/tournamentDataActions";

// class Tournaments extends Component {
//   state = {
//     newData: null,
//   };
//   // const { socket } = useSelector(state => state)
//   renderRoomLeft = (type, participants) => {
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

//   renderDynamicRoues = (data) => {
//     const type = data?.toLowerCase();
//     switch (type) {
//       case "event-squad":
//         return "/events/grand-event";
//       case "squad":
//         return "/events/squad-clash";
//       case "duo":
//         return "/events/deadly-duo";
//       case "solo":
//         return "/events/solo-rule";
//       default:
//         return "/events";
//     }
//   };

//   componentDidMount() {
//     console.log("componentDidMount called outside");
//     this.props.socket.on("updatedData", (data) => {
//       console.log("componentDidMount called");
//       this.setState({ newData: data });
//       // this.props.dispatch(updateTournamentParticipants(data));
//     });
//     /!this.props.tournamentData && this.props.dispatch(dataAction());

//     // this.props.socket.on("updatedData", (data) => {
//     //   console.log("componentDidMount called");
//     //   // this.setState({ newData: data});
//     // });

//     // const { newData } = this.state;
//     // newData && this.props.dispatch(updateTournamentParticipants(newData));
//     // this.setState({ newData: null });
//   }

//   componentDidUpdate() {
//     const newData = this.state.newData;
//     newData && this.props.dispatch(updateTournamentParticipants(newData));
//   }

//   handleClick = () => {
//     console.log("clicked");
//     this.setState({ newData: undefined });
//   };

//   render() {
//     const {
//       userLogin: { userInfo },
//       tournamentData,
//       socket,
//     } = this.props;

//     // console.log(this.state.newData, "newData");
//     const auth = userInfo ? true : false;
//     // console.log(this.props);
//     return (
//       <div className="__tournament-card_container">
//         <button onClick={this.handleClick}>click</button>
//         {tournamentData &&
//           tournamentData.data
//             /?.map((item) => item.tournament)
//             .map((i) =>
//               i.map((tournament) => {
//                 return (
//                   <Tournament
//                     key={tournament._id}
//                     heading={tournament.name}
//                     img="/imgs/grand-squad-clash.jpg"
//                     poolPrize={tournament.poolPrize}
//                     roomLeft={this.renderRoomLeft(
//                       tournament.type,
//                       tournament.participants.length
//                     )}
//                     participants={tournament.participants.length}
//                     route={this.renderDynamicRoues(tournament.type)}
//                     auth={auth}
//                   />
//                 );
//               })
//             )}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   socket: state.socket,
//   userLogin: state.userLogin,
//   tournamentData: state.tournamentData,
// });

// export default connect(mapStateToProps)(Tournaments);

const Tournaments = () => {
  const dispatch = useDispatch();
  const [newData, setNewData] = useState(null);
  const tournamentData = useSelector((state) => state.tournamentData);
  const {
    socket,
    userLogin: { userInfo },
  } = useSelector((state) => state);

  const renderRoomLeft = (type, participants) => {
    switch (type) {
      case "Squad Event":
        return 25 - participants;
      case "Squad":
        return 25 - participants;
      case "Duo":
        return 45 - participants;
      case "Solo":
        return 90 - participants;
      default:
        return 0;
    }
  };

  const renderDynamicRoues = (data) => {
    const type = data?.toLowerCase();
    switch (type) {
      case "event-squad":
        return "/events/grand-event";
      case "squad":
        return "/events/squad-clash";
      case "duo":
        return "/events/deadly-duo";
      case "solo":
        return "/events/solo-rule";
      default:
        return "/events";
    }
  };

  useEffect(() => {
    !tournamentData && dispatch(dataAction());
    socket?.on("updatedData", (data) => {
      setNewData(data);
    });
  }, [dispatch, tournamentData, socket]);

  useEffect(() => {
    newData && dispatch(updateTournamentParticipants(newData));
  }, [newData, dispatch]);

  const auth = userInfo ? true : false;

  return (
    <div className="__tournament-card_container">
      {tournamentData &&
        tournamentData.data
          ?.map((item) => item.tournament)
          .map((i) =>
            i.map((tournament) => {
              return (
                <Tournament
                  key={tournament._id}
                  heading={tournament.name}
                  img="/imgs/grand-squad-clash.jpg"
                  poolPrize={tournament.poolPrize}
                  roomLeft={renderRoomLeft(
                    tournament.type,
                    tournament.participants.length
                  )}
                  participants={tournament.participants.length}
                  route={renderDynamicRoues(tournament.type)}
                  auth={auth}
                />
              );
            })
          )}
    </div>
  );
};

export default Tournaments;
