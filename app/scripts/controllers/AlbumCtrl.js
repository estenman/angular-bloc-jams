(function() {
    function AlbumCtrl(){
        this.albumData= [] ;
        for (var i=0; i < albumPicasso.songs.length; i++) {
            this.albumData.push(angular.copy(albumPicasso)); 
        }
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();