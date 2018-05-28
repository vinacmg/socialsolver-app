import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Denuncia } from '../../models/Denuncia';

import { ReportDetailModalPage } from '../report-detail-modal/report-detail-modal';
import { NovaDenunciaPage } from '../nova-denuncia/nova-denuncia';
import { FirestoreProvider } from '../../providers/firestore/firestore';

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

  markers: any = [];
  denuncias: Denuncia[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    private geolocation: Geolocation,
    private firestore: FirestoreProvider,
    private modalCtrl: ModalController
  ) {
    this.novaDenuncia = NovaDenunciaPage;
    this.criandoDenuncia = this.navParams.get('criandoDenuncia');
    
    this.geolocation.getCurrentPosition().then((resp) => {
      this.showMap(resp.coords.latitude, resp.coords.longitude);

      this.firestore.getDenuncias().subscribe(denuncias => {
        this.clearMarkers();
        this.denuncias = denuncias
        this.denuncias.map(denuncia => {
          this.addMarker(denuncia);
        });
      });
    }).catch((error) => {
      console.log('Erro', error);
    });
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
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
    this.map = new google.maps.Map(this.mapRef.nativeElement, 
      {center: local, zoom: 17, disableDefaultUI: true}
    );
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

  addMarker(denuncia: Denuncia) {/*
    let image = {
      url: '../../assets/imgs/marker.png',
      size: new google.maps.Size(26, 30),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(13, 30)
  };*/
    
    const marker = new google.maps.Marker({
      map: this.map,
      position: {lat: denuncia.coord.latitude, lng: denuncia.coord.longitude},
      //icon: image,
      //animation: google.maps.Animation.DROP
      //icon:
    });
    
    let that = this;
    marker.addListener('click', function() {
      that.presentReportDetail(denuncia);
    });

    this.markers.push(marker);
  }

  clearMarkers() {
    this.markers.map(marker => {
      marker.setMap(null);
    });
    this.markers = [];
  }

  presentReportDetail(report: any) {
  	let modal = this.modalCtrl.create(ReportDetailModalPage, { report: report });
  	modal.present();
  }
}
