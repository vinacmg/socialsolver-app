export interface Denuncia {
  id?:any;
  titulo?:string;
  categorias?:{agua:boolean, seguranca:boolean, saude:boolean};
  descricao?:string;
  data?:Date;
  resolvido?:boolean;
  ups?:number;
  coord?:{lat:any, lng:any};
}