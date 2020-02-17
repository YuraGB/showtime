import React, {Component} from 'react';

import Aux from "../Aux/Aux";
import classes from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrower from "../../components/Navigation/SideDrower/SideDrower";

class Layout extends Component {
    state = {
        showSideDrower: true
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
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrowerCloseHandler}/>
                <SideDrower open={this.state.showSideDrower} closed={this.sideDrowerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;

