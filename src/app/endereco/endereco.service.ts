import { URLSearchParams, Http } from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/toPromise';


export class Uf {
  label: string;
  value: string;
  geonameId: string;
}

export class Cidade {
  label: string;
  value: string;
}

@Injectable()
export class EnderecoService {

  pessoasUrl: string;

  constructor(private http: Http) {}


  listarUFs(): Promise<any> {
    return this.http.get('http://www.geonames.org/childrenJSON?geonameId=3469034')
      .toPromise()
      .then(response => {
        const ufsResult = response.json();
        const ufs = [];

        for (const ufgeo of ufsResult.geonames){
            const uf = new Uf();
            uf.label = ufgeo.toponymName;
            uf.value = ufgeo.toponymName;
            uf.geonameId = ufgeo.geonameId;
            ufs.push(uf);
        }

        return ufs;
      });
  }


  listarCidades(geonameId: string): Promise<any> {
    console.log(`http://www.geonames.org/childrenJSON?geonameId=${geonameId}`);
    return this.http.get(`http://www.geonames.org/childrenJSON?geonameId=${geonameId}`)
      .toPromise()
      .then(response => {
        const cidadesGeo = response.json();
        console.log(cidadesGeo);
        const cidades = [];

        for (const citgeo of cidadesGeo.geonames){
            const cidade = new Cidade();
            cidade.label = citgeo.toponymName;
            cidade.value = citgeo.toponymName;
            cidades.push(cidade);
        }
        return cidades;
      });
  }


}
