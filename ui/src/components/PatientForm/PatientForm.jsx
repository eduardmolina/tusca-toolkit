import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    marginLeft: '1vw',
    width: '10vw'
  }
});

class Form extends React.Component {

  state = {
    'name': '',
    'cpf': ''
  };

  _handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  _handleClick = () => {
    const { name, cpf } = this.state;
    this.props.register(cpf, name);
  };

  _unsetDBError = () => {
    if (!this.props.successRegister) {
      setTimeout(() => {
        this.props.unsetDBError();
      }, 3000);
    }
  }

  componentDidUpdate() {
    this._unsetDBError();
  }

  render() {
    const { classes, successRegister } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="patient-name"
          label="Nome Paciente"
          value={this.state.nurse}
          className={classes.textField}
          onChange={this._handleChange('name')}
          margin="normal"
          variant="outlined"
          error={!(successRegister === true || successRegister === undefined)}
        />
        <TextField
          id="cpf"
          label="CPF Paciente"
          value={this.state.cpf}
          className={classes.textField}
          onChange={this._handleChange('cpf')}
          margin="normal"
          variant="outlined"
          error={!(successRegister === true || successRegister === undefined)}
        />
        <Button variant='contained' color='primary' className={classes.button} onClick={this._handleClick}>
          Enviar
        </Button>
      </form>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);