<template lang="pug">
    div(class="widget-container")
        div(class="headline" style="border:0px solid;") Utveckling
        div(style="margin-bottom:20px; border:0px solid;")
            table(cellpadding="0" cellspacing="0" width="100%")
                tr
                    td(style="width:65%; border:0px solid;") Nyckeltal för de senaste 5 åren.
                    td(style="position:relative; width:35%; text-align:right; padding-right:35px; border:0px solid;") År / Kvartal
                        div(style="position:absolute; right:28px; top:-7px; border:0px solid;")
                            div(@click="switchQuarterlyOrYearly()" id="switch-block" style="position:relative; border:0px solid;")
                                img(v-if="quarterlyOrYearly === 'quarterly'" src="./assets/switch-on.svg" style="position:absolute; height:30px;")
                                img(v-else src="./assets/switch-off.svg" style="position:absolute; height:30px;")

        ChartWidget(v-if="reload && fundamentalData !== null" :chartData="fundamentalData.ratios" :quarterOrYear="quarterlyOrYearly" :mobileOrDesktopCheck="mobileOrDesktopCheck" :color="color")

        //- modal
        div(v-if="showModal")
            div(@click="showModal = false" id="myModal" ref="myModal" class="modal")
            div(class="modal-content" ref="myContent" style="font-family:'DM Serif Text';")
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
// import './main.css';

export default {
    name: "App",
    props: {
        isin: String,
        color: String
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
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');

        head.appendChild(style);

        style.appendChild(document.createTextNode(`
            @import url('https://fonts.googleapis.com/css?family=DM Serif Text');
            @import url('https://fonts.googleapis.com/css?family=Noto Sans');
            
            body {
                margin: 0;
                padding: 0;
            };
        `));

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

.widget-container {
    font-family: 'Noto Sans';
    font-size: 12px;
}

.headline {
    font-family: 'DM Serif Text';
    font-size: 20px;
    color: #005AA0;
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
    background-color: #fefefe;
    border: 1px solid #005AA0;
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
