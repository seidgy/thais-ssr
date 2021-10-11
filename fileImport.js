const fs = require('fs')
const axios = require('axios');
require('dotenv').config({path: './.env'})
const server = process.env['VUE_APP_SERVER_URI']?process.env['VUE_APP_SERVER_URI']:'https://backend.thaisimobiliaria.com.br';

const generator = async () => {
    try {
      const imoveis = await axios.post(
        server+'/imoveisHec/getAllImoveisServer'
      );
    } catch (err) {
      console.log(err)
    }
    const dir = './content/imoveis'    
    fs.rm(dir, { recursive: true }, async () => {
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }
      fs.access(dir, fs.constants.R_OK | fs.constants.W_OK, async err => {
        if (err) {
          console.log(err)
        } else {
          await imoveis.data.imoveis.forEach((imovel) => {
            let i = {}
            i.title = imovel.codigo_imovel;
            i.codigo_imovel = imovel.codigo_imovel;
            i.titulo = imovel.imovel.titulo_imovel;
            i.bairro = imovel.imovel.bairro;
            if(imovel.ofertas[0]){
              i.tipo = imovel.ofertas[0].tipo_oferta == 1 ? 'Aluguel' : 'Compra';
            }
            if(imovel.fotos[0]) {
              i.foto = imovel.fotos[0].url_arquivo;
            }
            fs.writeFile(dir+"/"+imovel.codigo_imovel+".json", JSON.stringify(i), function(err, result) {
              if(err) console.log('error', err);
            });;
          });
        }
      })
    });
}

return generator()