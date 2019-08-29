import React, {Component} from 'react';
import {getAccountChannels, getAccounts, getIntegrations} from "../../redux/actions";
import {connect} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {del, get, put} from "../../utils/Api";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Autorenew from '@material-ui/icons/Autorenew';
import moment from 'moment'

class IntegrationItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNeedToSave: false,
            selectedSourceAccount: this.props.integration.sourceAccount.id,
            selectedSourceChannel: this.props.integration.sourceChannel.pk,
            selectedTargetAccount: this.props.integration.targetAccount.id,
            edit: false
        }
    }

    handlingSourceAccountChange(event) {
        const accountId = event.target.value;
        this.setState({
            selectedSourceAccount: accountId,
            isNeedToSave: true
        });

        get(`/api/accounts/${accountId}/channels`, this.props.getAccountChannels);
    }

    handlingChannelChange(event) {
        const channelId = event.target.value;
        this.setState({
            selectedSourceChannel: channelId,
            isNeedToSave: true
        });

    }

    handlingTargetAccountChange(event) {
        const accountId = event.target.value;
        this.setState({
            selectedTargetAccount: accountId,
            isNeedToSave: true
        });
    }

    handleEdit() {
        this.setState({edit: !this.state.edit});

        if (!this.state.edit) {
            const {selectedSourceAccount} = this.state;
            get(`/api/accounts/${selectedSourceAccount}/channels`, this.props.getAccountChannels);
        }
    }

    handlingSave() {
        const {selectedSourceAccount, selectedSourceChannel, selectedTargetAccount} = this.state;
        const {accounts, newAccount} = this.props;

        const integration = this.props.integration;
        put(`/api/integrations/${integration.id}`, {
            ...integration,
            sourceAccount: accounts.find(account => account.id === selectedSourceAccount),
            sourceChannel: newAccount.channels.find(channel => channel.pk === selectedSourceChannel),
            lastSyncTime: moment().unix(),
            targetAccount: accounts.find(account => account.id === selectedTargetAccount)
        }, () => {
            this.setState({
                isNeedToSave: false,
                edit: false,
                selectedSourceAccount: selectedSourceAccount,
                selectedSourceChannel: selectedSourceChannel,
                selectedTargetAccount: selectedTargetAccount
            });

            get("/api/integrations", this.props.getIntegrations);
        });

        this.setState({edit: false})
    }

    handleDelete() {
        const integration = this.props.integration;

        del(`/api/integrations/${integration.id}`, () => {
            get("/api/integrations", this.props.getIntegrations);
        });

        this.setState({edit: false})
    }

    render() {
        const {selectedSourceAccount, selectedSourceChannel, selectedTargetAccount, edit, isNeedToSave} = this.state;
        const enableSaveButton = !(isNeedToSave && selectedSourceAccount && selectedSourceChannel && selectedTargetAccount);
        const {accounts, newAccount, integration} = this.props;
        const sourceAccount = accounts.find(account => account.id === selectedSourceAccount);
        const sourceChannel = newAccount.channels.length > 0 ? newAccount.channels.find(channel => channel.pk === selectedSourceChannel) : integration.sourceChannel;
        const targetAccount = accounts.find(account => account.id === selectedTargetAccount);
        const selectedSourceChannelName = sourceChannel.full_name ? sourceChannel.full_name : sourceChannel.username;

        return <Card elevation={4}>
            <CardContent>
                <Grid container direction="row" spacing={6}>
                    <Grid item xs={12} hidden={!edit}>
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
                                            <Grid item xs={2}>
                                                <Avatar alt={`${account.type}`} src={`/images/${account.type}.png`}/>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography variant="h6">{account.username}</Typography>
                                            </Grid>
                                        </Grid>
                                    </MenuItem>
                                })
                            }
                        </TextField>
                    </Grid>
                    <Grid item xs={12} hidden={!edit}>
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
                                            <Grid item xs={2}>
                                                <Avatar alt={`${name}`} src={channel.profile_pic_url}/>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography variant="h6">{name}</Typography>
                                            </Grid>
                                        </Grid>
                                    </MenuItem>
                                })
                            }
                        </TextField>
                    </Grid>
                    <Grid item xs={12} hidden={!edit}>
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
                                            <Grid item xs={2}>
                                                <Avatar alt={`${account.type}`} src={`/images/${account.type}.png`}/>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography variant="h6">{account.username}</Typography>
                                            </Grid>
                                        </Grid>
                                    </MenuItem>
                                })
                            }
                        </TextField>
                    </Grid>
                    {/* Edit section end. Start View section*/}
                    <Grid item hidden={edit}>
                        <Grid item xs={12}>
                            <Grid container direction="row" justify={"flex-start"} alignItems={"center"}
                                  spacing={3} className={"container-with-border"}>
                                <Grid item xs={10}>
                                    <Typography variant="h6">{"Integration Source"}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Avatar alt={`${sourceAccount.type}`}
                                            src={`/images/${sourceAccount.type}.png`}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Avatar alt={`${selectedSourceChannelName}`}
                                            src={sourceChannel.profile_pic_url}
                                            style={{width: "100px", height: "100px"}}/>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h6">{selectedSourceChannelName}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container direction="row" justify={"center"} alignItems={"center"}>
                                <KeyboardArrowDown fontSize="large" style={{fontSize: "150px"}}/>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container direction="row" justify={"flex-start"} alignItems={"center"}
                                  spacing={3} className={"container-with-border"}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">{"Integration Target"}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Avatar alt={`${targetAccount.type}`}
                                            src={`/images/${targetAccount.type}.png`}/>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="h6">{targetAccount.username}</Typography>
                                </Grid>

                                <Grid item xs={1}>
                                    <Autorenew/>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography>{`Last Synchronization performed at ${moment.unix(integration.lastSyncTime).format("HH:mm:ss DD.MM.YYYY")}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* View section end*/}
                </Grid>
            </CardContent>
            <CardActions>
                <Button disabled={enableSaveButton} size="small" onClick={this.handlingSave.bind(this)}>Save</Button>
                <Button size="small" onClick={this.handleEdit.bind(this)}>Edit</Button>
                <Button size="small" onClick={this.handleDelete.bind(this)}>Delete</Button>
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
)(IntegrationItem);