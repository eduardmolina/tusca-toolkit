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
    marginRight: theme.spacing.unit,
  },
  button: {
    marginLeft: '2vw',
    width: '10vh'
  }
});

class Form extends React.Component {

  state = {
    'cpf': '',
    'name': '',
    'lastName': ''
  };

  _handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  _handleClick = () => {
    const { cpf, name, lastName } = this.state;
    this.props.register(cpf, name, lastName);
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
          label="CPF"
          value={this.state.cpf}
          className={classes.textField}
          onChange={this._handleChange('cpf')}
          margin="normal"
          variant="outlined"
          error={!(successRegister === true || successRegister === undefined)}
        />
        <TextField
          id="name"
          label="Nome"
          value={this.state.name}
          className={classes.textField}
          onChange={this._handleChange('name')}
          margin="normal"
          variant="outlined"
          error={!(successRegister === true || successRegister === undefined)}
        />
        <TextField
          id="lastName"
          label="Sobrenome"
          value={this.state.lastName}
          className={classes.textField}
          onChange={this._handleChange('lastName')}
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