<template lang="pug">
    div(ref="chartWindowElement" class="widget-container" :style="{ backgroundColor: widgetBackgroundColor }")
        div(:style="{ fontFamily: headlineFont, color: headlineColor, fontSize: '20px' }" style="border:0px solid;") Utveckling
        div(style="margin-bottom:20px; border:0px solid;")
            table(cellpadding="0" cellspacing="0" width="100%")
                tr
                    td(:style="{ fontFamily: underHeadlineFont, color: underHeadlineColor, lineHeight: underHeadlineLineHeight, fontSize: '12px' }" style="width:65%; border:0px solid;") Nyckeltal för de senaste 5 åren.
                    td(:style="{ fontFamily: quarterYearTextFont, color: quarterYearTextColor, fontSize: '12px' }" style="position:relative; width:35%; text-align:right; padding-right:35px; border:0px solid;") År / Kvartal
                        div(style="position:absolute; right:28px; top:-7px; border:0px solid;")
                            div(@click="switchQuarterlyOrYearly()" id="switch-block" style="position:relative; border:0px solid;")
                                svg(xmlns="http://www.w3.org/2000/svg" width="2em" height="1em" viewBox="0 0 24 24" style="position:absolute; height:30px;")
                                    path(v-if="quarterlyOrYearly === 'quarterly'" :fill="switchButtonColor" d="M17 6H7c-3.31 0-6 2.69-6 6s2.69 6 6 6h10c3.31 0 6-2.69 6-6s-2.69-6-6-6m0 10H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h10c2.21 0 4 1.79 4 4s-1.79 4-4 4m0-7c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3")
                                    path(v-else :fill="switchButtonColor" d="M17 6H7c-3.31 0-6 2.69-6 6s2.69 6 6 6h10c3.31 0 6-2.69 6-6s-2.69-6-6-6m0 10H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h10c2.21 0 4 1.79 4 4s-1.79 4-4 4M7 9c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3")

        ChartWidget(
            v-if="reload && fundamentalData !== null"
            :chartTextFont="chartTextFont"
            :chartTextColor="chartTextColor"
            :chartTextLineHeight="chartTextLineHeight"
            :chartValueFont="chartValueFont"
            :chartValueColor="chartValueColor"
            :infoIconColor="infoIconColor"
            :chartData="fundamentalData.ratios"
            :quarterOrYear="quarterlyOrYearly"
            :mobileOrDesktopCheck="mobileOrDesktopCheck"
            :chartBarColor="chartBarColor"
        )

        //- modal
        div(v-if="showModal")
            div(@click="showModal = false" id="myModal" ref="myModal" class="modal")
            div(class="modal-content" ref="myContent" :style="{ fontFamily: modalTextFont, color: modalTextColor, border: `1px solid ${modalBorderColor}`, backgroundColor: modalBackgroundColor }")
                div(style="padding:10px;")
                    div(class="close" style="position:relative; border:0px solid;")
                        div(@click="showModal = false" class="close" style="position:absolute; top:-13px; right:-1px; border:0px solid;") &times;
                    div
                        span(v-html="infoText")
                    //- div(style="font-size:30px; color:#005AA0; padding-top:10px; border:0px solid;")
                    //-     div(style="width:fit-content; margin:auto; border:0px solid;") Vinst per aktie
                    //- div(style="font-size:14px;") Vinst per aktie (EPS), är ett viktigt värde i ett företags resultatrapporter. Det beräknas genom att man delar den totala vinsten för en period, med antalet aktier som företaget har på aktiemarknaden. Vinst per aktieanvänds för att fastställa värdet på företagets utestående aktier.
                    //- div(style="margin-top:40px; font-size:14px;") Så har vi räknat
                    //- hr
                    //- div(style="font-size:12px;") Vinst per aktie räknas ut genom att dividera företagets nettovinst med antalet utestående aktier under den rapporterade perioden. Informationen hämtar vi från företagets kvartals- och/eller årsrapporter. Detta räknas på rullande 12 månader.
</template>

<script>
import { useWidgetStore } from "./store/WidgetStore";
import { storeToRefs, mapActions } from 'pinia';
import ChartWidget from './components/chart-widget.ce.vue';

