function Tile(position, value) {
    if(!position){
        position = {'x':0,'y': 0}
    }
    if(!value){
        value = 0;
    }
    this.x                = position.x;
    this.y                = position.y;
    this.value            = value || 1024;

    this.previousPosition = null;
    this.mergedFrom       = null; // Tracks tiles that merged together
}

Tile.prototype.savePosition = function () {
    this.previousPosition = { x: this.x, y: this.y };
};

Tile.prototype.updatePosition = function (position) {
    this.x = position.x;
    this.y = position.y;
};

Tile.prototype.fillFromJson = function(json){
    this.x = json.x;
    this.y = json.y;
    this.value=  json.value;

    this.previousPosition =  json.previousPosition;

    if(json.mergedFrom instanceof Array){
        this.mergedFrom = [];
        json.mergedFrom.forEach(function(t){
            var tile = new Tile();
            tile.fillFromJson(t);
            this.mergedFrom.push(tile);
        }, this);
    }else{
        this.mergedFrom =  json.mergedFrom;
        if(this.mergedFrom != null){
            var tile = new Tile();
            tile.fillFromJson(this.mergedFrom);
            this.mergedFrom = tile;
        }
    }
}
