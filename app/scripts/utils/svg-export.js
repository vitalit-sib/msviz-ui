'use strict';
angular.module('svg-export', [])
  .service('svgExport', function () {

    var SvgExport = function(){
      return this;
    };

    /**
     * Give back the string representation of a SVG node together with the corresponding CSS styles.
     *
     * @param svgNode
     * @returns {string}
     */
    SvgExport.prototype.getSvgString =  function(svgNode, width, height) {

      var getCSSStyles = function( parentElement ) {

        var contains = function(str, subStr) {
          return str.indexOf( subStr ) === -1 ? false : true;
        };

        var containsArray = function(str, arr){
          if(!str){ return false; }
          return (_.find(arr, function(subStr){ return contains(str, subStr); })) ? true : false;
        };

        var selectorTextArr = [];

        // Add Parent element Id and Classes to the list
        selectorTextArr.push( '#'+parentElement.id );
        for (var c = 0; c < parentElement.classList.length; c++) {
          if (!contains('.' + parentElement.classList[c], selectorTextArr)) {
            selectorTextArr.push('.' + parentElement.classList[c]);
          }
        }

        // Add Children element Ids and Classes to the list
        var nodes = parentElement.getElementsByTagName('*');
        for (var i = 0; i < nodes.length; i++) {
          var id = nodes[i].id;
          if ( !contains('#'+id, selectorTextArr) ){
            selectorTextArr.push( '#'+id );
          }

          var classes = nodes[i].classList;
          for (var cl = 0; cl < classes.length; cl++) {
            if (!contains('.' + classes[cl], selectorTextArr)) {
              selectorTextArr.push('.' + classes[cl]);
            }
          }
        }

        // Extract CSS Rules
        var extractedCSSText = '';
        for (var k = 0; k < document.styleSheets.length; k++) {
          var cssRules = document.styleSheets[k].cssRules;
          for (var r = 0; r < cssRules.length; r++) {
            if ( containsArray( cssRules[r].selectorText, selectorTextArr ) ){
              extractedCSSText += cssRules[r].cssText;
            }

          }
        }

        return extractedCSSText;

      };

      var appendCSS = function( cssText, element ) {
        var styleElement = document.createElement('style');
        styleElement.setAttribute('type','text/css');
        styleElement.innerHTML = cssText;
        var refNode = element.hasChildNodes() ? element.children[0] : null;
        element.insertBefore( styleElement, refNode );
      };


      svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
      var cssStyleText = getCSSStyles( svgNode );
      appendCSS( cssStyleText, svgNode );

      var serializer = new XMLSerializer();
      var svgString = serializer.serializeToString(svgNode);
      svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
      svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

      // adapt the size
      svgString = svgString.replace(/width="[%|\d]+"/, 'width="' + width + '"'); // the width
      svgString = svgString.replace(/height="[%|\d]+"/, 'height="' + height + '"'); // the height

      return svgString;

    };

    /**
     * convert a SVG string to a PNG blob
     *
     * @param svgString
     * @param width
     * @param height
     * @param callback
     */
    SvgExport.prototype.svgString2Png = function( svgString, width, height, callback ) {
      var imgsrc = 'data:image/svg+xml;base64,'+ btoa( unescape( encodeURIComponent( svgString ) ) ); // Convert SVG string to dataurl

      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;

      var image = new Image();
      image.onload = function() {
        context.clearRect ( 0, 0, width, height );
        context.drawImage(image, 0, 0, width, height);

        canvas.toBlob( function(blob) {
          var filesize = Math.round( blob.length/1024 ) + ' KB';
          if ( callback ){
            callback( blob, filesize );
          }
        });

      };

      image.src = imgsrc;
    };


    return new SvgExport();
  })
;
