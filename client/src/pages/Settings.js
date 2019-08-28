import React, {Component} from 'react';
import PageSkeleton from "../component/PageSkeleton/PageSkeleton";
import {getSettings} from "../redux/actions";
import {connect} from "react-redux";
import Settings from "../component/Settings/Settings";
import {get} from "../utils/Api";

class Videos extends Component {
    constructor(props) {
        super(props);

        get(`/api/settings/current`, this.props.getSettings);
    }

    render() {
        return (
            <PageSkeleton>
                {(this.props.settings.id) ? <Settings/> : null}
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