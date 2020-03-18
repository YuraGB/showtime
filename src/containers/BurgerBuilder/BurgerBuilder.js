import React, {Component} from 'react';
import {connect} from 'react-redux';

import Auxx from "../../hoc/Auxx/Auxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Model/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummery";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHendler/withErrorHendler";
import * as actions from "../../store/actions";

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.onInitIngr();
    }

    purchaseHandler = () => {
    if (this.props.isAuth){
        this.setState((prev, props) => {
            return {
                ...prev,
                purchasing: !prev.purchasing
            }
        });
    } else {
        this.props.onSetRedirect('/checkout');
        this.props.history.push('/auth');
    }
    };

    updatePurchase = (ingredience) => {
        const sum = Object.keys(ingredience)
            .map(key => {
                return ingredience[key];
            })
            .reduce((sum, el) => (sum + el), 0);
       return  sum > 0
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push( '/checkout')
    };


    render() {
        const  disable = {
            ...this.props.ings
        };

        for (let key in disable) {
            disable[key] = disable[key] <= 0;
        }

        let orderSummary;

        if(!this.props.ings) {
            orderSummary = <Spinner />;
        } else {
            orderSummary =  <OrderSummary
                ingredients={this.props.ings}
                purchaseCancel={this.purchaseHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.price}
            />;
        }
        let burger = this.props.error ?
            <p>Ingrediens Are missing</p> :
            <Spinner/>;
        if (this.props.ings) {
            burger = (
                <Auxx>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingrAdded={this.props.onIngredientAdded}
                        ingrRem={this.props.onIngredientRemoved}
                        disabled={disable}
                        price={this.props.price}
                        purchaseble={this.updatePurchase(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuth}
                    />
                </Auxx>
            )
        }
        return (
            <Auxx>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxx>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch( actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch( actions.rmvIngredient(ingName)),
        onInitIngr: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetRedirect: (path) => dispatch(actions.setAuthRedirect(path))
    }
};

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));