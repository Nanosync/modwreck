import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button/Button";
import { connect } from 'react-redux';
import { setNumberOfQuestions, setDifficulty, setCategory } from '../../redux/actions';

const styles = theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  });
  
class Settings extends Component {      
    render() {
        const { classes, settings } = this.props;
        const { numberOfQuestions, difficulty, category } = settings;

        return (
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel id="questions">Number of Questions</InputLabel>
                    <Select
                        labelId="questions"
                        id="questions"
                        value={numberOfQuestions}
                        onChange={e => this.props.setNumberOfQuestions(e.target.value)}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="difficulty">Difficulty</InputLabel>
                    <Select
                        labelId="difficulty"
                        id="difficulty"
                        value={difficulty}
                        onChange={e => this.props.setDifficulty(e.target.value)}
                    >
                        <MenuItem value="Easy">Easy</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Hard">Hard</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                        labelId="category"
                        id="category"
                        value={category}
                        onChange={e => this.props.setCategory(e.target.value)}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="School of Computing">School of Computing</MenuItem>
                        <MenuItem value="FASS">FASS</MenuItem>
                    </Select>
                </FormControl>
                <Button component={Link} to="/" variant="contained" color="primary">
                    Save
                </Button>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    settings: state.settings
});

export default withStyles(styles)(connect(mapStateToProps, { setNumberOfQuestions, setDifficulty, setCategory })(Settings));
