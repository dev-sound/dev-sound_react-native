
import ImagesProject from './ImagesProject'
import axios from 'axios'


const requests = {

    getProduct: async () => {
        arrProdutos = []
      
       arrProdutos = await axios.get(`http://10.0.3.2:3000/produtos/`)
        
      
        return arrProdutos.data
    
    } 
    
}

export {requests}

  const ProductsSpotlight = [

        {
            id:1,
            img:ImagesProject.ProductImages.saxImg,
            name:'Saxone Strauss',
            price:'2,099,00',
        },
        {
            id:2,
            img:ImagesProject.ProductImages.violaoTakamine,
            name:'Violão Takamine',
            price:'3,899,00',
        },
        {
            id:3,
            img:ImagesProject.ProductImages.guitarraFender,
            name:'Guitarra Fender Jimi Headrix',
            price:'12,299,00',
        },
        {
            id:4,
            img:ImagesProject.ProductImages.baixoFender,
            name:'Baixo Fender MS20012',
            price:'8,999,00',
        }

  ]

export default ProductsSpotlight
