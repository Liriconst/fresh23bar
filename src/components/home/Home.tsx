import * as React from "react";
import {Desktop} from "../../responsiveModule";
import styles from "./Home.module.scss";

export class Home extends React.Component<{}, {

}>{
    public render() {
        return (
            <>
                <Desktop>
                    <div className={styles.pageHomeDt}>
                        <span className={styles.homeLogoDt}><img alt="icon" src="/static/svg/logo.svg"/></span>
                        <span className={styles.homeTextIndentedDt}>Городской пляж "Витязево",</span>
                        <span className={styles.homeTextIndentedDt}>напротив центрального</span>
                        <span className={styles.homeTextDt}>входа на пляж</span>
                        <span className={styles.homeSeparatorDt}/>
                        <div className={styles.homeScheduleBlockDt}>
                            <span className={styles.homeTextScheduleDt}>Ежедневно с</span>
                            <span className={styles.homeNumberScheduleDt}>&nbsp;9</span>
                            <span className={styles.homeTextSuperscriptDt}>00</span>
                            <span className={styles.homeTextScheduleDt}>&nbsp;до</span>
                            <span className={styles.homeNumberScheduleDt}>&nbsp;23</span>
                            <span className={styles.homeTextSuperscriptDt}>00</span>
                        </div>
                        <span className={styles.homeSeparatorDt}/>
                        <span className={styles.homeTextDt}>+7(900)274-77-91</span>
                        <span className={styles.homeArrowDt}><img alt="icon" src="/static/svg/arrow-top-to-bottom-3.svg"/></span>
                    </div>
                </Desktop>
            </>
        );
    }
}