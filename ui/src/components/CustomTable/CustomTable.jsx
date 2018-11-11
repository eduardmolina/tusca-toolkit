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
        username: rawData[rawDataIndex].username,
        city: rawData[rawDataIndex].address.city,
        website: rawData[rawDataIndex].website
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
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Website</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterThis ? this._createData(data).filter(row => {
              if (filterBy === 'Name') {
                return row.name.indexOf(filterThis) !== -1;
              }
              else {
                return row.city.indexOf(filterThis) !== -1;
              }
            }).map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell numeric>{row.username}</TableCell>
                  <TableCell numeric>{row.city}</TableCell>
                  <TableCell numeric>{row.website}</TableCell>
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