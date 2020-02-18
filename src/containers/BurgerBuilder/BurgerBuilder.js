import React, {Component} from 'react';

import Auxx from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Model/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummery";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHendler/withErrorHendler";

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
        purchasing: false,
        loading: false
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
        this.setState({
            loading: true
        });
        const order= {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Yurii',
                address: {
                    street: 'Fight',
                    zipCode: '41230',
                    country: 'Ukraine'
                },
                email: 'ff@ss.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading:false, purchasing: false});
            })
            .catch(err => {
                this.setState({loading:false, purchasing: false});
            });
    };


    render() {
        const  disable = {
            ...this.state.ingredients
        };

        for (let key in disable) {
            disable[key] = disable[key] <= 0;
        }

        let orderSummary =  <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancel={this.purchaseHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}
        />;

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Auxx>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseHandler}
                >
                    {orderSummary}
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
            </Auxx>
        )
    }
}

export default  withErrorHandler(BurgerBuilder);