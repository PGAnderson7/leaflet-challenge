// Store API link
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

function markerSize(mag) {
    return mag * 30000;
}

function markerColor(mag) {
    if (mag <= 1) {
        return "green-yellow";
    } else if (mag <= 2) {
        return "yellow";
    } else if (mag <= 3) {
        return "yellow-orange";
    } else if (mag <= 4) {
        return "#ffd700";
    } else if (mag <= 5) {
        return "orange";
    } else {
        return "red";
    };
}

// Perform a GET request ti the query URL
d3.json(link, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData){

    var earthquakes = L.geoJSON(earthquakeData, {
        // define a function to run for each feature in the features array
        // give each feature a popup describing the earthquake's place and time
    onEachFeature : function (feature, layer) {

        layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "<p> Magnitude: " + feature.properties.mag + "</p>")
        },      pointToLayer: function (feature, latlng) {
            return new L.circle(latlng,
              {radius: markerSize(feature.properties.mag),
              fillColor: markerColor(feature.properties.mag),
              fillOpacity: 1,
              stroke: false,
        })
    }
    });

    // send earthquakes layer to createMap function
    createMap(earthquakes);
}
