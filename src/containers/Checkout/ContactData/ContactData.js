import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './ContactData.module.css';
import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios-orders';
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name',
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: '',
                    touched: ''
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid: '',
                    touched: ''
                }
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'zipCode',
                    value: '',
                    validation: {
                        required: true,
                        minLen: 5,
                        maxLen: 5
                    },
                   valid: '',
                    touched: ''
                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                    value: '',
                    validation: {
                        required: true
                    },
                   valid: '',
                    touched: ''
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail',
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: '',
                    touched: ''
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                   options: [
                       {
                           value: 'faster',
                           displayValue: "Fastest"
                       },
                       {
                           value: 'cheaper',
                           displayValue: "Cheapest"
                       }
                   ],
                },
                value: '',
                touched: '',
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    };

    orderHendler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const formData = {};

        for (let frmElemInd in this.state.orderForm) {
            formData[frmElemInd] = this.state.orderForm[frmElemInd].value;
        }

        const order= {
            ingredients: this.props.ings,
            price: this.props.price,
            data: formData
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading:false});
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({loading:false});
            });
    };

    checkValidity = (value, rules) => {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLen) {
            isValid = value.length >= rules.minLen && isValid
        }

        if (rules.maxLen) {
            isValid = value.length <= rules.maxLen && isValid
        }

        return isValid;
    };

    inputChangedHandler = (e, inputIdentyfire) => {
        const updatedForm = {
            ...this.state.orderForm,
        };

        const uptdFormElem = {
            ...updatedForm[inputIdentyfire]
        };

        uptdFormElem.elementConfig.value = e.target.value;
        uptdFormElem.valid = this.checkValidity( uptdFormElem.elementConfig.value, uptdFormElem.elementConfig.validation);
        updatedForm[inputIdentyfire] = uptdFormElem;
        uptdFormElem.touched = true;

        let formIsValid = true;
        for(let inputInd in updatedForm) {

            formIsValid = !!updatedForm[inputInd].valid && formIsValid;
        }

        this.setState({orderForm: updatedForm, formIsValid: formIsValid})
    };

    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form action="">
                {
                    formElementsArray.map( frmElem => {
                        return (
                            <Input
                                key={frmElem.id}
                                elementType={frmElem.config.elementType}
                                elementConfig={frmElem.config.elementConfig}
                                value={frmElem.config.value}
                                touched={frmElem.config.touched}
                                invalid={!frmElem.config.valid}
                                shouldValidate={frmElem.config.elementConfig.validation}
                                changed={(event) => this.inputChangedHandler(event, frmElem.id)}
                            />
                        )
                    })
                }

                <Button
                    btnType='Success'
                    clicked={this.orderHendler}
                    disabled={this.state.formIsValid}
                >ORDER</Button>
            </form>
        );

        if(this.state.loading) {
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

export default connect(mapStateToProps)(ContactData);