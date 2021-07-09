import CanvasJSReact from './canvasjs.react.js';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Line(props) {

    const options = {
        exportEnabled: true,
        animationEnabled: true,
        animationDuration: 2000,
        backgroundColor: 'white',
        title: {
            text: props.title ? props.title : `Monthly ${props.extraTitle}`,
            fontColor: 'black',
        },
        axisX: {
            labelFontColor: 'black',
        },
        axisY: {
            labelFontColor: 'black',
        },
        data:[{
            type: "area",
            dataPoints: props.data,
            fontColor: 'black',
        }]
    };

    return(
        <CanvasJSChart options={options} />
    )
}

export default Line;
