import React, {Component} from 'react';
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Grid container spacing={3}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>sdf</Grid>
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
)(Login);