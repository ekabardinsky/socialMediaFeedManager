import React, {Component} from 'react';
import {connect} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import moment from 'moment';
import Alarm from '@material-ui/icons/Alarm'
import Done from '@material-ui/icons/Done'

class PublishQueueItem extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {queueItem} = this.props;

        return <Card elevation={4}>
            <CardContent>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={2}>
                        <Avatar alt={`${queueItem.account.type}`} src={`/images/${queueItem.account.type}.png`}/>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h6">{queueItem.account.username}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <video preload={"metadata"} src={`/${queueItem.video.filepath}`} width="320" height="240"
                               controls>
                        </video>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>{queueItem.publication.comment}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        {queueItem.published ? <Done/> : <Alarm/>}
                    </Grid>
                    <Grid item xs={11}>
                        <Typography>
                            {`Scheduled time: ${moment.unix(queueItem.date).format("HH:mm DD.MM.YY")}`}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PublishQueueItem);