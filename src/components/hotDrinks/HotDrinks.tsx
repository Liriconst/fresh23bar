import * as React from "react";
import "../../shared/config.scss";
import styles from "./HotDrinks.module.scss";
import shared from "../../shared/Styles.module.scss";
import { gql, ApolloError } from "apollo-boost";
import { Query } from "react-apollo";
import {Desktop} from "../../responsiveModule";

const GET_HOT_DRINK = gql`
    query {
        allHotDrinks (orderBy: SN_ASC) {
            nodes {
                id,
                img,
                nameSp1,
                nameSp2,
                nameLt1,
                nameLt2,
                nameDt1,
                nameDt2,
                priceLittle,
                priceBig
            }
        }
    }
`;

export default class HotDrinks extends React.Component<{

}>{
    public render() {
        return (
            <Query query={GET_HOT_DRINK}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>Загрузка данных...</span>;
                    if (error) return <span>Ошибка! ${error.message}</span>;
                    console.log(data);
                    return (
                        <>
                            <Desktop>
                                <div className={shared.pageDt}>
                                    <span className={shared.fontTitleDt}>ГОРЯЧИЕ НАПИТКИ</span>
                                    <div>
                                        <div className={shared.listHeaderDt}>
                                            <span className={shared.listHeaderNameDt}>Объем</span>
                                            <span className={shared.listHeaderLittleCapacityDt}>300мл</span>
                                            <span className={shared.listHeaderSeparatorDt}/>
                                            <span className={shared.listHeaderBigCapacityDt}>400мл</span>
                                        </div>
                                        {data.allHotDrinks.nodes.map((hotDrinkPrice: any) => (
                                            (hotDrinkPrice.nameDt2) ?
                                                <>
                                                    <div className={shared.positionTwoPriceDt}>
                                                        <span className={shared.positionDoubleStringImgDt}>
                                                            <img alt="icon" src={hotDrinkPrice.img || "/static/svg/no-pictures.svg"}/>
                                                        </span>
                                                        <span className={shared.fontPositionDt}>{hotDrinkPrice.nameDt1}</span>
                                                        <span/><span/>
                                                    </div>
                                                    <div className={shared.positionTwoPriceDt}>
                                                        <span/>
                                                        <span className={shared.fontPositionDt}>{hotDrinkPrice.nameDt2}</span>
                                                        <span className={shared.fontPositionDt} style={{textAlign: "left"}}>{hotDrinkPrice.priceLittle}р</span>
                                                        {(hotDrinkPrice.priceBig) ? <span className={shared.fontPositionDt} style={{textAlign: "right"}}>{hotDrinkPrice.priceBig}р</span> : <span/>}
                                                    </div>
                                                </>
                                            :
                                                <div className={shared.positionTwoPriceDt}>
                                                    <span className={shared.positionImgDt}>
                                                        <img alt="icon" src={hotDrinkPrice.img || "/static/svg/no-pictures.svg"}/>
                                                    </span>
                                                    <span className={shared.fontPositionDt}>{hotDrinkPrice.nameDt1}{hotDrinkPrice.nameDt2}</span>
                                                    <span className={shared.fontPositionDt} style={{textAlign: "left"}}>{hotDrinkPrice.priceLittle}р</span>
                                                    {(hotDrinkPrice.priceBig) ? <span className={shared.fontPositionDt} style={{textAlign: "right"}}>{hotDrinkPrice.priceBig}р</span> : <span/>}
                                                </div>
                                        ))}
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