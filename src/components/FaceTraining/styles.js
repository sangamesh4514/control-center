import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  customization: {
    // left: "22.66%",
    // right: "2.29%",
    // top: "19.63%",
    // bottom: "9.35%",
    padding: "1em 2em",
    background: "#EAF1F8",
    border: "2.5px solid #F2F9FF",
    boxShadow:
      "inset 6px 5px 7px 1.5px rgba(204, 216, 236, 0.2), inset -5px -5px 2px rgba(255, 255, 255, 0.3)",
    borderRadius: "20px",
  },
  paper: {
    background:
      "linear-gradient(182.87deg, rgba(255, 255, 255, 0.05) 0.69%, rgba(213, 232, 248, 0.05) 95.8%), #EBF2F8",
    border: "2.5px solid rgba(255, 255, 255, 0.9)",
    boxSizing: " border-box",
    padding: "1em",
    boxShadow: "inset 1px 1px 1px rgba(255, 255, 255, 0.241013)",
    borderRadius: "12px",
    boxShadow: "7px 4px 14px #DCE7F1;",
  },
  button: {
    background:
      "linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83 %, rgba(37, 154, 255, 0.05) 95.84 %), #EBF2F8",
    border: "2.5px solid rgba(255, 255, 255, 0.6)",
    boxSizing: "border-box",
    boxShadow:
      "-3px - 3px 6px rgb(255 255 255 / 21 %), 1px 1px 2px rgb(0 0 0 / 20 %), inset 1px 1px 1px rgb(255 255 255 / 24 %)",
    borderRadius: "50px",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "13px",
    lineHeight: "18px",
    textAlign: "center",
    letterSpacing: "0.00310565px",
    textTransform: "uppercase",
    color: "rgba(116, 124, 139, 0.72)",
    padding: "1em",
  },
  modal: {
    background:
      "linear-gradient(108.16deg, #FFFFFF -11.47%, #E9F1F8 33.17%, #D5E4F1 100.86%)",
    borderRadius: " 25px",
    padding:"20px"
  },
  title: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "15px",
    lineHeight: "15px",
    color: "#747C8B",
  },
  subtitle: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "10px",
    color: "#747C8B",
  },
  image: {
    // left: "22.66%",
    // right: "2.29%",
    // top: "19.63%",
    // bottom: "9.35%",
    background: "#EAF1F8",
    border: "2.5px solid #F2F9FF",
    boxShadow:
      "inset 6px 5px 7px 1.5px rgba(204, 216, 236, 0.2), inset -5px -5px 2px rgba(255, 255, 255, 0.3)",
    borderRadius: "20px",
  },
}));
