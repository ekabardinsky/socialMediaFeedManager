import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {changePage} from "../../redux/actions";
import {connect} from "react-redux";
import {Link} from 'react-router-dom'

class PageSkeleton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
    }

    handleClick(event) {
        this.setAnchorEL(event.currentTarget);
    }

    handleClose() {
        this.setAnchorEL(null);
    }

    setAnchorEL(value) {
        this.setState({anchorEl: value});
    }

    pickAPage(value) {
        this.props.changePage(value);
        this.handleClose();
    }

    render() {
        const {anchorEl} = this.state;
        const {pageName} = this.props;
        const pickAPage = (page) => {
            return () => this.pickAPage(page)
        };

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu"
                                    onClick={this.handleClick.bind(this)}>
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose.bind(this)}>
                            <Link to="./accounts"><MenuItem
                                onClick={pickAPage("Accounts")}>Accounts</MenuItem></Link>
                            <Link to="./integrations"><MenuItem
                                onClick={pickAPage("Integrations")}>Integrations</MenuItem></Link>
                            <Link to="./videos"><MenuItem onClick={pickAPage("Videos")}>Videos</MenuItem></Link>
                            <Link to="./settings"><MenuItem onClick={pickAPage("Settings")}>Settings</MenuItem></Link>
                        </Menu>
                        <Typography variant="h6">
                            {pageName}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={"container"}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        pageName: state.page.pageName
    }
};

const mapDispatchToProps = {changePage};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageSkeleton);