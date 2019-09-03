import React, {Component} from 'react';
import {connect} from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

class FilteringPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentKey: ""
        }
    }

    handlingFilterChange(event) {
        this.setState({currentKey: event.target.value})
        this.props.callback(this.props.filterItems.find(item => item.key === event.target.value))
    }

    render() {
        const {filterItems, helperText, label} = this.props;

        return <Grid container direction="row" justify={"flex-end"} spacing={0}>
            <Grid item xs={3}>
                <TextField
                    className={"filterBox"}
                    select
                    label={label}
                    onChange={this.handlingFilterChange.bind(this)}
                    helperText={helperText}
                    fullWidth={true}
                    value={this.state.currentKey}
                    margin="normal">
                    {
                        filterItems.map(item => {
                            return <MenuItem key={item.key} value={item.key}>
                                <Typography variant="h6">{item.description}</Typography>
                            </MenuItem>
                        })
                    }
                </TextField>
            </Grid>
        </Grid>
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilteringPanel);