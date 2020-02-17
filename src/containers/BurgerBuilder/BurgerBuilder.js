import React, {Component} from 'react';

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Model/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummery"

const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.5,
    bacon: 1.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchaseble: false,
        purchasing: false
    };

    purchaseHandler = () => {
        this.setState((prev,props) => {
            return {
                ...prev,
                purchasing: !prev.purchasing
            }
        });
    };

    updatePurchase = (ingredience) => {
        const sum = Object.keys(ingredience)
            .map(key => {
                return ingredience[key];
            })
            .reduce((sum, el) => (sum + el), 0);
        this.setState({purchaseble: sum > 0})
    };

    addIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updCount = oldCount + 1;
        const updIng = {
            ...this.state.ingredients
        };

        updIng[type] = updCount;
        const priceAdd = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdd;
        this.updatePurchase(updIng);

        this.setState({totalPrice: newPrice, ingredients: updIng})
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updCount = oldCount - 1;
        const updIng = {
            ...this.state.ingredients
        };

        updIng[type] = updCount;
        const priceDed = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDed;
        this.updatePurchase(updIng);

        this.setState({totalPrice: newPrice, ingredients: updIng})
    };

    purchaseContinueHandler = () => {
        alert("here")
    };

    render() {
        const  disable = {
            ...this.state.ingredients
        };

        for (let key in disable) {
            disable[key] = disable[key] <= 0;
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseHandler}
                >
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseCancel={this.purchaseHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                        price={this.state.totalPrice}
                    />
                </Modal>
               <Burger ingrediens={this.state.ingredients}/>
                <div>
                    <BuildControls
                        ingrAdded={this.addIngridientHandler}
                        ingrRem={this.removeIngredientHandler}
                        disabled={disable}
                        price={this.state.totalPrice}
                        purchaseble={this.state.purchaseble}
                        ordered={this.purchaseHandler}
                    />
                </div>
            </Aux>
        )
    }
}

export default BurgerBuilder;