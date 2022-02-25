const Chart = require('chart.js');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const Sprint = require('../models/sprint');
const Group = require("../models/group");
const LabelFormat = require("../models/labelformat");


const options = {
    scales: {
        r: {
            angleLines: {
                display: false,
            },
            Min: 0,
            Max: 5,
            beginAtZero: true,
            ticks: {
                stepSize: 1,
            },
        }
    }
};

async function chartFromGroup(group) {
    if (!group instanceof (Group))
        throw "group must be a group"
    else {
        const labelformatid = group.labelFormat;
        const lf = await LabelFormat.findById(labelformatid);
        if (!lf) throw "Could not find asked labelformat";
        else {
            const config = {
                type: 'radar',
                data: await setupGraphData(group.sprints, lf),
                options: options,
            };
            const myChart = new ChartJSNodeCanvas({ width: 500, height: 500 });
            const img = await myChart.renderToBuffer(config);
            return img;
        };
    }
}


async function setupGraphData(sprintsArray, labelFormat) {
    if (Array.isArray(sprintsArray) && sprintsArray.length > 0 && labelFormat) {
        let datasets = [];
        await Promise.all(sprintsArray.map(async (sprint, index) => {
            let sprintMark = await Sprint.findById(sprint);
            let rgbaColor = getRandomRGBAColorString();
            let dataPoint = {
                label: `Sprint ${index}`,
                backgroundColor: "rgba(0, 0, 0, 0)", // transparent
                borderColor: rgbaColor,
                pointBackgroundColor: rgbaColor,
                data: sprintMark.ratings,
            };
            datasets.push(dataPoint);
        }))
        datasets.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
        let labels = [];
        labelFormat.labels.forEach(element => {
            labels.push(element.label);
        });
        let data = {
            labels: labels,
            datasets: datasets
        };
        return data;
    }
}

/*fonction qui donne  des couleurs aléatoire, utilisé notamment dans graph  */
function getRandomRGBAColorString(opacity) {
    function getRandomValueUpTo255() {
        return Math.round(Math.random() * 255);
    }
    opacity = opacity ?? 255;
    return `rgba(${getRandomValueUpTo255()},${getRandomValueUpTo255()},${getRandomValueUpTo255()},${opacity})`;
}

module.exports = { chartFromGroup };