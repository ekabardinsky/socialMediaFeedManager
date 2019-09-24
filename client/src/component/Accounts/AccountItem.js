import React, {Component} from 'react';
import {getAccounts} from "../../redux/actions";
import {connect} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {del, get, post, put} from "../../utils/Api";

class AccountItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.account.username,
            password: this.props.account.password,
            isNeedToSave: false,
            edit: false,
            challengeRequired: this.props.account.challengeRequired,
            challengeStarted: false,
            code: ""
        }
    }

    handlingChallengeCodeChange(code) {
        this.setState({code: code.target.value})
    }

    startChallenge() {
        post(`/api/accounts/${this.props.account.id}/challenge/start`, {}, () => {
            this.setState({challengeStarted: true})
        })
    }

    sendChallengeCode() {
        const code = this.state.code;
        post(`/api/accounts/${this.props.account.id}/challenge/submit`, {code}, () => {
            get("/api/accounts", this.props.getAccounts);
        });
        this.setState({challengeStarted: false});
    }

    handlingUsernameChange(username) {
        this.setState({username: username.target.value, isNeedToSave: true})
    }

    handlingPasswordChange(password) {
        this.setState({password: password.target.value, isNeedToSave: true})
    }

    handleEdit() {
        this.setState({edit: !this.state.edit})
    }

    handleDelete() {
        const account = this.props.account;

        del(`/api/accounts/${account.id}`, () => {
            get("/api/accounts", this.props.getAccounts);
        });

        this.setState({edit: false})
    }

    handleSave() {
        const account = this.props.account;
        put(`/api/accounts/${account.id}`, {
            ...account,
            username: this.state.username,
            password: this.state.password
        }, () => {
            get("/api/accounts", this.props.getAccounts);
        });

        this.setState({edit: false})
    }

    render() {
        const account = this.props.account;
        const {isNeedToSave, username, password, edit, code, challengeRequired, challengeStarted} = this.state;
        const disableSaveButton = !(isNeedToSave && username && password);

        return <Card elevation={4}>
            <CardContent>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <Avatar alt={`${account.type}`} src={`/images/${account.type}.png`}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            disabled={!edit}
                            label="Username"
                            onChange={this.handlingUsernameChange.bind(this)}
                            value={username}
                            fullWidth={true}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            disabled={!edit}
                            label="Password"
                            onChange={this.handlingPasswordChange.bind(this)}
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            fullWidth={true}
                        />
                    </Grid>

                    {challengeStarted && <Grid item xs={6}>
                        <TextField
                            label="Code"
                            onChange={this.handlingChallengeCodeChange.bind(this)}
                            value={code}
                            fullWidth={true}
                        />
                    </Grid>}
                </Grid>
            </CardContent>
            <CardActions>
                {!challengeRequired &&
                <Button disabled={disableSaveButton} size="small" onClick={this.handleSave.bind(this)}>Save</Button>}
                {!challengeRequired && <Button size="small" onClick={this.handleEdit.bind(this)}>Edit</Button>}
                {!challengeRequired && <Button size="small" onClick={this.handleDelete.bind(this)}>Delete</Button>}
                {challengeRequired && !challengeStarted &&
                <Button size="small" onClick={this.startChallenge.bind(this)}>Start challenge</Button>}
                {challengeRequired && challengeStarted &&
                <Button size="small" onClick={this.sendChallengeCode.bind(this)}>Submit code</Button>}
            </CardActions>
        </Card>
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
)(AccountItem);