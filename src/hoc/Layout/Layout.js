import React, {Component} from 'react';

import Auxx from "../Auxx/Auxx";
import classes from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrower from "../../components/Navigation/SideDrower/SideDrower";

class Layout extends Component {
    state = {
        showSideDrower: false
    };
    sideDrowerCloseHandler = () => {
        this.setState(prev => {
            return {
                ...prev,
                showSideDrower: !prev.showSideDrower
            }
        })
    };

    render() {
        return (

            <Auxx>
                <Toolbar drawerToggleClicked={this.sideDrowerCloseHandler}/>
                <SideDrower open={this.state.showSideDrower} closed={this.sideDrowerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxx>
        )
    }
}

export default Layout;

