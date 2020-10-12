import * as React from "react";
import "../../shared/config.scss";
import styles from "./Smoothies.module.scss";
import shared from "../../shared/Styles.module.scss";
import { gql, ApolloError } from "apollo-boost";
import { Query } from "react-apollo";
import {Desktop} from "../../responsiveModule";

const GET_SMOOTHIE = gql`
    query {
        allSmoothies (orderBy: SN_ASC) {
            nodes {
                id,
                img,
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

export default class Smoothies extends React.Component<{

}>{
    public render() {
        return (
            <Query query={GET_SMOOTHIE}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>Загрузка данных...</span>;
                    if (error) return <span>Ошибка! ${error.message}</span>;
                    console.log(data);
                    return (
                        <>
                            <Desktop>
                                <div className={shared.pageDt}>
                                    <span className={shared.fontTitleDt}>АССОРТИМЕНТ СМУЗИ</span>
                                    <div>
                                        <>
                                            {data.allSmoothies.nodes.map((smoothiePrice: any) => (
                                                (smoothiePrice.nameDt2) ?
                                                    <>
                                                        <div className={shared.positionOnePriceDt}>
                                                        <span className={shared.positionDoubleStringImgDt}>
                                                            <img alt="icon" src={smoothiePrice.img || "/static/svg/no-pictures.svg"}/>
                                                        </span>
                                                            <span className={shared.fontPositionDt}>{smoothiePrice.nameDt1}</span>
                                                            <span/>
                                                        </div>
                                                        <div className={shared.positionOnePriceDt}>
                                                            <span/>
                                                            <span className={shared.fontPositionDt}>{smoothiePrice.nameDt2}</span>
                                                            <span className={shared.fontPositionDt} style={{textAlign: "right"}}>{smoothiePrice.price}р</span>
                                                        </div>
                                                    </>
                                                :
                                                    <div className={shared.positionOnePriceDt}>
                                                    <span className={shared.positionImgDt}>
                                                        <img alt="icon" src={smoothiePrice.img || "/static/svg/no-pictures.svg"}/>
                                                    </span>
                                                        <span className={shared.fontPositionDt}>{smoothiePrice.nameDt1}{smoothiePrice.nameDt2}</span>
                                                        <span className={shared.fontPositionDt} style={{textAlign: "right"}}>{smoothiePrice.price}р</span>
                                                    </div>
                                            ))}
                                        </>
                                    </div>
                                </div>
                            </Desktop>
                        </>
                    );
                }}
            </Query>
        );
    }
}