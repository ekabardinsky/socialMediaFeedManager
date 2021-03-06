import React, {Component} from 'react';
import PageSkeleton from "../component/Common/PageSkeleton";
import Grid from "@material-ui/core/Grid";
import {getSettings, getVideos} from "../redux/actions";
import {connect} from "react-redux";
import VideoItem from "../component/Videos/VideoItem";
import {get} from "../utils/Api";
import FilteringPanel from "../component/Common/FilteringPanel";

class Videos extends Component {
    constructor(props) {
        super(props);

        get(`/api/videos?queued=false`, this.props.getVideos);
        get(`/api/settings/current`, this.props.getSettings);
    }

    filterItems = [
        {
            key: `/api/videos?queued=false`,
            description: "Not queued"
        },
        {
            key: `/api/videos?queued=true`,
            description: "Queued"
        },
        {
            key: `/api/videos`,
            description: "All"
        }
    ];

    filtering(filteringItem) {
        get(filteringItem.key, this.props.getVideos);
    }

    render() {
        const {videos} = this.props;
        return (
            <PageSkeleton>
                <FilteringPanel filterItems={this.filterItems} label={"Filter"} callback={this.filtering.bind(this)}/>
                <Grid container direction="row" spacing={3}>
                    {
                        videos.map(video => {
                            return <Grid item xs={3} key={video.id}><VideoItem video={video}/></Grid>
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

const mapDispatchToProps = {getVideos, getSettings};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Videos);