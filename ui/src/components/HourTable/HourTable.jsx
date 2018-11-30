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
    overflowX: 'auto'
  }
});

class HourTable extends React.Component {

  _createData = rawData => {
    let data = [];
    for (let rawDataIndex in rawData) {
      data.push({
        id: rawDataIndex,
        hour: rawData[rawDataIndex]["concat(to_char(dia, '00'), '/', to_char(mes, '00'), '/', ano, ' ', hora, 'h')"],
        quantity: rawData[rawDataIndex]['quantidade']
      })
    }
    return data;
  }

  render () {
    const { classes, data } = this.props;

    return (
      <Paper elevation={0} className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Data/Hora</TableCell>
              <TableCell>Quantidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this._createData(data).map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell numeric>{row.hour}</TableCell>
                  <TableCell numeric>{row.quantity}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

HourTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HourTable);