import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { NovaDenunciaPage } from '../nova-denuncia/nova-denuncia';

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
  novaDenuncia: any;
  criandoDenuncia: boolean = false;
  locationSelected: boolean = false;
  reportLocation: any;

	p1 = {lat: -22.3493143, lng: -49.0315599};

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private geolocation: Geolocation) {
    this.novaDenuncia = NovaDenunciaPage;
    this.criandoDenuncia = this.navParams.get('criandoDenuncia');
  }

  ionViewDidLoad() {
  	this.showMap();
    console.log('ionViewDidLoad MapPage');

    this.geolocation.getCurrentPosition().then((resp) => {
      this.showMap(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Erro', error);
    });
  }

  finish() {
    if (this.locationSelected) {
      this.navCtrl.push(NovaDenunciaPage, {
        reportLocation: this.reportLocation
      });
      return;
    }
    this.showAlert('Atenção', 'Selecione pelo menos uma localização no mapa!');
  }

  showAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  showMap(latitude = null, longitude = null) {
    var local = {lat: latitude, lng: longitude};
  	this.map = new google.maps.Map(this.mapRef.nativeElement, {center: local, zoom: 17, disableDefaultUI: true});
  	var map = this.map;

    var styles = {
      hide: [
        {
          featureType: 'poi',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'transit',
          stylers: [{visibility: 'off'}]
        }
      ]
    };
    
    map.setOptions({styles: styles['hide']});

    this.addListener();
  }

  addListener()  {
    var that = this;

    if (this.criandoDenuncia && ! this.locationSelected) {
      this.map.addListener('click', function(e) {
        that.selectLocation(e);
      });
    }
  }

  selectLocation(e) {
      this.locationSelected = true;
      let that = this;

      const marker = new google.maps.Marker({
        position: e.latLng,
        map: this.map
      });

      that.reportLocation = e.latLng;

      marker.addListener('click', function() {
        this.setMap(null);
        that.locationSelected = false;
        that.addListener();
      });

      google.maps.event.clearListeners(this.map, 'click');
  }

}
