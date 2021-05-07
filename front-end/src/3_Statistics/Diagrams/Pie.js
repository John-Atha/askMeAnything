import CanvasJSReact from './canvasjs.react.js';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Pie(props) {

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: `Daily ${props.extraTitle}`,
            fontColor: "black",
        },
        legend: {
            labelFontColor: "black",
        },
        data:[{
            type: "doughnut",
            indexLabel: "{label}: {y}%",
            startAngle: -90,
            dataPoints: props.data,
            indexLabelFontColor: 'black',
        }]
    };
    return(
        <CanvasJSChart options={options} />
    )
}

export default Pie;
