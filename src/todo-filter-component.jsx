import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, withStyles } from 'material-ui';

class TodoFilterComponent extends React.Component {
  render() {
    const { classes, filter, setFilter } = this.props;
    console.log(filter.important)
    return (
      <Grid container style={{ backgroundColor: '#EEEEEE' }}>
        <Grid item xs={12}>
          <Button
            className={filter.important ? classes.active : classes.button}
            onClick={() => {
              setFilter({ important: true, veryhigh: false, high: false, mid: false }, filter);
              this.forceUpdate();
            }}
          >
            모두
          </Button>
          <Button
            className={filter.veryhigh ? classes.active : classes.button}
            onClick={() => {
              if (!filter.veryhigh && filter.high && filter.mid) {
                setFilter({ important: true, veryhigh: false, high: false, mid: false }, filter)
              } else {
                setFilter({ veryhigh: !filter.veryhigh, important: false }, filter)
              }
              this.forceUpdate();
            }}
          >
            매우 중요
          </Button>
          <Button
            className={filter.high ? classes.active : classes.button}
            onClick={() => {
              if (filter.veryhigh && !filter.high && filter.mid) {
                setFilter({ important: true, veryhigh: false, high: false, mid: false }, filter)
              } else {
                setFilter({ high: !filter.high, important: false }, filter)
              }
              this.forceUpdate();
            }}
          >
            중요
          </Button>
          <Button
            className={filter.mid ? classes.active : classes.button}
            onClick={() => {
              if (filter.veryhigh && filter.high && !filter.mid) {
                setFilter({ important: true, veryhigh: false, high: false, mid: false }, filter)
              } else {
                setFilter({ mid: !filter.mid, important: false }, filter)
              }
              this.forceUpdate();
            }}
          >
            보통
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            className={filter.done ? classes.active : classes.button}
            onClick={() => {
              setFilter({ done: true, complete: false, incomplete: false }, filter);
              this.forceUpdate();
            }}
          >
            모두
          </Button>
          <Button
            className={filter.complete ? classes.active : classes.button}
            onClick={() => {
              if (!filter.complete && filter.incomplete) {
                setFilter({ done: true, complete: false, incomplete: false }, filter)
              } else {
                setFilter({ complete: !filter.complete, done: false }, filter)
              }
              this.forceUpdate();
            }}
          >
            완료
          </Button>
          <Button
            className={filter.incomplete ? classes.active : classes.button}
            onClick={() => {
              if (filter.complete && !filter.incomplete) {
                setFilter({ done: true, complete: false, incomplete: false }, filter)
              } else {
                setFilter({ incomplete: !filter.incomplete, done: false }, filter)
              }
              this.forceUpdate();
            }}
          >
            미완료
          </Button>
        </Grid>
      </Grid>
    )
  }
}

TodoFilterComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
};

const styles = {
  button: {
    margin: '0 1px',
    border: '1px solid #E0E0E0 !important',
    backgroundColor: '#FFFFFF !important',
    padding: '4px 8px',
    minHeight: 10,
  },
  active: {
    margin: '0 1px',
    borderRadius: 0,
    border: '1px solid #E0E0E0 !important',
    backgroundColor: '#FF5722 !important',
    color: 'white',
    padding: '4px 8px',
    minHeight: 10,
  }
}

export default withStyles(styles)(TodoFilterComponent);
