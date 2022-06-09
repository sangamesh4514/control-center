import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  customization: {
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
}));
