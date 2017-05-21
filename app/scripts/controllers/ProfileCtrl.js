(function () {
    function ProfileCtrl (Fixtures) {
        this.albumData = Fixtures.getAlbum();
    }
    
    angular
        .module('blocJams')
        .controller('ProfileCtrl', ['Fixtures', ProfileCtrl]);
})();