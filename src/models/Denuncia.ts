export interface Denuncia {
  id?:any;
  autorid?:any;
  titulo?:string;
  categorias?:{
    agua:boolean,
    seguranca:boolean, 
    saude:boolean,
    transporte:boolean,
    iluminacao:boolean
  };
  descricao?:string;
  data?:Date;
  resolvido?:boolean;
  ups?:number;
  coord?:any;
}