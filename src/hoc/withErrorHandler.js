import React from 'react';
import Modal from '../components/UI/Modal/Modal';
import Aux from './AuxHoc';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {

        constructor(props){
            super(props);
            this.reqInercepteros = axios.interceptors.request.use(req=>{
                this.setState({error: null});
                return req;
            });
            this.respInercepteros = axios.interceptors.response.use(resp => resp, error => {
                this.setState({error: error});
            });

            this.state = {
                error: null
            }
        }
      
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInercepteros);            
            axios.interceptors.response.eject(this.respInercepteros);
        }  
        
        errorConfrimHandler = () => {
            this.setState({error: null});
        }
        render(){
            return (
                <Aux>
                    <Modal
                        clicked={this.errorConfrimHandler} 
                        modalClosed={this.state.error}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
};

export default withErrorHandler;