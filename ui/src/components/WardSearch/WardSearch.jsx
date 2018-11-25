import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 1000,
  }
});

class WardSearch extends React.Component {

  _createData = rawData => {
    let data = [];
    for (let rawDataIndex in rawData) {
      data.push({
        id: rawDataIndex,
        cpf: rawData[rawDataIndex].cpf,
        patient: rawData[rawDataIndex].patient,
        nurse: rawData[rawDataIndex].nurse,
        companion: rawData[rawDataIndex].companion,
        date: rawData[rawDataIndex].date,
        diagnostic: rawData[rawDataIndex].diagnostic
      })
    }
    return data;
  }

  render () {
    const { classes, data, filterThis, filterBy } = this.props;
    console.log(filterThis);
    return (
      <Paper elevation={0} className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>CPF</TableCell>
              <TableCell>Paciente</TableCell>
              <TableCell>Enfermeira</TableCell>
              <TableCell>Acompanhante</TableCell>
              <TableCell>Diagnostico</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterThis && filterBy ? this._createData(data).filter(row => {
              if (filterBy === 'Patient') {
                return row.patient.toLowerCase().indexOf(filterThis.toLowerCase()) !== -1;
              }
              else {
                return row.diagnostic.toLowerCase().indexOf(filterThis.toLowerCase()) !== -1;
              }
            }).map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell numeric>{row.cpf}</TableCell>
                  <TableCell component='th' scope='row'>
                    {row.patient}
                  </TableCell>
                  <TableCell numeric>{row.nurse}</TableCell>
                  <TableCell numeric>{row.companion}</TableCell>
                  <TableCell numeric>{row.diagnostic}</TableCell>
                  <TableCell numeric>{row.date}</TableCell>
                </TableRow>
              );
            }) : <TableRow/>}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

WardSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WardSearch);