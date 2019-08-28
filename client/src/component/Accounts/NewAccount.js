import React, {Component} from 'react';
import {getAccounts} from "../../redux/actions";
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

class NewAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNeedToSave: false,
            type: "instagram",
            username: "",
            password: ""
        }
    }

    handlingTypeChange(type) {
        this.setState({type, isNeedToSave: true})
    }

    handlingUsernameChange(username) {
        this.setState({username: username.target.value, isNeedToSave: true})
    }

    handlingPasswordChange(password) {
        this.setState({password: password.target.value, isNeedToSave: true})
    }

    handlingSave() {
        post("/api/accounts", {
            type: this.state.type,
            username: this.state.username,
            password: this.state.password
        }, () => {
            this.setState({
                isNeedToSave: false,
                username: "",
                password: ""
            });

            get("/api/accounts", this.props.getAccounts);
        });
    }

    render() {
        const {isNeedToSave, username, password} = this.state;
        const enableSaveButton = !(isNeedToSave && username && password);

        return <Card elevation={4}>
            <CardContent>
                <Grid container direction="row" spacing={6}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Add new account</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="Account type"
                            onChange={this.handlingTypeChange.bind(this)}
                            helperText="Select account type"
                            margin="normal"
                            value={"instagram"}
                            fullWidth={true}>
                            <MenuItem value={"instagram"}>
                                <Grid container direction="row" alignContent={"center"} justify={"flex-start"}
                                      spacing={3}>
                                    <Grid item xs={1}>
                                        <Avatar alt={`Instagram`} src={`/images/instagram.png`}/>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="h6">Instagram</Typography>
                                    </Grid>
                                </Grid>
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Username"
                            onChange={this.handlingUsernameChange.bind(this)}
                            fullWidth={true}
                            value={username}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Password"
                            onChange={this.handlingPasswordChange.bind(this)}
                            type="password"
                            autoComplete="current-password"
                            fullWidth={true}
                            value={password}
                        />
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
        isSavingAccount: state.accounts.isSavingAccount
    }
};

const mapDispatchToProps = {getAccounts};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewAccount);