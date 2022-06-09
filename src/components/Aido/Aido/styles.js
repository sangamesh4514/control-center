import { makeStyles } from "@material-ui/core";
import image from "./aido.jpg";

export default makeStyles((theme) => ({
  image: {
    backgroundImage: `url(${image})`,
  },
  aido: {
    background: "#EAF1F8",
    border: "2.5px solid #F2F9FF",
    boxShadow:
      " inset 6px 5px 7px 1.5px rgba(204, 216, 236, 0.2), inset -5px -5px 2px rgba(255, 255, 255, 0.3)",
    borderRadius: "27px",
  },
  title: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "18px",
    color: "#747C8B",
  },
  subtitle: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "15px",
    lineHeight: "10px",
    color: "#747C8B",
  },
  button: {
    background:
      "linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F8",
    border: "2.5px solid rgba(255, 255, 255, 0.4)",
    boxSizing: "border-box",
    boxShadow: "inset 1px 1px 1px rgba(255, 255, 255, 0.241013)",
    borderRadius: "50px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "13px",
    lineHeight: "15px",
    textAlign: "center",
    letterSpacing: "0.00310565px",
    color: "#747C8B",
    width:"80%",
    padding:"1em"
  },
}));
