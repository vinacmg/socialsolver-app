export interface Denuncia {
  id?:any;
  autorid?:any;
  autornome?:string;
  autorfoto?:string;
  titulo?:string;
  fotoUrl?:string;
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
  upped?:Array<string>;
  coord?:any;
}