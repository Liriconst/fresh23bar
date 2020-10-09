import * as React from "react";
import "../../shared/config.scss";
import styles from "./Freshes.module.scss";
import shared from "../../shared/Styles.module.scss";
import { gql, ApolloError } from "apollo-boost";
import { Query } from "react-apollo";
import {Desktop} from "../../responsiveModule";

const GET_FRESH = gql`
    query {
        allFreshes (orderBy: SN_ASC) {
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
                priceBig,
                category
            }
        }
    }
`;

export default class Freshes extends React.Component<{

}>{
    public render() {
        return (
            <Query query={GET_FRESH}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>Загрузка данных...</span>;
                    if (error) return <span>Ошибка! ${error.message}</span>;
                    console.log(data);
                    return (
                        <>
                            <Desktop>
                                <div className={shared.pageDt}>
                                    <span className={shared.fontTitleDt}>ФРЕШИ</span>
                                    <div>
                                        <div className={shared.listHeaderDt}>
                                            <span className={shared.listHeaderNameDt}>Объем</span>
                                            <span className={shared.listHeaderLittleCapacityDt}>200мл</span>
                                            <span className={shared.listHeaderSeparatorDt}/>
                                            <span className={shared.listHeaderBigCapacityDt}>400мл</span>
                                        </div>
                                        {data.allFreshes.nodes.filter((it: any) => it.category).map((freshPrice: any) => (
                                            (freshPrice.nameDt2) ?
                                                <>
                                                    <div className={shared.positionTwoPriceDt}>
                                                        <span className={shared.positionDoubleStringImgDt}>
                                                            <img alt="icon" src={freshPrice.img || "/static/svg/no-pictures.svg"}/>
                                                        </span>
                                                        <span className={shared.fontPositionDt}>{freshPrice.nameDt1}</span>
                                                        <span/><span/>
                                                    </div>
                                                    <div className={shared.positionTwoPriceDt}>
                                                        <span/>
                                                        <span className={shared.fontPositionDt}>{freshPrice.nameDt2}</span>
                                                        <span className={shared.fontPositionDt} style={{textAlign: "left"}}>{freshPrice.priceLittle}р</span>
                                                        <span className={shared.fontPositionDt} style={{textAlign: "right"}}>{freshPrice.priceBig}р</span>
                                                    </div>
                                                </>
                                            :
                                                <div className={shared.positionTwoPriceDt}>
                                                    <span className={shared.positionImgDt}>
                                                        <img alt="icon" src={freshPrice.img || "/static/svg/no-pictures.svg"}/>
                                                    </span>
                                                    <span className={shared.fontPositionDt}>{freshPrice.nameDt1}{freshPrice.nameDt2}</span>
                                                    <span className={shared.fontPositionDt} style={{textAlign: "left"}}>{freshPrice.priceLittle}р</span>
                                                    <span className={shared.fontPositionDt} style={{textAlign: "right"}}>{freshPrice.priceBig}р</span>
                                                </div>
                                        ))}
                                        <span className={shared.fontTitleInnerLittleDt}>СВЕЖИЕ КОКТЕЙЛИ</span>
                                        {data.allFreshes.nodes.filter((it: any) => !it.category).map((freshPrice: any) => (
                                            (freshPrice.nameDt2) ?
                                                <>
                                                    <div className={shared.positionOnePriceDt}>
                                                        <span className={shared.positionDoubleStringImgDt}>
                                                            <img alt="icon" src={freshPrice.img || "/static/svg/no-pictures.svg"}/>
                                                        </span>
                                                        <span className={shared.fontPositionDt}>{freshPrice.nameDt1}</span>
                                                        <span/>
                                                    </div>
                                                    <div className={shared.positionOnePriceDt}>
                                                        <span/>
                                                        <span className={shared.fontPositionDt}>{freshPrice.nameDt2}</span>
                                                        <span className={shared.fontPositionDt} style={{textAlign: "right"}}>{freshPrice.priceBig}р</span>
                                                    </div>
                                                </>
                                            :
                                                <div className={shared.positionOnePriceDt}>
                                                    <span className={shared.positionImgDt}>
                                                        <img alt="icon" src={freshPrice.img || "/static/svg/no-pictures.svg"}/>
                                                    </span>
                                                    <span className={shared.fontPositionDt}>{freshPrice.nameDt1}{freshPrice.nameDt2}</span>
                                                    <span className={shared.fontPositionDt} style={{textAlign: "right"}}>{freshPrice.priceBig}р</span>
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