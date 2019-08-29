import React, {Component} from 'react';
import PageSkeleton from "../component/PageSkeleton/PageSkeleton";
import {getSettings} from "../redux/actions";
import {connect} from "react-redux";
import Settings from "../component/Settings/Settings";
import {get} from "../utils/Api";
import Grid from "@material-ui/core/Grid";

class Videos extends Component {
    constructor(props) {
        super(props);

        get(`/api/settings/current`, this.props.getSettings);
    }

    render() {
        return (
            <PageSkeleton>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        {(this.props.settings.id) ? <Settings/> : null}
                    </Grid>
                </Grid>
            </PageSkeleton>
        );
    }
}

const mapStateToProps = state => {
    return {
        settings: state.settings.settings ? state.settings.settings : {}
    }
};

const mapDispatchToProps = {getSettings};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Videos);