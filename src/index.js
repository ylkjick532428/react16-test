/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';

import ReactDOM from 'react-dom';
import './scss/index.scss';

class App extends PureComponent {
    onMouseMove = (e) => {
        console.log(e.clientX, e.clientY);
    }

    render() {
        return (
            <div className="container" onMouseMove={this.onMouseMove}>
                <div className="py-5 text-center">
                    <img
                        className="d-block mx-auto mb-4"
                        src="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg"
                        alt=""
                        width="72"
                        height="72"
                    />
                    <h2>Checkout form</h2>
                    <p className="lead">
Below is an example form built entirely with Bootstrap’s form controls. Each required form
                group has a validation state that can be triggered by attempting to submit the form without completing
                it.
                    </p>
                </div>


                <footer className="my-5 pt-5 text-muted text-center text-small">
                    <p className="mb-1">&copy; 2017-2019 Company Name</p>
                    <ul className="list-inline">
                        <li className="list-inline-item"><a href="#">Privacy</a></li>
                        <li className="list-inline-item"><a href="#">Terms</a></li>
                        <li className="list-inline-item"><a href="#">Support</a></li>
                    </ul>
                </footer>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