export default {
    name: "chart-ratios",
    props: {
        isin: String,
        headlineFont: String,
        headlineColor: String,
        underHeadlineFont: String,
        underHeadlineColor: String,
        quarterYearTextFont: String,
        quarterYearTextColor: String,
        switchButtonColor: String,
        chartTextFont: String,
        chartTextColor: String,
        chartTextLineHeight: {
            type: String,
            default: '1em'
        },
        chartValueFont: String,
        chartValueColor: String,
        chartBarColor: {
            type: String,
            default: '["#000000", "#000000", "#000000", "#000000", "#000000"]'
        },
        modalTextFont: String,
        modalTextColor: String,
        modalBorderColor: String,
        modalBackgroundColor: {
            type: String,
            default: '#FFFFFF'
        },
        infoIconColor: {
            type: String,
            default: '#000000'
        },
        widgetBackgroundColor: {
            type: String,
            default: '#FFFFFF'
        },
        underHeadlineLineHeight: {
            type: String,
            default: '1em'
        }
    },
    components: {
        ChartWidget,
    },
    data() {
        return {
            infoText: '',
            showModal: false,
            mouseOverCheck: false,
            mobileOrDesktopCheck: null,
            reload: true,
            quarterlyOrYearly: 'quarterly',
            fundamentalData: null,
        };
    },
    setup() {
        const taskWidgetStore = useWidgetStore();

        const { ratios } = storeToRefs(taskWidgetStore);

        return {
            ratios,
        };
    },
    methods: {
        ...mapActions(useWidgetStore, ['loadRatios']),
        visibilityChange() {
            if(document.hidden){
                console.log("Browser tab is hidden");
            } else {
                console.log("Browser tab is visible");

                const chartWindowElement = this.$refs.chartWindowElement;

                // console.log(chartWindowElement);

                chartWindowElement.style.visibility = "hidden";

                setTimeout(() => {
                    chartWindowElement.style.visibility = "visible";
                }, 200);
            }
        },
        switchQuarterlyOrYearly() {
            console.log('entered?!...');

            this.quarterlyOrYearly = this.quarterlyOrYearly === 'quarterly' ? 'ttm' : 'quarterly';

            console.log(this.quarterlyOrYearly);

            this.reload = false;

            setTimeout(() => {
                this.reload = true;
            }, 1);
        },
        checkMobile() {
            // console.log('checkMobile');

            // Check if the user is accessing the page on a mobile device
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (isMobile) {
                // User is accessing the page on a mobile device
                console.log("Mobile device detected");

                return true;
            } else {
                // User is accessing the page on a desktop device
                console.log("Desktop device detected");

                return false;
            }
        },
        onResize() {
            this.reload = false;

            setTimeout(() => {
                this.reload = true;
            }, 500);
        },
    },
    async mounted() {
        window.addEventListener("visibilitychange", this.visibilityChange);

        await this.loadRatios({
            isin: this.isin,//'SE0007100607',
        });

        this.fundamentalData = JSON.parse(JSON.stringify(this.ratios));

        console.log('fundamentalData', JSON.parse(JSON.stringify(this.fundamentalData.ratios)));

        window.addEventListener("resize", this.onResize);

        this.mobileOrDesktopCheck = this.checkMobile();

        console.log(this.mobileOrDesktopCheck);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onResize);
        window.removeEventListener("visibilitychange", this.visibilityChange);
    },
}
</script>

<style scoped>
.container-mobile {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
}

.container-regular {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 40px;
}

hr {
    height: 1px;
    background-color: #A3B3C2;
    border: none;
    margin-bottom: 10px;
}

/* modal block *************************** */
.modal {
    /* display: none; */
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
}

.modal-content {
    position: absolute;
    z-index: 2;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    background-color: #fefefe;
    width: 100%;
    border-radius: 10px 10px 0 0;
}

.close {
    color: #aaa;
    margin-left: auto;
    margin-right: 0;
    font-size: 28px;
    font-weight: bold;
    width: fit-content;
}
/* *************************************** */
</style>
