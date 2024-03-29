import { ethers } from 'ethers'


const ProductList = ({ title, myProducts }) => {
    return (

        <div><h2 id={title}>Medical Product List</h2>
            <div className="list__container">
                {myProducts.map((product, index) => (

                    <div className="list__element" key={index}>
                        <p><b>ID: {product.pid.toString()} | Name: {product.name.toString()}</b><br></br>
                            EMEA: {product.EMEA.toString()} | NRM: {product.NRM.toString()}<br></br>
                            Description: {product.description.toString()}
                        </p>
                    </div>))}
            </div></div>
    );
}

export default ProductList;