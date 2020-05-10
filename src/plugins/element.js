import Vue from 'vue'
import Element from 'element-ui'
import '../element-variables.scss'
import locale from 'element-ui/lib/locale/lang/en'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '../themes/element-#000000/index.css'
import VueBarcodeScanner from 'vue-barcode-scanner'

// require styles
import '../../public/flex.scss'
import '../../public/card-box.scss'
import '../../public/product.scss'
import '../../public/add_store.scss'
import '../../public/sale.scss'
import '../../public/product_sale.scss'
import '../../public/company_exchange_item.scss'
Vue.use(VueAwesomeSwiper)
Vue.use(Element, { locale })
Vue.use(VueBarcodeScanner)
