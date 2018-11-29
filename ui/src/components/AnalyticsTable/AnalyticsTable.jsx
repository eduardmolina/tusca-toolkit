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
  },
  table: {
    minWidth: 700,
  }
});

class CustomTable extends React.Component {

  _createData = rawData => {
    let data = [];
    for (let rawDataIndex in rawData) {
      data.push({
        id: rawDataIndex,
        nurse: rawData[rawDataIndex].enfermeiro,
        quantity: rawData[rawDataIndex]['count(*)']
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
              <TableCell>Enfermeiro</TableCell>
              <TableCell>Quantidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this._createData(data).map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell numeric>{row.nurse}</TableCell>
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

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomTable);