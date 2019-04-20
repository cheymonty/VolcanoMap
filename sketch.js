let volcanoData;
let myMap;
let canvas;

const mappa = new Mappa('Leaflet');

const options = {
  lat: 0,
  lng: 0,
  zoom: 1.5,
  style: "https://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function preload(){
  volcanoData = loadTable('volcano.csv', 'header');

}

function setup() {
  canvas = createCanvas(600, 500);
  myMap = mappa.tileMap(options);

  myMap.overlay(canvas);

  canvas.parent('sketch-holder');

}

function draw() {
  clear();

  for (let row of volcanoData.rows) {

    let country = row.get('Country');
    let lat = Number(row.get('Latitude'));
    let lon = Number(row.get('Longitude'));

    const pix = myMap.latLngToPixel(lat,lon);

    let PEI = Number(row.get('PEI'));
    let diameter =  9 * sqrt(PEI) * myMap.zoom();

    let volcanoName = row.get('V_Name');


    strokeWeight(1);
    stroke(255,255,255);

    switch(PEI){
      case 1:
        fill(254, 254, 105, 100); //yellow
        break;
      case 2:
        fill(169, 243, 106, 100);
        break;
      case 3:
        fill(87, 232, 107, 100);
        break;
      case 4:
        fill(250,128,114,100);
        break;
      case 5:
        fill(255,165,0,100); //orange
        break;
      case 6:
        fill(220, 20, 60, 150);
        break;
      case 7:
        fill(225, 0, 0,150); //red
        break;
    }

    // if (PEI===1){ //yellow
    //   fill(254, 254, 105, 100);
    // }else if (PEI===2){
    //   fill(169, 243, 106, 100);
    // }else if (PEI===3){
    //   fill(87, 232, 107, 100);
    // }else if(PEI===4){
    //   fill(250,128,114,100);
    // }else if(PEI===5){
    //   fill(255,165,0,100); //orange
    // }else if(PEI===6){
    //   fill(220, 20, 60, 150);
    // }else if(PEI===7){
    //   fill(225, 0, 0,150); //red
    // }

    ellipse(pix.x, pix.y, diameter, diameter);

  }
}
