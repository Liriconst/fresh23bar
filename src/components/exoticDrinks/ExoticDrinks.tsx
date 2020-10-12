import * as React from "react";
import "../../shared/config.scss";
import styles from "./ExoticDrinks.module.scss";
import shared from "../../shared/Styles.module.scss";
import { gql, ApolloError } from "apollo-boost";
import { Query } from "react-apollo";
import {Desktop} from "../../responsiveModule";

const GET_EXOTIC = gql`
    query {
        allExoticDrinks (orderBy: SN_ASC) {
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

const ExoticPosition: React.FC<{exoticPrice: any}> = ({exoticPrice}) => (
    (exoticPrice.nameDt2) ?
        <>
            <div className={shared.positionOnePriceDt}>
                <span className={shared.positionDoubleStringImgDt}>
                    <img alt="icon" src={exoticPrice.img || "/static/svg/no-pictures.svg"}/>
                </span>
                <span className={shared.fontPositionDt}>{exoticPrice.nameDt1}</span>
                <span/>
            </div>
            <div className={shared.positionOnePriceDt}>
                <span/>
                <span className={shared.fontPositionDt}>{exoticPrice.nameDt2}</span>
                <span className={shared.fontPositionDt} style={{textAlign: "right"}}>{exoticPrice.price}р</span>
            </div>
        </>
    :
        <div className={shared.positionOnePriceDt}>
            <span className={shared.positionImgDt}>
                <img alt="icon" src={exoticPrice.img || "/static/svg/no-pictures.svg"}/>
            </span>
            <span className={shared.fontPositionDt}>{exoticPrice.nameDt1}{exoticPrice.nameDt2}</span>
            <span className={shared.fontPositionDt} style={{textAlign: "right"}}>{exoticPrice.price}р</span>
        </div>
);

export default class ExoticDrinks extends React.Component<{

}>{
    public render() {
        return (
            <Query query={GET_EXOTIC}>
                {({loading, error, data}: {loading: boolean, error?: ApolloError, data: any}) => {
                    if (loading) return <span>Загрузка данных...</span>;
                    if (error) return <span>Ошибка! ${error.message}</span>;
                    console.log(data);
                    return (
                        <>
                            <Desktop>
                                <div className={shared.pageDt}>
                                    <span className={shared.fontTitleDt}>ЭКСКЛЮЗИВНЫЕ КОКТЕЙЛИ</span>
                                    <div>
                                        <>
                                            {data.allExoticDrinks.nodes.filter((it: any) => it.category).map((exoticPrice: any) => (
                                                <ExoticPosition exoticPrice={exoticPrice}/>
                                            ))}
                                            <span className={shared.fontTitleInnerDt}>ЭКЗОТИКА</span>
                                            {data.allExoticDrinks.nodes.filter((it: any) => !it.category).map((exoticPrice: any) => (
                                                <ExoticPosition exoticPrice={exoticPrice}/>
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