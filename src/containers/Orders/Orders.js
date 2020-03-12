import React, {Component} from 'react';
import {connect} from 'react-redux';

import Order from "../../components/Order/Order";
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHendler/withErrorHendler';
import * as actions from '../../store/actions';

class Orders extends Component {

    componentDidMount(props) {;
        this.props.onFetchOrders();
    }

    render() {
        return (
            <div>
                {
                    this.props.orders.map( order => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={+order.price}
                        />
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));