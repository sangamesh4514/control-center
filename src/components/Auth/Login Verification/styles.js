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
  text: {
    fontFamily: 'Montserrat `',
    fontStyle: 'normal',
    fontWeight: ' 500',
    fontSize: ' 25px',
    lineHeight: ' 30px',
    display: ' flex',
    alignItems: ' center',
    color: '#747C8B',
  },
  buttons: {
    textAlign: 'center'
  },
  resend: {
    background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83 %, rgba(37, 154, 255, 0.05) 95.84 %), #EBF2F8',
    border: '2.5px solid rgba(255, 255, 255, 0.6)',
    boxSizing: 'border-box',
    boxShadow: '-3px - 3px 6px rgb(255 255 255 / 21 %), 1px 1px 2px rgb(0 0 0 / 20 %), inset 1px 1px 1px rgb(255 255 255 / 24 %)',
    borderRadius: '50px',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '13px',
    lineHeight: '18px',
    textAlign: 'center',
    letterSpacing: '0.00310565px',
    textTransform: 'uppercase',
    color: 'rgba(116, 124, 139, 0.72)',
    margin: '0.5em'
  },
  verify: {
    background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83 %, rgba(37, 154, 255, 0.05) 95.84 %), #EBF2F8',
    border: '2.5px solid rgba(255, 255, 255, 0.6)',
    boxSizing: 'border-box',
    boxShadow: '-3px - 3px 6px rgb(255 255 255 / 21 %), 1px 1px 2px rgb(0 0 0 / 20 %), inset 1px 1px 1px rgb(255 255 255 / 24 %)',
    borderRadius: '50px',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '13px',
    lineHeight: '18px',
    textAlign: 'center',
    letterSpacing: '0.00310565px',
    textTransform: 'uppercase',
    color: 'rgba(116, 124, 139, 0.72)',
    margin: '0.5em'
  },
  label: {
    textAlign: 'center',
    margin: '3em 0 0 0',
    color: '#747C8B',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '15px',
    lineHeight: '18px',
    letterSpacing: '0.00310565px'
  },
  textField: {
    margin: '0 0 1em 0',
    background: 'linear-gradient(183.4deg, rgba(255, 255, 255, 0.05) 36.83%, rgba(37, 154, 255, 0.05) 95.84%), #EBF2F9',
    boxShadow: 'inset 2px 2px 3px #bfd3e5, inset -2px -2px 6px rgb(255 255 255 / 80%)',
    borderRadius: '10px',
    border: 'none',
    padding: '0.5em',
    width: '-webkit-fill-available',
    color: '#747C8B',
  },
  input: {
    padding: '0.6em 8.8em',
    '&::before': {
      border: 'none'
    },
    '&::after': {
      border: 'none'
    },
    '&:focus': {
      border: 'none'
    }
  },
}))