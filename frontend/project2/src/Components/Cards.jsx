import React from "react";

const Cards = (props) => {
    console.log(typeof props.no_of_stocks)
    return(
        <>  
            <div class="card">
                    <div class="card-header">
                        Stock Dashboard
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{props.sno} : {props.stock_name}  </li>
                        <li class="list-group-item">Stock Unit : {props.no_of_stocks} </li>
                        <li class="list-group-item">Transaction : SELL </li>
                        <li class="list-group-item">Stock Price  : {props.price_of_stock} </li>
                        <li class="list-group-item"> Investment : {props.no_of_stocks * 100} </li>
                        <li class="list-group-item">Current Amount : {props.no_of_stocks * props.price_of_stock} </li>
                        <li class="list-group-item"> Profit : {props.no_of_stocks * props.price_of_stock - props.no_of_stocks * 100} </li>
                        <li class="list-group-item">Date : {props.transaction_date} </li>
                    </ul>
                </div>
        </>
    );
}
export default Cards