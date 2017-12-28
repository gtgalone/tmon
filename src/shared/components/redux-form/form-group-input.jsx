import React from 'react';
import PropTypes from 'prop-types';
import { Input, FormControl, InputLabel, FormHelperText } from 'material-ui';

const FormGroupInput = (props) => {
  const {
    input, type, label, required, readOnly, placeholder,
    maxLength, autoFocus, meta, multiline,
    rows, rowsMax, inputClass,
  } = props;
  return (
    <FormControl
      error={meta.dirty && meta.error}
      style={{ flex: 1, width: '100%' }}
    >
      {label && <InputLabel>{label}</InputLabel>}
      <Input
        {...input}
        readOnly={readOnly}
        required={required}
        multiline={multiline}
        rows={rows}
        className={inputClass}
        rowsMax={rowsMax}
        type={type}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disableUnderline
        fullWidth
        style={{fontSize: '0.9rem'}}
        inputProps={{
          maxLength,
        }}
      />
      { meta.dirty && meta.error && <FormHelperText>{meta.error}</FormHelperText> }
    </FormControl>
  );
};

FormGroupInput.defaultProps = {
  label: null,
  type: 'text',
  placeholder: null,
  helperBlock: null,
  readOnly: false,
  required: false,
  maxLength: null,
  autoFocus: false,
  multiline: false,
  rows: null,
  rowsMax: null,
  inputClass: null,
};

FormGroupInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.objectOf(PropTypes.any).isRequired,
  input: PropTypes.objectOf(PropTypes.any).isRequired,
  helperBlock: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  autoFocus: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  inputClass: PropTypes.string,
};

export default FormGroupInput;