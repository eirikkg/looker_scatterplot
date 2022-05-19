var chart;

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}


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
      values: [{ Large: "large" }, { Small: "small" }],
      display: "radio",
      default: "large",
    },
  },
  // Set up the initial state of the visualization
  create: function (element, config) {
    console.log("START");
    element.innerHTML = `
      <style>
        #container{
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

    `;



    // initiate drawing the chart

    console.log(config);
    console.log(element);

    // Insert a <style> tag with some styles we'll use later.

    // Create a container element to let us center the text.
    //var container = element.appendChild(document.createElement("div"));
    //container.className = "hello-world-vis";

    // Create an element to contain the text.
    //this._textElement = container.appendChild(document.createElement("div"));
  },
  // Render in response to the data or settings changing
  updateAsync: function (data, element, config, queryResponse, details, done) {
    console.log("UPDATE");
    console.log("DETAILS");
    console.log(details);
    console.log("config");
    console.log(config);

  try{
    document.getElementById("scatter_container").remove();
  }catch (error) {
  console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}



    var container = element.appendChild(document.createElement("div"));
    container.setAttribute("id", "scatter_container");


    chart = anychart.scatter();
    chart.container("scatter_container");


    options = {};
    // Create an option for each measure in your query

    var dimentions = [];
    queryResponse.fields.measure_like.forEach(function (field) {
      console.log(field);
      var obj = {};
      obj[field.label_short] = field.name;
      dimentions.push(obj);
    });

    queryResponse.fields.dimension_like.forEach(function (field) {
      console.log(field);
      var obj = {};
      obj[field.label_short] = field.name;
      dimentions.push(obj);

      /*
      id = "color_" + field.name;
      options[id] = {
        label: field.label_short + " Color",
        default: "#8B7DA8",
        section: "Style",
        type: "string",
        display: "color",
      };*/
    });

    console.log("dimentions");
    console.log(dimentions);

    options["y_axis"] = {
      label: "Y Axis ",
      section: "Series",
      type: "string",
      display: "select",
      values: dimentions,
    };

    options["x_axis"] = {
      label: "X Axis ",
      section: "Series",
      type: "string",
      display: "select",
      values: dimentions,
    };
    this.trigger("registerOptions", options); // register options with parent page to update visConfig

    // Clear any errors from previous updates
    this.clearErrors();

    // Throw some errors and exit if the shape of the data isn't what this chart needs
    if (queryResponse.fields.dimensions.length === 0) {
      this.addError({
        title: "No Dimensions",
        message: "This chart requires dimensions.",
      });
      return;
    }
    console.log(queryResponse);
    console.log(data);

    // Grab the first cell of the data
    var firstRow = data[0];
    var firstCell = firstRow[queryResponse.fields.dimensions[0].name];

    // Insert the data into the page
    //this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell + " Hei");


console.log("queryResponse");
    console.log(queryResponse);
    data_3 = [];
    data.forEach((row) => {
      data_3.push({
        x: row[config.x_axis].value,
        y: row[config.y_axis].value,
      });
    });

    console.log(data_3);
    // create a chart

    // create the first series (marker) and set the data
    //var series1 = chart.bubble(data_3);
    var series1 = chart.marker(data_3);

    // create the second series (line) and set the data
    //var series2 = chart.line(data_2);
    //var series1 = chart.bubble(data_3);

    chart.xAxis().title(queryResponse.fields.dimensions[0].name);
    chart.yAxis().title(queryResponse.fields.dimensions[1].name);
    chart.draw();

    // set the container id

    // Set the size to the user-selected size
    if (config.font_size == "small") {
      //this._textElement.className = "hello-world-text-small";
    } else {
      //this._textElement.className = "hello-world-text-large";
    }

    // We are done rendering! Let Looker know.
    done();
  },
});
