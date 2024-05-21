<template lang="pug">
    div(:class="mobileOrDesktopCheck ? 'container-mobile' : 'container-regular'" style="border:0px solid;")
        template(v-for="(item, i) in chartData[quarterOrYear]")
            div(style="border:0px solid;")
                ChartItem(
                    :canvasId="`canvas${i}`"
                    :chartTextFont="chartTextFont"
                    :chartTextColor="chartTextColor"
                    :chartTextLineHeight="chartTextLineHeight"
                    :chartValueFont="chartValueFont"
                    :chartValueColor="chartValueColor"
                    :infoIconColor="infoIconColor"
                    :data="item"
                    :type="i"
                    :chartBarColor="chartBarColor"
                    :infoTexts="infoTexts"
                )
</template>

<script>
import ChartItem from "./chart-item.ce.vue";

export default {
    name: "chart-widget",
    props: {
        chartData: Object,
        quarterOrYear: String,
        mobileOrDesktopCheck: Boolean,
        chartBarColor: String,
        chartTextFont: String,
        chartTextColor: String,
        chartTextLineHeight: String,
        chartValueFont: String,
        chartValueColor: String,
        infoIconColor: String,
    },
    components: {
        ChartItem,
    },
    data() {
        return {
            infoTexts: [
                {
                    eps: '<h1>Info text eps</h1>'
                },
                {
                    pe: '<h1>Info text pe</h1>'
                },
                {
                    ps: '<h1>Info text ps</h1>'
                },
                {
                    sps: '<h1>Info text sps</h1>'
                }
            ],
            testus: {
    "quarterly": {
        "eps": [
            {
                "period": "2022-Q2",
                "value": "2.000"
            },
            {
                "period": "2022-Q3",
                "value": "2.000"
            },
            {
                "period": "2022-Q4",
                "value": "2.000"
            },
            {
                "period": "2023-Q1",
                "value": "2.000"
            },
            {
                "period": "2023-Q2",
                "value": "2.000"
            }
        ],
        "sps": [
            {
                "period": "2022-Q2",
                "value": "2.500"
            },
            {
                "period": "2022-Q3",
                "value": "2.500"
            },
            {
                "period": "2022-Q4",
                "value": "2.500"
            },
            {
                "period": "2023-Q1",
                "value": "2.500"
            },
            {
                "period": "2023-Q2",
                "value": "2.500"
            }
        ],
        "pe": [
            {
                "period": "2022-Q2",
                "value": "15.990"
            },
            {
                "period": "2022-Q3",
                "value": "15.990"
            },
            {
                "period": "2022-Q4",
                "value": "15.990"
            },
            {
                "period": "2023-Q1",
                "value": "15.990"
            },
            {
                "period": "2023-Q2",
                "value": "15.990"
            }
        ],
        "ps": [
            {
                "period": "2022-Q2",
                "value": "15.4"
            },
            {
                "period": "2022-Q3",
                "value": "20.990"
            },
            {
                "period": "2022-Q4",
                "value": "12.990"
            },
            {
                "period": "2023-Q1",
                "value": "17"
            },
            {
                "period": "2023-Q2",
                "value": "9.00"
            }
        ]
    },
    "ttm": {
        "eps": [
            {
                "period": "2020",
                "value": "8.000"
            },
            {
                "period": "2020-Q4",
                "value": "8.000"
            },
            {
                "period": "2021-Q3",
                "value": "8.000"
            },
            {
                "period": "2022-Q2",
                "value": "8.000"
            },
            {
                "period": "2023-Q2",
                "value": "8.000"
            }
        ],
        "sps": [
            {
                "period": "2020",
                "value": "10.000"
            },
            {
                "period": "2020-Q4",
                "value": "10.000"
            },
            {
                "period": "2021-Q3",
                "value": "10.000"
            },
            {
                "period": "2022-Q2",
                "value": "10.000"
            },
            {
                "period": "2023-Q2",
                "value": "10.000"
            }
        ],
        "pe": [
            {
                "period": "2020",
                "value": "15.990"
            },
            {
                "period": "2020-Q4",
                "value": "15.990"
            },
            {
                "period": "2021-Q3",
                "value": "15.990"
            },
            {
                "period": "2022-Q2",
                "value": "15.990"
            },
            {
                "period": "2023-Q2",
                "value": "15.990"
            }
        ],
        "ps": [
            {
                "period": "2020",
                "value": "20.990"
            },
            {
                "period": "2020-Q4",
                "value": "20.990"
            },
            {
                "period": "2021-Q3",
                "value": "20.990"
            },
            {
                "period": "2022-Q2",
                "value": "20.990"
            },
            {
                "period": "2023-Q2",
                "value": "20.990"
            }
        ]
    }
}
        };
    },
}
</script>

<style scoped>
/* .headline {
    font-family: 'DM Serif Text';
    font-size: 20px;
    color: #005AA0;
}

.value-block {
    font-family: 'Helvetica Neue';
    font-size: 12px;
    font-weight: bold;
} */
</style>
