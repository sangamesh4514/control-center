import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    position: 'absolute',
    background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F8',
    boxShadow: 'inset 6px 5px 7px 1.5px rgb(204 216 236/0.2), inset -5px -5px 2px rgb(255 255 255/0%)',
    border: '2.5px solid rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    padding: '2em 3em',
    width: '56em',
  },
  root: {
    height: '70px',
    width: '900px',
    display: 'flex',
    alignItems: 'center',
    margin: '20px'
  },
  image: {
    paddingLeft: '30px'
  },
  buttonui: {
    background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F8',
    border: '2.5px solid rgba(255, 255, 255, 0.6)',
    boxSizing: 'border-box',
    boxShadow: 'inset 1px 1px 1px rgb(255 255 255 / 24%)',
    borderRadius: '50px',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '13px',
    lineHeight: '18px',
    textAlign: 'center',
    letterSpacing: '0.00310565px',
    color: 'rgba(116, 124, 139, 0.72)',
    margin: '0.5em'
  }
}));
