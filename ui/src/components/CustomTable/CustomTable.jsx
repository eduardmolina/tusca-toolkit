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
    minWidth: 700,
  }
});

class CustomTable extends React.Component {

  _createData = rawData => {
    let data = [];
    for (let rawDataIndex in rawData) {
      data.push({
        id: rawDataIndex,
        name: rawData[rawDataIndex].name,
        place: rawData[rawDataIndex].place,
        date: rawData[rawDataIndex].date,
        price: rawData[rawDataIndex].price
      })
    }
    return data;
  }

  render () {
    const { classes, data, filterThis, filterBy } = this.props;

    return (
      <Paper elevation={0} className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Local</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Preço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterThis && filterBy ? this._createData(data).filter(row => {
              if (filterBy === 'Name') {
                return row.name.toLowerCase().indexOf(filterThis.toLowerCase()) !== -1;
              }
              else {
                return row.date.toLowerCase().indexOf(filterThis.toLowerCase()) !== -1;
              }
            }).map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell numeric>{row.place}</TableCell>
                  <TableCell numeric>{row.date}</TableCell>
                  <TableCell numeric>{row.price}</TableCell>
                </TableRow>
              );
            }) : <TableRow/>}
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