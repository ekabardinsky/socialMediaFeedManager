import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import {getSettings, getVideos} from "../redux/actions";
import {connect} from "react-redux";
import Login from "../component/Login/Login";
import PageSkeleton from "../component/Common/PageSkeleton";

class Videos extends Component {

    render() {
        return (
            <PageSkeleton>
                <Grid container direction="column" alignItems={"center"} alignContent={"center"} justify={"center"}
                      spacing={3}>
                    <Grid item xs={12}><Login/></Grid>
                </Grid>
            </PageSkeleton>
        );
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = {getVideos, getSettings};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Videos);