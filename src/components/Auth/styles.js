import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    background: 'linear-gradient( 182.87deg, rgba(255, 255, 255, 0.05) 0.69%, rgba(213, 232, 248, 0.05) 95.8%), #EBF2F8',
    border: '2.5px solid rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    padding: '3em 3em',
    width: '467px',
  },
  loginbtn: {
    background: 'linear-gradient( 183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F8',
    border: '2.5px solid rgba(255, 255, 255, 0.6)',
    boxSizing: 'border-box',
    boxShadow: '-3px -3px 6px rgb(255 255 255 / 21%), 1px 1px 2px rgb(0 0 0 / 20%), inset 1px 1px 1px rgb(255 255 255 / 24%)',
    borderRadius: '50px',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '13px',
    lineHeight: '18px',
    textAlign: 'center',
    letterSpacing: '0.00310565px',
    color: '#747C8B',
    margin: '2em 0 0 0',
  },
  textField: {
    margin: '0 0 1em 0 !important',
    background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F9 !important',
    boxShadow: 'inset 2px 2px 3px #bfd3e5, inset -2px -2px 6px rgb(255 255 255 / 80%) !important',
    borderRadius: '10px !important',
    border: 'none !important',
    padding: '0.5em !important',
    width: '-webkit-fill-available !important',
    color: '#747C8B !important',
  },
  label: {
    margin: '1em 0 0 0',
    fontFamily: 'Montserrat `',
    color: '#747C8B',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '15px',
    lineHeight: '18px',
    letterSpacing: '0.00310565px'
  },
  PhoneInput: {
    border: 'none',
    background: 'inherit',
    color: '#747C8B',
    fontSize: '15px',
    fontWeight: '400',
  }
}))