import React from "react";
import { Loader } from "./Loader";
import { getProducts } from "./actions.js"
import "./products.css";
const style = {
    height: 20,
    border: "1px solid green",
    margin: 2,
    padding: 2
};

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isLoading: false,
            currentPage: 1,
            isMoreProducts: false
        };
        this.fetchProducts(this.state.currentPage)
    }

    componentDidMount() { //it can be replaced with react hook useEffect if functional component
        this.refs.iScroll.addEventListener("scroll", () => {
            if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight) {
                this.setState({ isLoading: true });
                this.fetchProducts(this.state.currentPage);
            }
        });
    }


    fetchProducts = async (pageNo) => {
        const products = await getProducts(pageNo);
        this.setProducts(products)
    }

    setProducts(products) {
        this.setState({
            products: [...this.state.products, ...products],
            isLoading: false,
            currentPage: this.state.currentPage + 1,
            isMoreProducts: products.length < 15
        });

    }

    renderHeader = () => {
        return <tr>
            <th> Product No </th>
            <th >Product Id</th>
            <th>Product face</th>
            <th>Price</th>
            <th>Product Date</th>
        </tr>
    }

    renderBody = (products) => products.map((product, index) => {
        return (
            <tr key={`${product.id}_${index}`} style={style}>
                <td>{index}</td>
                <td >{product.id}</td>
                <td style={{ fontSize: `${product.size}px` }}>{product.face}</td>
                <td>{`${product.price}`}</td>
                <td >{product.date}</td>
            </tr>
        )
    })


    render() {
        const { products = [] } = this.state
        return (
            <div ref="iScroll" className={"product-list"}  >
                <table style={{ width: "100%" }}>
                    <thead>{this.renderHeader()}</thead>
                    <tbody>{this.renderBody(products)}</tbody>
                </table>
                {this.state.isMoreProducts && <span>{"No more products"}</span>}
                <Loader isLoading={this.state.isLoading} />
            </div>);
    }
}

export { Products }