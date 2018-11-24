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
    'cpf': '',
    'patient': '',
    'nurse': '',
    'companion': '',
    'diagnostic': '',
    'date': ''
  };

  _handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  _handleClick = () => {
    const {
      cpf,
      patient,
      nurse,
      companion,
      diagnostic,
      date
    } = this.state;
    this.props.register(
      cpf,
      patient,
      nurse,
      companion,
      diagnostic,
      date);
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
          id="cpf"
          label="CPF Paciente"
          value={this.state.cpf}
          className={classes.textField}
          onChange={this._handleChange('cpf')}
          margin="normal"
          variant="outlined"
          error={!(successRegister === true || successRegister === undefined)}
        />
        <TextField
          id="patient"
          label="Nome Paciente"
          value={this.state.patient}
          className={classes.textField}
          onChange={this._handleChange('patient')}
          margin="normal"
          variant="outlined"
          error={!(successRegister === true || successRegister === undefined)}
        />
        <TextField
          id="nurse"
          label="Enfermeira(o)"
          value={this.state.nurse}
          className={classes.textField}
          onChange={this._handleChange('nurse')}
          margin="normal"
          variant="outlined"
          error={!(successRegister === true || successRegister === undefined)}
        />
        <TextField
          id="companion"
          label="Acompanhante"
          value={this.state.companion}
          className={classes.textField}
          onChange={this._handleChange('companion')}
          margin="normal"
          variant="outlined"
          error={!(successRegister === true || successRegister === undefined)}
        />
        <TextField
          id="diagnostic"
          label="Diagnóstico"
          value={this.state.diagnostic}
          className={classes.textField}
          onChange={this._handleChange('diagnostic')}
          margin="normal"
          variant="outlined"
          error={!(successRegister === true || successRegister === undefined)}
        />
        <TextField
          id="date"
          label="Data"
          value={this.state.date}
          className={classes.textField}
          onChange={this._handleChange('date')}
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