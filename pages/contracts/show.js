// This components shows the details of deployed contract
import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Contract from '../../ethereum/contract'; // gets the arrow function defined in the contract.js
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes'; // it will wrap the content and when you click it, it will help navigate to other pages 

class ContractShow extends Component {
    //props will have the access to url being passed 
    static async getInitialProps(props) {
        const contract = Contract(props.query.address);

        const summary = await contract.methods.getSummary().call();
        // pass the properties with names instead of the object which is difficult to understand
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        // Assign the values from this.props to the variables
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props; 

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this contract and can create requests to withdraw money',
                style: { overflowWrap: 'break-word' }
            },

            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver'
            },

            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be apporved by the approvers'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this contract'
            },
            {
                header: web3.utils.fromWei(balance,'ether'),
                meta: 'Contract Balance (ether)',
                description: 'The balance is how much money this contract has left to spend.'
            }
        ];
        // Card Group from semantic UI REACT
        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Contract Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                            
                        </Grid.Column>

                        <Grid.Column width={6}>
                            {/* the address is passed from the parent to child - this will go in props for contribute form */}
                            <ContributeForm address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/contracts/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default ContractShow;