import React from "react";
import jwtDecode from "jwt-decode";
import { Body, offWhite, PrimaryButton, SecondaryButton } from "../App-Styles";
import { deepOrange } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import {
  Tooltip,
  ClickAwayListener,
  formHelperTextClasses,
  makeStyles,
  Avatar,
} from "@material-ui/core";

class Profil extends React.Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("bruker_budsjett_token");

    let payload;
    try {
      payload = jwtDecode(token);
      console.log(payload);
    } catch (err) {
      // throw new Error('noe gikk galt')
    }

    this.state = {
      budsjett: [],
      isLoading: false,
      error: null,
      message: "",
      session: payload,
      open: false,
    };
  }

  render() {
    const { session: { navn, epost } = {} } = this.state;

    const { open } = this.state;

    const profilStyleOver = {
      backgroundColor: "#FAF9F6",
      width: "100vw",
      display: "grid",
      placeItems: "center",
    };
    const profilStyleUnder = {
      width: "auto",
      margin: "0em 1em",
    };

    const profilKort = {
      backgroundColor: "#3C5948",
      color: "#FAF9F6",
      maxWidth: "500px",
      margin: "auto",
      borderRadius: "5px",
      padding: "2em",
    };

    const profilAvatar = {
      height: "200px",
      width: "200px",
      margin: "2rem",
      backgroundColor: deepOrange[500],
    };

    const profilSide = {
      display: "flex",
      flexFlow: "column",
      justifyContent: "center",
    };

    const editButton = {
      width: "300px",
      fontSize: "medium",
    };

    const loggUtKnapp = {
      width: "300px",
      fontSize: "medium",
      marginTop: "0px",
    };
    const buttons = {
      display: "flex",
      flexFlow: "column",
      justifyContent: "center",
      alignItems: "center",
    };

    const handleTooltipClose = () => {
      this.state.open = false;
    };

    const handleTooltipOpen = () => {
      this.state.open = true;
    };

    return (
      <div style={profilSide}>
        <div style={profilStyleOver}>
          <Avatar style={profilAvatar}>{navn}</Avatar>
        </div>
        <div style={profilStyleUnder}>
          <div style={profilKort}>
            <h2>Profil</h2>
            <p>Navn: {navn}</p>
            <p>Epost: {epost}</p>
            <h2 style={{ marginBottom: "0.1em" }}>Innstillinger</h2>
            <p
              style={{
                fontStyle: "italic",
                marginTop: "0px",
                paddingLeft: "0.1em",
              }}
            >
              Info blir brukt i SIFOs referansebudsjett
            </p>
            <p>Kjønn: </p>
            <p>Årsinntekt: </p>
            <p>Antall fossilbil(er): </p>
            <p>Antall elbil(er): </p>
            <p>Student: </p>
          </div>
        </div>
        <div style={buttons}>
          <PrimaryButton style={editButton}>
            Rediger brukerinnstillinger
          </PrimaryButton>
          <Link to="/loggut">
            <SecondaryButton style={loggUtKnapp}>Logg ut</SecondaryButton>
          </Link>
        </div>
      </div>
    );
  }
}

export default Profil;
