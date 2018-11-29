import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  heading: {
    marginRight: '3vw'
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
    'cpf': '',
    thisButtomThrow: false
  };

  _handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  _handleClick = () => {
    const { name, cpf } = this.state;
    this.props.register(cpf, name);
    this.setState({ thisButtomThrow: true });
  };

  _unsetDBError = () => {
    if (!this.props.successRegister) {
      setTimeout(() => {
        this.props.unsetDBError();
        this.setState({ thisButtomThrow: false });    
      }, 3000);
    }
  }

  componentDidUpdate() {
    this._unsetDBError();
  }

  render() {
    const { classes, successRegister, pgCode } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        {pgCode === '23505' && this.state.thisButtomThrow ?
          <Typography className={classes.heading}> Esse CPF já está cadastrado! </Typography> : ''}
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