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

class AccountItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.account.username,
            password: this.props.account.password,
            isNeedToSave: false
        }
    }

    handlingUsernameChange(username) {
        this.setState({username, isNeedToSave: true})
    }

    handlingPasswordChange(password) {
        this.setState({password, isNeedToSave: true})
    }

    render() {
        const account = this.props.account;
        const {isNeedToSave} = this.state;

        return <Card elevation={4}>
            <CardContent>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12}>
                        <Avatar alt={`${account.type}`} src={`/images/${account.type}.png`}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Username"
                            onChange={this.handlingUsernameChange.bind(this)}
                            defaultValue={account.username}
                            fullWidth={true}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Password"
                            onChange={this.handlingPasswordChange.bind(this)}
                            type="password"
                            autoComplete="current-password"
                            defaultValue={account.password}
                            fullWidth={true}
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button disabled={!isNeedToSave} size="small">Save</Button>
                <Button size="small">Edit</Button>
                <Button size="small">Delete</Button>
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