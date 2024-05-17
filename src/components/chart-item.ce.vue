<template lang="pug">
    div(style="border:0px solid;")
        div(style="position:relative; width:fit-content; font-family:'DM Serif Text'; font-size:12px; margin-left:10px; border:0px solid;")
            span(v-if="type === 'sps'") Vinst/aktie
            span(v-if="type === 'eps'") Omsättning/aktie
            span(v-if="type === 'pe'") P/E-tal
            span(v-if="type === 'ps'") P/S-tal
            img(@click="openModal(infoText)" src="./../assets/info-icon.svg" class="myInfo" style="position:absolute; top:2px; right:-15px;")
        div(style="font-family:'Helvetica Neue'; font-size:12px; font-weight:bold; margin-left:10px;") 2,35 SEK
        canvas(:id="canvasId" :ref="canvasId" width="100%" height="100%" style="border:0px solid black;")
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    name: "ChartItem",
    props: {
        infoTexts: Array,
        canvasId: String,
        data: Object,
        type: String,
        color: String,
    },
    mounted() {
        console.log(JSON.parse(JSON.stringify(this.infoText)));
        // window.addEventListener("click", this.closeModal);

        console.log('color', JSON.parse(this.color));
        console.log('canvasId', this.canvasId);
        console.log(this.type);
        console.log(JSON.parse(JSON.stringify(this.data)));

        const labels = this.data.map((d) => d.period);
        const data = this.data.map((d) => d.value);

        console.log(labels);
        console.log(data);
        // console.log(this.$refs[this.canvasId]);

        const chartElement = this.$refs[this.canvasId];//document.getElementById(this.canvasId);

        // chartElement.style.color = this.color;

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
                    backgroundColor: JSON.parse(this.color),//[this.color, this.color, this.color, this.color, this.color],
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
