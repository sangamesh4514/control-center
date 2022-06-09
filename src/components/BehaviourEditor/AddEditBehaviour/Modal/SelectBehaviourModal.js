import { Dialog, DialogActions, DialogContent, DialogTitle, } from "@material-ui/core";
import React from "react";
import SelectField from "../../../common/SelectField";
import Button from "../../../common/Button";

const SelectBehaviourModal = ({ open, title, handleClose, obj, initialState, state, setState, name, handleSave }) => {

  const handleChange = (e) => {
    state[e.target.name] = e.target.value
    setState({ ...state })
  }
  const handleDelete = () => {
    handleSave(initialState, name, handleClose);
    // setState(initialState)
  }

  const fields = obj.map((data, index) => {
    return (
      <SelectField
        label={data.label}
        key={index++}
        name={data.name}
        selectValue={state[data.name]}
        handleChange={handleChange}
        options={data.options}
      />
    );
  });

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{fields}</DialogContent>
        <DialogActions>
          <div style={{ flex: "1" }} />
          <Button name={"Discard"} handleClick={handleDelete} />
          <Button name={"Save "} handleClick={e => handleSave(state, name, handleClose)} />
          <div style={{ flex: "1" }} />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SelectBehaviourModal;
