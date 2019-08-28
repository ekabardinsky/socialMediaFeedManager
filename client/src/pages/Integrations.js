import React, {Component} from 'react';
import PageSkeleton from "../component/PageSkeleton/PageSkeleton";
import NewIntegration from "../component/Integrations/NewIntegration";
import IntegrationItem from "../component/Integrations/IntegrationItem";
import {get} from "../utils/Api";
import {getAccountChannels, getAccounts, getIntegrations} from "../redux/actions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import integrations from "../redux/reducers/integrations";

class Integrations extends Component {

    constructor(props) {
        super(props);
        get("/api/accounts", (response) => {
            this.props.getAccounts(response);
            get("/api/integrations", this.props.getIntegrations);
        });
    }

    render() {
        const {integrations} = this.props;
        return (
            <PageSkeleton>
                <Grid container direction="row" spacing={3}>
                    {
                        integrations.map(integration => {
                            return <Grid item xs={4} key={integration.id}><IntegrationItem
                                integration={integration}/></Grid>
                        })
                    }
                    <Grid item xs={12}><NewIntegration/></Grid>
                </Grid>
            </PageSkeleton>
        );
    }
}

const mapStateToProps = state => {
    return {
        accounts: state.accounts.accounts,
        integrations: state.integrations.integrations
    }
};

const mapDispatchToProps = {getAccounts, getIntegrations};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Integrations);