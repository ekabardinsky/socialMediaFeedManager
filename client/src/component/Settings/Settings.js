import React, {Component} from 'react';
import {getSettings} from "../../redux/actions";
import {connect} from "react-redux";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {get, post} from "../../utils/Api";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNeedToSave: false,
            edit: false,
            username: "",
            password: ""
        }
    }

    handlingUsernameChange(username) {
        this.setState({isNeedToSave: true, username: username.target.value});
    }

    handlingPasswordChange(password) {
        this.setState({isNeedToSave: true, password: password.target.value});
    }

    handleEdit() {
        this.setState({edit: !this.state.edit})
    }

    handleSave() {
        const settings = this.props.settings;
        post(`/api/settings/current`, {
            ...settings,
            username: this.state.username,
            password: this.state.password
        }, () => {
            get(`/api/settings/current`, this.props.getSettings);
        });

        this.setState({edit: false, isNeedToSave: false})
    }

    getSettings() {
        return {
            username: this.state.username ? this.state.username : this.props.settings.username,
            password: this.state.password ? this.state.password : this.props.settings.password
        }
    }

    render() {
        const {isNeedToSave, edit } = this.state;
        const {username, password} = this.getSettings();
        const disableSaveButton = !(isNeedToSave && username && password);

        return <Card elevation={4}>
            <CardContent>
                <Grid container direction="row" spacing={3}>
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
                </Grid>
            </CardContent>
            <CardActions>
                <Button disabled={disableSaveButton} size="small" onClick={this.handleSave.bind(this)}>Save</Button>
                <Button size="small" onClick={this.handleEdit.bind(this)}>Edit</Button>
            </CardActions>
        </Card>
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
)(Settings);