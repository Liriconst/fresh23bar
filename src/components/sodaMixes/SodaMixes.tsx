import * as React from "react";
import styles from "./SodaMixes.module.scss";
import { gql, ApolloError } from "apollo-boost";
import { Query } from "react-apollo";
import {Desktop} from "../../responsiveModule";

const GET_SODA = gql`
    query {
        allSodaMixes {
            nodes {
                id,
                nameSp1,
                nameSp2,
                nameLt1,
                nameLt2,
                nameDt1,
                nameDt2,
                price
            }
        }
    }
`;

export default class SodaMixes extends React.Component<{

}>{
    public render() {
        return (
            <Query query={GET_SODA}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>Загрузка данных...</span>;
                    if (error) return <span>Ошибка! ${error.message}</span>;
                    console.log(data);
                    return (
                        <>
                            <Desktop>
                                <div className={styles.pageSodaDt}>
                                    <span>ГАЗИРОВАННЫЕ НАПИТКИ</span>
                                    {data.allSodaMixes.nodes.map((sodaPrice: any) => (
                                        <div>
                                            <span style={{fontSize: "15px"}}>{sodaPrice.nameDt1}</span>
                                            <span style={{fontSize: "15px"}}>{sodaPrice.nameDt2}</span>
                                            <span style={{fontSize: "15px"}}>{sodaPrice.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </Desktop>
                        </>
                    );
                }}
            </Query>
        );
    }
}