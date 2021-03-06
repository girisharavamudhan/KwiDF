/*
 Copyright (c) 2016 TIBCO Software Inc

 THIS SOFTWARE IS PROVIDED BY TIBCO SOFTWARE INC. ''AS IS'' AND ANY EXPRESS OR
 IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
 SHALL TIBCO SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, 
 EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, 
 OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

//////////////////////////////////////////////////////////////////////////////
// #region Drawing Code
//

//
// Main Drawing Method
//


var chartVal;
var colName;
var configData;
var dataLabel;
var assetArray = [];
var markedAssets;
function renderCore(sfdata) {
    configData = sfdata.config;
    var actualData = sfdata.data;
    colName = sfdata.columns[2];
    data = [];
    targetData = [];
    assetArray = [];
    var totalCount = 0;
    indexdata = [];
    indicesarray = [];
    indicesarrayobject = [];
    markedAssets = [];
    var seriesData = [];
    var DateValue = new Date(sfdata.config.DateFilter);
    var DateValueFormatted = DateValue.valueOf();
    var nextDate = new Date(sfdata.config.DateFilter);
    var numberOfDaysToAdd = 1;
    nextDate.setDate(nextDate.getDate() + numberOfDaysToAdd);
    var nextDateValueFormatted = nextDate.valueOf();
    //   log("NextDate - " + nextDate);
    //var actualData = sfdata.data;

    //   log("actualDataBefore" + actualData.length);
    actualData = actualData.filter(function (el) {
        DateValue = new Date(sfdata.config.DateFilter);
        DateValueFormatted = DateValue.valueOf();
        var formatedDate = el.items[5].replace("/Date(", "").replace(")/", "").valueOf();
        if (formatedDate >= DateValueFormatted && formatedDate < nextDate) {

            return (el);
        }

    });



    // Extract the config params section
    var config = sfdata.config;
    //categoryArray=config.title;
    //var gaugesize = undefined != config.gaugesize ? config.gaugesize : 350;

    var idx;

    var chartObj = $("#js_chart");

    for (var j = 0; j < config.noOfGauges; j++) {
        var wrapperObj = 'wrapper' + j;
        if ($('#' + wrapperObj, chartObj).length == 0) {
            $(chartObj).append("<div id=" + wrapperObj + " class='wrapper' />");
            $('#' + wrapperObj, chartObj).height(160);


        }
        var Title = config.title[j];
        //var scriptName =config.Script;

        assetArray = [];
        seriesData = [];
        markedAssets = [];
        for (i = 0; i < actualData.length; i++) {
            if (sfdata.config.FilteredCategory != undefined && sfdata.config.FilteredCategory != "") {
                if (sfdata.config.FilteredCategory == actualData[i].items[0]) {
                    assetArray.push([actualData[i].items[1], actualData[i].items[j + 2]]);
                    seriesData.push([actualData[i].items[1], actualData[i].items[j + 2]]);
                    //totalCount = actualData[i].items[2];
                    indexdata.push(actualData[i].hints.index);
                    indicesobject = {};
                    indicesobject.index = actualData[i].hints.index;
                    indicesobject.Asset = actualData[i].items[1];
                    indicesobject.marked = actualData[i].hints.marked != undefined ? actualData[i].hints.marked : false;
                    indicesarrayobject.push(indicesobject);
                    targetData.push(actualData[i].items[3]);
                    if (actualData[i].hints.marked != undefined && actualData[i].hints.marked) {
                        markedAssets.push(actualData[i].items[1]);
                    }
                }
            }
            else {
                assetArray.push([actualData[i].items[1], actualData[i].items[j + 2]]);
                seriesData.push([actualData[i].items[1], actualData[i].items[j + 2]]);
                //totalCount = actualData[i].items[2];

                //log(actualData[i].hints.marked);
                if (actualData[i].hints.marked != undefined && actualData[i].hints.marked) {
                    markedAssets.push(actualData[i].items[1]);
                }

                indexdata.push(actualData[i].hints.index);
            }
            //totalCount += totalCount;
        }

        createCustomControl(wrapperObj, Title, seriesData)

    }
    $(".highcharts-container ", chartObj).after("<div class='overlay'/>");

}

function createCustomControl(renderObject, Title, data) {

    //data =  assetArray;
    Highcharts.setOptions({
        colors: ['#ff9517', '#ff4949', '#fffc00', '#26a2ed', '#429e2f']
    });
    //debugger;
    var options = {
        chart: {
            renderTo: renderObject,
            type: 'pie',
            backgroundColor: 'transparent',
            options3d: {
                enabled: true,
                alpha: 35
            },
            events: {
                click: function (event) {
                    //log("Chart  Clicked");

                    log('Chart Click Event 1');
                    log("assetArray Length - " + assetArray.length);
                    for (var k = 0; k < assetArray.length; k++) {
                        //log("assetArray" + data[k][0]);
                        //var x= 
                        markedAssets.push(assetArray[k][0]);
                        //log(this.x + "," +  this.y + "," + this.name);
                        if (assetArray[k][0] == this.name) {
                            //log("series matched" + this.name);
                            //log("indexdata" + indexdata.length);
                            indicesarray.push(indexdata[k]);
                            //log("index"+ indicesarray.length);
                        }
                    }
                    var markData = {};
                    //log("markIndices series click" + markData);
                    markData.markMode = "Replace";
                    markData.indexSet = indicesarray;
                    //if ( typeof(JSViz) != 'undefined' )
                    //{
                    markIndices(markData);
                    //} 

                }
            }
        },
        title: {
            text: Title,
            style: { color: '#fff', fontSize: '14px' }
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            pie: {
                innerSize: 40,
                depth: 20,
                dataLabels: {
                    enabled: true,
                    color: '#fff',
                    style: { fontFamily: 'arial', fontSize: '13px', fontWeight: 'normal', }
                }
            }
        },
        series: [{

            name: Title,
            data: data,
            point: {
                events: {
                    click: function ()
                        //{
                        //  runScript("OS1-Gauge");
                        //}
                    {
                        //log("Chart Series Clicked");

                        //log("assetArray" + assetArray.length);
                        alert('Series Click Event aaaa - ' + this.name);
                        alert('Asset Array - ' + assetArray[0][0]);
                        markedAssets = [];
                        markedAssets.push(this.name);
                        for (var k = 0; k < assetArray.length; k++) {
                            //log("assetArray" + assetArray[k][0]);
                            //var x= 
                            alert('Series Click Event aaaa - ' + assetArray[0]);
                            //log(this.x + "," +  this.y + "," + this.name);
                            if (assetArray[k][0] == this.name) {
                                //log("series matched" + this.name);
                                //log("indexdata" + indexdata.length);
                                indicesarray.push(indexdata[k]);
                                //log("index"+ indicesarray.length);
                            }
                        }
                        var markData = {};
                        //log("markIndices series click" + markData);
                        markData.markMode = "Replace";
                        markData.indexSet = indicesarray;
                        //if ( typeof(JSViz) != 'undefined' )
                        //{
                        markIndices(markData);
                        //} 
                    }


                }
            }

        }],
        exporting: { enabled: false },



    };

    // var chartVal = Highcharts.chart('js_chart', options);
    var chartVal = new Highcharts.Chart(options);
    log("MarkedAssets Length-" + markedAssets.length);
    if (markedAssets != undefined && markedAssets.length > 0) {
        for (j = 0; j < markedAssets.length; j++) {
            for (i = 0; i < chartVal.series[0].data.length; i++) {
                //color = convertHex(chartVal.series[0].data[i].color, 100);
                //chartVal.series[0].data[i].update({ color: color });
                if (chartVal.series[0].data[i].name == markedAssets[j]) {
                    if (chartVal.series[0].data[i].color.indexOf("#") != -1) {
                        color = convertHex(chartVal.series[0].data[i].color, 100);;

                        //log("color after marking" + color)
                        chartVal.series[0].data[i].update({ color: color });
                    }

                    else {
                        if (chartVal.series[0].data[i].color.indexOf("rgba") != -1)

                            color = chartVal.series[0].data[i].color;
                        color = color.replace(/[^,]+(?=\))/, '1');
                        chartVal.series[0].data[i].update({ color: color });
                    }
                }
                else
                {
                    if (chartVal.series[0].data[i].color.indexOf("#") != -1) {
                        color = convertHex(chartVal.series[0].data[i].color, 50);
                        //log("ColorCode:"+color);
                        chartVal.series[0].data[i].update({ color: color });
                    }
                    else {
                        if (chartVal.series[0].data[i].color.indexOf("rgba") != -1)

                            color = chartVal.series[0].data[i].color;
                        color = color.replace(/[^,]+(?=\))/, '0.9');
                        chartVal.series[0].data[i].update({ color: color });
                    }
                }
            }

        }


        /*
        for (i = 0; i < chartVal.series[0].data.length; i++) {
            //log(chartVal.series[0].data.length);
            //log(Title);

            var marked = false;
            var flag = true;
            for (j = 0; j < markedAssets.length; j++) {             
                if (chartVal.series[0].data[i].name == markedAssets[j]) {                   
                    marked = true;
                    var color = "";
                    if (chartVal.series[0].data[i].color.indexOf("#") != -1) {
                        color = convertHex(chartVal.series[0].data[i].color, 100);;

                        //log("color after marking" + color)
                        chartVal.series[0].data[i].update({ color: color });
                    }

                    else {
                        if (chartVal.series[0].data[i].color.indexOf("rgba") != -1)

                            color = chartVal.series[0].data[i].color;
                        color = color.replace(/[^,]+(?=\))/, '1');
                        chartVal.series[0].data[i].update({ color: color });
                    }





                    debugger;
                }


                else if (!marked) {
                    debugger;
                    
                    if (chartVal.series[0].data[i].color.indexOf("#") != -1) {
                        color = convertHex(chartVal.series[0].data[i].color, 50);
                        //log("ColorCode:"+color);
                        chartVal.series[0].data[i].update({ color: color });
                    }
                    else {
                        if (chartVal.series[0].data[i].color.indexOf("rgba") != -1)

                            color = chartVal.series[0].data[i].color;
                        color = color.replace(/[^,]+(?=\))/, '0.9');
                        chartVal.series[0].data[i].update({ color: color });
                    }                    
                }
            }
        }*/
    }
    else {
        for (i = 0; i < chartVal.series[0].data.length; i++) {
            color = convertHex(chartVal.series[0].data[i].color, 100);
            chartVal.series[0].data[i].update({ color: color });
        }
    }

}

//wait(sfdata.wait, sfdata.static);





// #endregion Drawing Code
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// #region Marking Code
//

//
// This method receives the marking mode and marking rectangle coordinates
// on mouse-up when drawing a marking rectangle
//
function markModel(markMode, rectangle) {
}

// 
// #endregion Marking Code
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// #region Resizing Code
//

var resizing = false;

window.onresize = function (event) {
    // No resizing logic for now
    resizing = true;
    if ($("#js_chart")) {
    }
    resizing = false;
}

function convertHex(hex, opacity) {
    hex = hex.replace('#', '');
    //log("hex" + hex);
    r = parseInt(hex.substring(0, 2), 16);
    //log("R" + r);
    g = parseInt(hex.substring(2, 4), 16);
    //log("G" + g);
    b = parseInt(hex.substring(4, 6), 16);
    //log("B" + b);


    result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    return result;
}

// 
// #endregion Resizing Code
//////////////////////////////////////////////////////////////////////////////
