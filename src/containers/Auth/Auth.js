import React, {Component} from 'react';
import {connect} from 'react-redux';

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.module.css';
import * as actions from '../../store/actions';
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLen: 6
                },
                valid: false,
                touched: ''
            },
        },
        isSignUp: true
    };

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirect !== '/') {
            this.props.onSetRedirect();
        }
    }

    switchUpModalHandler = () => {
        this.setState( prevState => {
            return {
              isSignUp: !prevState.isSignUp
          };
        })
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
            isValid = value.length >= rules.minLen && isValid;
        }

        if (rules.maxLen) {
            isValid = value.length <= rules.maxLen && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    };

    inputChangedHandler = (e, contronName) => {
        const updatedControls = {
            ...this.state.controls,
            [contronName]: {
                ...this.state.controls[contronName],
                value: e.target.value,
                valid: this.checkValidity(e.target.value, this.state.controls[contronName].validation),
                touched: true
            }
        };

        this.setState({controls: updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    };

    render() {
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement =>{
            return(
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                touched={formElement.config.touched}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />)}
        );

        if (this.props.loading) {
            form= <Spinner/>
        }

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let redirect = null;
        if (this.props.isAuth) {
            redirect = <Redirect to={this.props.authRedirect} />;
            console.log( this.props.isAuth, this.props.authRedirect);
        }
        return (
            <div className={classes.Auth}>
                {
                    redirect
                }
                {
                    errorMessage
                }
                <form action="" onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success"
                    >Submit</Button>
                </form>
                <Button
                    clicked={this.switchUpModalHandler}
                    btnType='Danger'>Switch to {this.state.isSignUp ? "SIGNIN" : 'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetRedirect: () => dispatch(actions.setAuthRedirect('/'))
    }
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirect: state.auth.authUrl
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);