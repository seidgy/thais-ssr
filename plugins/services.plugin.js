import { ImoveiService } from '../service/imoveis.service'
import { BairroService } from '../service/bairros.service'
import { IntegracaoService } from '../service/integracao.service'

export default ({ app: { $axios } }, inject) => {
    // pass $axios as a dependency to the services constructor
    const imoveis = new ImoveiService($axios)
    const bairros = new BairroService($axios)
    const integracao = new IntegracaoService($axios)
    

    // inject the service, making it available in the context, component, store, etc.
    inject('imoveis', imoveis)
    inject('bairros', bairros)
    inject('integracao', integracao)
}