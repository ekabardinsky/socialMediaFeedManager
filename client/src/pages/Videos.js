import React, {Component} from 'react';
import PageSkeleton from "../component/PageSkeleton/PageSkeleton";
import Grid from "@material-ui/core/Grid";
import {getVideos} from "../redux/actions";
import {connect} from "react-redux";
import VideoItem from "../component/Videos/VideoItem";
import {get} from "../utils/Api";

class Videos extends Component {
    constructor(props) {
        super(props);

        get(`/api/videos`, this.props.getVideos);
    }

    render() {
        const {videos} = this.props;
        return (
            <PageSkeleton>
                <Grid container direction="row" spacing={3}>
                    {
                        videos.map(video => {
                            return <Grid item xs={6} key={video.id}><VideoItem video={video}/></Grid>
                        })
                    }
                </Grid>
            </PageSkeleton>
        );
    }
}

const mapStateToProps = state => {
    return {
        videos: state.videos.videos ? state.videos.videos : []
    }
};

const mapDispatchToProps = {getVideos};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Videos);