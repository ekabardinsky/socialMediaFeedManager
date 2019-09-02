import React, {Component} from 'react';
import {connect} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {getAccountPublishingTypes, getVideos} from "../../redux/actions";
import {get, post} from "../../utils/Api";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

class VideoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            publishDialogOpened: false,
            publishType: ""
        };
    }

    openPublishDialog() {
        const defaultPostHashTags = this.props.settings.defaultPostHashTags.map(tag => `#${tag}`);
        get(`/api/accounts/${this.props.video.integration.targetAccount.id}/publishTypes`, (response) => {
            this.props.getAccountPublishingTypes(response);
            this.setState({
                publishDialogOpened: true,
                comment: defaultPostHashTags.join(" ")
            });
        });
    }

    closePublishDialog() {
        this.setState({publishDialogOpened: false});
    }

    publish() {
        this.setState({publishDialogOpened: false});

        post(`/api/accounts/${this.props.video.integration.targetAccount.id}/videos/${this.props.video.id}/schedule`, {
            comment: this.state.comment,
            type: this.state.publishType
        }, (response) => {
            get(`/api/videos?queued=false`, this.props.getVideos);
        });
    }

    handlingTargetTypeChange(event) {
        this.setState({
            publishType: event.target.value
        });
    }

    handlingCommentChange(event) {
        this.setState({
            comment: event.target.value
        });
    }

    render() {
        const {video, publishTypes} = this.props;
        const username = video.feed.user.full_name ? video.feed.user.full_name : video.feed.user.username;
        const caption = video.feed.caption ? video.feed.caption.text : "";
        const {publishDialogOpened, publishType, comment} = this.state;
        const disablePublishButton = !publishType;

        return <div>
            <Card elevation={4}>
                <CardContent>
                    <Grid container direction="row" spacing={3}>
                        <Grid item xs={2}>
                            <Avatar alt={`${username}`} src={video.feed.user.profile_pic_url}/>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="h6">{username}</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <video preload={"metadata"} src={`/${video.filepath}`} width="480" height="320" controls>
                            </video>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography>{caption}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={this.openPublishDialog.bind(this)}>Publish</Button>
                </CardActions>
            </Card>
            <Dialog
                open={publishDialogOpened}
                keepMounted
                onClose={this.closePublishDialog.bind(this)}>
                <DialogTitle>{`Add video to the publish queue`}</DialogTitle>
                <DialogContent>
                    <Grid container direction="row" spacing={6}>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="Target type"
                                onChange={this.handlingTargetTypeChange.bind(this)}
                                helperText="Select target type"
                                margin="normal"
                                value={publishType}
                                variant="outlined"
                                fullWidth={true}>
                                {
                                    publishTypes.map(type => {
                                        return <MenuItem key={type} value={type}>
                                            <Typography>{type}</Typography>
                                        </MenuItem>
                                    })
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                helperText="Type publish comment"
                                multiline
                                value={comment}
                                rows={4}
                                defaultValue={comment}
                                onChange={this.handlingCommentChange.bind(this)}
                                margin="normal"
                                variant="outlined"
                                fullWidth={true}>>
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closePublishDialog.bind(this)} color="primary">
                        Close
                    </Button>
                    <Button disabled={disablePublishButton} onClick={this.publish.bind(this)} color="primary">
                        Publish
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        publishTypes: state.videos.publishTypes,
        settings: state.settings.settings
    }
};

const mapDispatchToProps = {getAccountPublishingTypes, getVideos};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoItem);