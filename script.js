
chart;
looker.plugins.visualizations.add({
  // Id and Label are legacy properties that no longer have any function besides documenting
  // what the visualization used to have. The properties are now set via the manifest
  // form within the admin/visualizations page of Looker
  id: "amedia_scatter_id",
  label: "Amedia Distribusjon Scatterplot",
  options: {
    font_size: {
      type: "string",
      label: "Font Size",
      values: [
        {"Large": "large"},
        {"Small": "small"}
      ],
      display: "radio",
      default: "large"
    }
  },
  // Set up the initial state of the visualization
  create: function(element, config) {

    cahrt = anychart.scatter();
    chart.container("container");

  // initiate drawing the chart



    console.log(config);
    console.log(element);

    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = `
      <style>
        .hello-world-vis {
          /* Vertical centering */
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        .hello-world-text-large {
          font-size: 72px;
        }
        .hello-world-text-small {
          font-size: 18px;
        }
      </style>
      <div id="container" style="width: 100%; height: 500px"></div>

    `;

    // Create a container element to let us center the text.
    var container = element.appendChild(document.createElement("div"));
    container.className = "hello-world-vis";

    // Create an element to contain the text.
    this._textElement = container.appendChild(document.createElement("div"));

  },
  // Render in response to the data or settings changing
  updateAsync: function(data, element, config, queryResponse, details, done) {

    // Clear any errors from previous updates
    this.clearErrors();

    // Throw some errors and exit if the shape of the data isn't what this chart needs
    if (queryResponse.fields.dimensions.length === 0) {
      this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
      return;
    }
    console.log(queryResponse);
    console.log(data);

    // Grab the first cell of the data
    var firstRow = data[0];
    var firstCell = firstRow[queryResponse.fields.dimensions[0].name];

    // Insert the data into the page
    this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell + " Hei");

    data_3 = [];
  data.forEach((row)=>{
    data_3.push({x: row[queryResponse.fields.dimensions[0].name].value , y:row[queryResponse.fields.dimensions[1].name].value});
  });

  console.log(data_3);



    var data_1 = [
      {x: 0.6, value: 22},
      {x: 1.7, value: 55},
      {x: 1.7, value: 80},
      {x: 2.3, value: 50},
      {x: 3.5, value: 80},
      {x: 3.9, value: 74},
      {x: 4, value: 68},
      {x: 4, value: 76},
      {x: 4.1, value: 84},
      {x: 4.7, value: 93}
    ];

    // create data for the second series
    var data_2 = [
      {x: 0.5, value: 17.5},
      {x: 4.75, value: 100}
    ];

  // create a chart


  // create the first series (marker) and set the data
  var series1 = chart.bubble(data_3);

  // create the second series (line) and set the data
  //var series2 = chart.line(data_2);
  //var series1 = chart.bubble(data_3);
  chart.xAxis().title(queryResponse.fields.dimensions[0].name);
  chart.yAxis().title(queryResponse.fields.dimensions[1].name);
  chart.draw();

  // set the container id



    // Set the size to the user-selected size
    if (config.font_size == "small") {
      this._textElement.className = "hello-world-text-small";
    } else {
      this._textElement.className = "hello-world-text-large";
    }

    // We are done rendering! Let Looker know.
    done()
  }
});
