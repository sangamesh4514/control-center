import React from "react";
import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, } from "@material-ui/core";
import SelectField from "../../../common/SelectField";
import TextField from "../../../common/TextField";
import Button from "../../../common/Button";

const TextFieldSelectModal = ({ title, open, handleClose, obj, initialState, state, setState, name, handleSave }) => {
  // const [value, setValue] = useState(true);
  const handleChange = (e) => {
    state[e.target.name] = e.target.value;
    setState({ ...state });
  };
  const handleChecked = (e) => {
    state[e.target.name] = e.target.checked;
    setState({ ...state });
  }
  const handleDelete = () => {
    handleSave(initialState, name, handleClose)
    setState(initialState);
  };


  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <label htmlFor={obj[0].name}>{obj[0].label}</label>

          <TextField
            type="text"
            name={obj[0].name}
            value={state[obj[0].name]}
            onChange={handleChange}
          />

          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name={obj[1].name}
                onChange={handleChecked}
              />
            }
            style={{ width: 400 }}
            label={obj[1].label}
          />

          <SelectField
            label={obj[2].label}
            name={obj[2].name}
            handleChange={handleChange}
            options={obj[2].options}
          />
        </DialogContent>
        <DialogActions>
          <div style={{ flex: "1" }} />
          <Button name={"Discard"} handleClick={handleDelete} />
          <Button
            name={"Save"}
            disabled={!state.text}
            handleClick={(e) => handleSave(state, name, handleClose)}
          />
          <div style={{ flex: "1" }} />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TextFieldSelectModal;
