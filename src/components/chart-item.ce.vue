<template lang="pug">
    div(style="border:0px solid;")
        div(:style="{ fontFamily: chartTextFont, color: chartTextColor, lineHeight: chartTextLineHeight, fontSize: '12px' }" style="position:relative; width:fit-content; margin-left:10px; border:0px solid;")
            span(v-if="type === 'sps'") Vinst/aktie
            span(v-if="type === 'eps'") Omsättning/aktie
            span(v-if="type === 'pe'") P/E-tal
            span(v-if="type === 'ps'") P/S-tal
            svg(@click="openModal(infoText)" width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:absolute; top:2px; right:-15px;")
                path(d="M5.17413 4.6C4.99813 4.6 4.84879 4.544 4.72613 4.432C4.60346 4.32 4.54213 4.17867 4.54213 4.008C4.54213 3.832 4.60346 3.69067 4.72613 3.584C4.84879 3.472 4.99813 3.416 5.17413 3.416C5.35013 3.416 5.49946 3.472 5.62213 3.584C5.74479 3.69067 5.80613 3.832 5.80613 4.008C5.80613 4.17867 5.74479 4.32 5.62213 4.432C5.49946 4.544 5.35013 4.6 5.17413 4.6ZM4.25413 9V8.848L4.37413 8.816C4.48079 8.784 4.55279 8.736 4.59013 8.672C4.62746 8.608 4.64879 8.52267 4.65413 8.416V6.944C4.65413 6.77867 4.65413 6.62667 4.65413 6.488C4.65413 6.344 4.65146 6.19733 4.64613 6.048C4.64613 5.94133 4.62479 5.85867 4.58213 5.8C4.54479 5.736 4.47279 5.69333 4.36613 5.672L4.25413 5.648V5.504L5.65413 5.04L5.75013 5.128L5.72613 6.264V8.424C5.72613 8.53067 5.74479 8.616 5.78213 8.68C5.82479 8.744 5.89679 8.792 5.99813 8.824L6.08613 8.848V9H4.25413Z" :fill="infoIconColor")
                circle(cx="5.23077" cy="6.0003" r="4.73077" :stroke="infoIconColor")
            //- img(@click="openModal(infoText)" src="./../assets/info-icon.svg" style="position:absolute; top:2px; right:-15px;")
        div(:style="{ fontFamily: chartValueFont, color: chartValueColor, fontSize: '12px', fontWeight: 'bold' }" style="margin-left:10px;") {{ latestValue }} SEK
        canvas(:id="canvasId" :ref="canvasId" width="100%" height="100%" style="border:0px solid black;")
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    name: "chart-item",
    props: {
        infoTexts: Array,
        canvasId: String,
        data: Object,
        type: String,
        chartBarColor: String,
        chartTextFont: String,
        chartTextColor: String,
        chartTextLineHeight: String,
        chartValueFont: String,
        chartValueColor: String,
        infoIconColor: String,
    },
    mounted() {
        console.log(JSON.parse(JSON.stringify(this.infoText)));
        // window.addEventListener("click", this.closeModal);

        console.log('chartBarColor', JSON.parse(this.chartBarColor));
        console.log('canvasId', this.canvasId);
        console.log(this.type);
        console.log(JSON.parse(JSON.stringify(this.data)));

        const labels = this.data.map((d) => d.period);
        const data = this.data.map((d) => d.value);

        console.log(labels);
        console.log(data);
        // console.log(this.$refs[this.canvasId]);

        const chartElement = this.$refs[this.canvasId];//document.getElementById(this.canvasId);

        // chartElement.style.chartBarColor = this.chartBarColor;

        console.log(chartElement);

        new Chart(chartElement, {
            type: 'bar',
            data: {
                labels: labels,//['Q1', 'Q2', 'Q3', 'Q4', 'kul'],
                datasets: [{
                    barPercentage: 0.8,
                    // categoryPercentage: 1,
                    // label: '# of Votes',
                    // barPercentage: 0.3,
                    // barThickness: 6,
                    data: data,//[12, 19, 3, 5, 2],
                    fill: true,
                    // maxBarThickness: 10,
                    // minBarLength: 2,
                    // borderWidth: 1,
                    backgroundColor: JSON.parse(this.chartBarColor),//[this.color, this.color, this.color, this.color, this.color],
                }]
            },
            options: {
                // scaleBeginAtZero: true,
                // layout: {
                //     padding: {
                //         left: 10,
                //         right: 10,
                //         top: 10,
                //         bottom: 10
                //     }
                // },
                scales: {
                    // yAxes: [{
                    //     display: false
                    // }],
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            display: false
                        },
                        border: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 'x',
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            display: false
                        },
                        border: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                responsive: true,
                // maintainAspectRatio: false
            }
        });
    },
    computed: {
        infoText() {
            return this.infoTexts.find((it) => it[this.type])[this.type];
        },
        latestValue() {
            return this.data[this.data.length - 1].value;
        },
    },
    methods: {
        // closeModal(event) {
        //     console.log('--------------');
        //     console.log(event.target);
        //     console.log(this.$.parent.parent.refs.myModal);
        //     console.log(this.$.parent.parent.data.mouseOverCheck);

        //     const modal = this.$.parent.parent.refs.myModal;

        //     if(!this.$.parent.parent.data.mouseOverCheck) {
        //         modal.style.display = "none";
        //     }
        // },
        openModal(infoText) {
            this.$.parent.parent.data.infoText = infoText;
            this.$.parent.parent.data.showModal = true;
        },
    },
}
</script>

<style scoped>

</style>
