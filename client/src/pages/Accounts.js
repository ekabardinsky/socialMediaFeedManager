import React, {Component} from 'react';
import PageSkeleton from "../component/Common/PageSkeleton";
import {connect} from "react-redux";
import {getAccounts} from "../redux/actions";
import {get} from "../utils/Api";
import AccountItem from "../component/Accounts/AccountItem";
import Grid from "@material-ui/core/Grid";
import NewAccount from "../component/Accounts/NewAccount";

class Accounts extends Component {
    componentDidMount() {
        get("/api/accounts", this.props.getAccounts)
    }

    render() {
        const accounts = this.props.accounts ? this.props.accounts : [];

        return (
            <PageSkeleton>
                <Grid container direction="row" spacing={3}>
                    {
                        accounts.map(account => {
                            return <Grid item xs={4} key={account.id}><AccountItem account={account}/></Grid>
                        })
                    }
                    <Grid item xs={12}><NewAccount/></Grid>
                </Grid>

            </PageSkeleton>
        );
    }
}

const mapStateToProps = state => {
    return {
        accounts: state.accounts.accounts ? state.accounts.accounts : []
    }
};

const mapDispatchToProps = {getAccounts};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Accounts);