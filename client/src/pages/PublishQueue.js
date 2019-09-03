import React, {Component} from 'react';
import PageSkeleton from "../component/Common/PageSkeleton";
import Grid from "@material-ui/core/Grid";
import {getPublishingQueueItems} from "../redux/actions";
import {connect} from "react-redux";
import {get} from "../utils/Api";
import PublishQueueItem from "../component/PublishQueue/PublishQueueItem";
import FilteringPanel from "../component/Common/FilteringPanel";

class PublishQueue extends Component {
    constructor(props) {
        super(props);

        get(`/api/publicationsQueue?published=false`, this.props.getPublishingQueueItems);
    }

    filterItems = [
        {
            key: `/api/publicationsQueue?published=false`,
            description: "Not published"
        },
        {
            key: `/api/publicationsQueue?published=true`,
            description: "Published"
        },
        {
            key: `/api/publicationsQueue`,
            description: "All"
        }
    ];

    filtering(filteringItem) {
        get(filteringItem.key, this.props.getPublishingQueueItems);
    }

    render() {
        const {queueItems} = this.props;
        return (
            <PageSkeleton>
                <FilteringPanel filterItems={this.filterItems} label={"Filter"} callback={this.filtering.bind(this)}/>
                <Grid container direction="row" spacing={3}>
                    {
                        queueItems.map(queueItem => {
                            return <Grid item xs={3} key={queueItem.id}><PublishQueueItem queueItem={queueItem}/></Grid>
                        })
                    }
                </Grid>
            </PageSkeleton>
        );
    }
}

const mapStateToProps = state => {
    return {
        queueItems: state.publishQueue.items ? state.publishQueue.items : []
    }
};

const mapDispatchToProps = {getPublishingQueueItems};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PublishQueue);