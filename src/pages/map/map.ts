import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

	@ViewChild('map') mapRef: ElementRef;

	map: any;
	p1 = {lat: -22.3493143, lng: -49.0315599};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  	this.showMap();
    console.log('ionViewDidLoad MapPage');
  }

  showMap() {
  	this.map = new google.maps.Map(this.mapRef.nativeElement, {center: this.p1, zoom: 17});
  	var map = this.map;
  	this.map.addListener('click', function(e) {
      (new google.maps.Marker({
          position: e.latLng,
          map: map
      })).addListener('click', function(){
      	this.setMap(null)
      });
  		console.log(e.latLng);
  	});
  }

}
