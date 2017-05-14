(function () {
    function seekBar($document) {
        /**
        * @function calculatePercent
        * @desc Calculates where on the seekbar a user has clicked
        * @param {Object} seekBar event
        * @returns {percentage}
        */
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        }
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { },
            link: function(scope, element, attributes) {
                /**
                * @function value
                * @desc Amount of time elapsed in song or volume level
                */                
                scope.value = 0;
                
                /**
                * @function max
                * @desc Duration of song or max volume
                */                
                scope.max = 100;
                
                /**
                * @desc Makes element that matches the directive a jQuery object
                * @type {jQuery element}
                */
                var seekBar = $(element);
                
                /**
                * @function percentString
                * @desc Finds percentage of max that song duration or volume level is at.
                * @returns {percentage}
                */
                var percentString = function() {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };
                
                /**
                * @function fillStyle
                * @desc Percentage of the song seek or volume bar that should be shown as filled
                * @returns {object} property width and value
                */
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                
                /**
                * @function thumbStyle
                * @desc Changes the position of the seek bar thumb
                * @returns {object} property width and value
                */
                scope.thumbStyle = function() {
                    return {left: percentString()};
                };
                
                /**
                * @function onClickSeekBar
                * @desc Changes the value based on where click occured on seek bar
                * @param {event}
                */
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };
                
                /**
                * @function trackThumb
                * @desc Tracks location of mouse as user drags it
                */
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                        });
                    });
                    
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
            }
        };
    }
    
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();