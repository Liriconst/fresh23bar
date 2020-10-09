import * as React from "react";
import "../../shared/config.scss";
import styles from "./IceCreams.module.scss";
import shared from "../../shared/Styles.module.scss";
import { gql, ApolloError } from "apollo-boost";
import { Query } from "react-apollo";
import {Desktop} from "../../responsiveModule";

const GET_ICE_CREAM_TOPPING = gql`
    query {
        allIceCreamToppings (orderBy: SN_ASC) {
            nodes {
                id,
                img,
                nameSp1,
                nameSp2,
                nameLt1,
                nameLt2,
                nameDt1,
                nameDt2,
                price,
                category
            }
        }
    }
`;

const IceCreamToppingPosition: React.FC<{iceCreamToppingPrice: any}> = ({iceCreamToppingPrice}) => (
    (iceCreamToppingPrice.nameDt2) ?
        <>
            <div className={shared.positionOnePriceDt}>
                <span className={shared.positionDoubleStringImgDt}>
                    <img alt="icon" src={iceCreamToppingPrice.img || "/static/svg/no-pictures.svg"}/>
                </span>
                <span className={shared.fontPositionDt}>{iceCreamToppingPrice.nameDt1}</span>
                <span/>
            </div>
            <div className={shared.positionOnePriceDt}>
                <span/>
                <span className={shared.fontPositionDt}>{iceCreamToppingPrice.nameDt2}</span>
                <span className={shared.fontPositionDt} style={{textAlign: "right"}}>{iceCreamToppingPrice.price}р</span>
            </div>
        </>
        :
        <div className={shared.positionOnePriceDt}>
            <span className={shared.positionImgDt}>
                <img alt="icon" src={iceCreamToppingPrice.img || "/static/svg/no-pictures.svg"}/>
            </span>
            <span className={shared.fontPositionDt}>{iceCreamToppingPrice.nameDt1}{iceCreamToppingPrice.nameDt2}</span>
            <span className={shared.fontPositionDt} style={{textAlign: "right"}}>{iceCreamToppingPrice.price}р</span>
        </div>
);

export default class IceCreams extends React.Component<{

}>{
    public render() {
        return (
            <Query query={GET_ICE_CREAM_TOPPING}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>Загрузка данных...</span>;
                    if (error) return <span>Ошибка! ${error.message}</span>;
                    console.log(data);
                    return (
                        <>
                            <Desktop>
                                <div className={shared.pageLittleDt}>
                                    <span className={shared.fontTitleLittleDt}>МОРОЖЕНОЕ</span>
                                    <div>
                                        <>
                                            {data.allIceCreamToppings.nodes.filter((it: any) => it.category).map((iceCreamToppingPrice: any) => (
                                                <IceCreamToppingPosition iceCreamToppingPrice={iceCreamToppingPrice}/>
                                            ))}
                                            <span className={shared.fontTitleInnerLittleDt}>ТОППИНГИ, ДОПЫ</span>
                                            {data.allIceCreamToppings.nodes.filter((it: any) => !it.category).map((iceCreamToppingPrice: any) => (
                                                <IceCreamToppingPosition iceCreamToppingPrice={iceCreamToppingPrice}/>
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