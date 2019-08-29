import React, {Component} from 'react';
import {getAccountChannels, getAccounts, getIntegrations} from "../../redux/actions";
import {connect} from "react-redux";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from "@material-ui/core/Avatar";
import {get, post} from "../../utils/Api";
import moment from 'moment'

class NewAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedSourceAccount: "",
            selectedSourceChannel: "",
            selectedTargetAccount: ""
        };

        get("/api/accounts", this.props.getAccounts);
    }

    handlingSourceAccountChange(event) {
        const accountId = event.target.value;
        this.setState({
            selectedSourceAccount: accountId
        });

        get(`/api/accounts/${accountId}/channels`, this.props.getAccountChannels);
    }

    handlingChannelChange(event) {
        const channelId = event.target.value;
        this.setState({
            selectedSourceChannel: channelId
        });

    }

    handlingTargetAccountChange(event) {
        const accountId = event.target.value;
        this.setState({
            selectedTargetAccount: accountId
        });
    }

    handlingSave() {
        const {selectedSourceAccount, selectedSourceChannel, selectedTargetAccount} = this.state;
        const {accounts, newAccount} = this.props;

        post("/api/integrations", {
            sourceAccount: accounts.find(account => account.id === selectedSourceAccount),
            sourceChannel: newAccount.channels.find(channel => channel.pk === selectedSourceChannel),
            lastSyncTime: moment().unix(),
            targetAccount: accounts.find(account => account.id === selectedTargetAccount)
        }, () => {
            this.setState({
                selectedSourceAccount: "",
                selectedSourceChannel: "",
                selectedTargetAccount: ""
            });

            get("/api/integrations", this.props.getIntegrations);
        });
    }

    render() {
        const {selectedSourceAccount, selectedSourceChannel, selectedTargetAccount} = this.state;
        const enableSaveButton = !(selectedSourceAccount && selectedSourceChannel && selectedTargetAccount);
        const {accounts, newAccount} = this.props;

        return <Card elevation={4}>
            <CardContent>
                <Grid container direction="row" spacing={6}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Add new integration</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="Source account"
                            onChange={this.handlingSourceAccountChange.bind(this)}
                            helperText="Select source account"
                            margin="normal"
                            value={selectedSourceAccount}
                            fullWidth={true}>
                            {
                                accounts.map(account => {
                                    return <MenuItem key={account.id} value={account.id}>
                                        <Grid container direction="row" alignContent={"center"} justify={"flex-start"}
                                              spacing={3}>
                                            <Grid item xs={1}>
                                                <Avatar alt={`${account.type}`} src={`/images/${account.type}.png`}/>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant="h6">{account.username}</Typography>
                                            </Grid>
                                        </Grid>
                                    </MenuItem>
                                })
                            }
                        </TextField>
                    </Grid>
                    <Grid item xs={12} hidden={selectedSourceAccount === ""}>
                        <TextField

                            select
                            label="Source channel"
                            onChange={this.handlingChannelChange.bind(this)}
                            helperText="Select source channel"
                            margin="normal"
                            value={selectedSourceChannel}
                            fullWidth={true}>
                            {
                                newAccount.channels.map(channel => {
                                    const name = channel.full_name ? channel.full_name : channel.username;
                                    return <MenuItem key={channel.pk} value={channel.pk}>
                                        <Grid container direction="row" alignContent={"center"} justify={"flex-start"}
                                              spacing={3}>
                                            <Grid item xs={1}>
                                                <Avatar alt={`${name}`} src={channel.profile_pic_url}/>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant="h6">{name}</Typography>
                                            </Grid>
                                        </Grid>
                                    </MenuItem>
                                })
                            }
                        </TextField>
                    </Grid>
                    <Grid item xs={12} hidden={selectedSourceChannel === ""}>
                        <TextField
                            select
                            label="Target account"
                            onChange={this.handlingTargetAccountChange.bind(this)}
                            helperText="Select target account"
                            margin="normal"
                            value={selectedTargetAccount}
                            fullWidth={true}>
                            {
                                accounts.map(account => {
                                    return <MenuItem key={account.id} value={account.id}>
                                        <Grid container direction="row" alignContent={"center"} justify={"flex-start"}
                                              spacing={3}>
                                            <Grid item xs={1}>
                                                <Avatar alt={`${account.type}`} src={`/images/${account.type}.png`}/>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant="h6">{account.username}</Typography>
                                            </Grid>
                                        </Grid>
                                    </MenuItem>
                                })
                            }
                        </TextField>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button disabled={enableSaveButton} size="small" onClick={this.handlingSave.bind(this)}>Save</Button>
            </CardActions>
        </Card>
    }
}

const mapStateToProps = state => {
    return {
        accounts: state.accounts.accounts,
        newAccount: state.integrations.newAccount,
        integrations: state.integrations.integrations
    }
};

const mapDispatchToProps = {getAccounts, getAccountChannels, getIntegrations};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewAccount);