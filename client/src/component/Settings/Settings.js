import React, {Component} from 'react';
import {getSettings} from "../../redux/actions";
import {connect} from "react-redux";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import {get, post} from "../../utils/Api";
import Typography from "@material-ui/core/Typography";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNeedToSave: false,
            edit: false,
            username: this.props.settings.username,
            password: this.props.settings.password,
            defaultPostHashTags: this.props.settings.defaultPostHashTags,
            newTagValue: ""
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
            password: this.state.password,
            defaultPostHashTags: this.state.defaultPostHashTags
        }, () => {
            get(`/api/settings/current`, this.props.getSettings);
        });

        this.setState({edit: false, isNeedToSave: false, newTagValue: ""})
    }

    handleTagRemove(removedTag) {
        if (this.state.edit) {
            const defaultPostHashTags = this.state.defaultPostHashTags.slice().filter(tag => tag !== removedTag);
            this.setState({isNeedToSave: true, defaultPostHashTags});
        }
    }

    handleNewTagKeyPress(event) {
        if (event.key === "Enter") {
            const defaultPostHashTags = this.state.defaultPostHashTags.slice();
            const newTag = this.state.newTagValue;
            if (!defaultPostHashTags.find(tag => tag === newTag)) {
                defaultPostHashTags.push(newTag);
                this.setState({isNeedToSave: true, defaultPostHashTags, newTagValue: ""});
            }
        }
    }

    handleNewTagChange(event) {
        this.setState({newTagValue: event.target.value});
    }

    render() {
        const {isNeedToSave, edit, username, password, defaultPostHashTags, newTagValue} = this.state;
        const disableSaveButton = !(isNeedToSave && username && password && defaultPostHashTags);
        const handleTagRemove = (tag) => () => {
            this.handleTagRemove(tag)
        };

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
                    <Grid item xs={12}>
                        <Typography variant="h6">{"Default hash tags"}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            defaultPostHashTags.map(tag => {
                                return <Chip
                                    key={tag}
                                    label={tag}
                                    onDelete={handleTagRemove(tag)}/>;
                            })
                        }
                        <TextField
                            disabled={!edit}
                            label="New Tag"
                            onKeyPress={this.handleNewTagKeyPress.bind(this)}
                            onChange={this.handleNewTagChange.bind(this)}
                            value={newTagValue}
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