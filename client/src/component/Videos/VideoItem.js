import React, {Component} from 'react';
import {connect} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";

class VideoItem extends Component {
    render() {
        const video = this.props.video;
        const username = video.feed.user.full_name ? video.feed.user.full_name : video.feed.user.username;
        const caption = video.feed.caption ? video.feed.caption.text : "";

        return <Card elevation={4}>
            <CardContent>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={2}>
                        <Avatar alt={`${username}`} src={video.feed.user.profile_pic_url}/>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h6">{username}</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <video src={`/${video.filepath}`} width="480" height="320" controls>
                        </video>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography>{caption}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button size="small">Publish</Button>
            </CardActions>
        </Card>
    }
}

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoItem);