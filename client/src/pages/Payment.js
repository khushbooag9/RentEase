import './Payment.css';

export default function Payment() {
    return (
        <div class="payment_container app_container">
            <form action="">
                <div class="row">
                    <div class="col">
                        <h3 class="title">BILLING ADDRESS</h3>
                        <div class="inputBox">
                            <span>Full Name :</span>
                            <input type="text" placeholder="Harry potter" />

                        </div>
                        <div class="inputBox">
                            <span>Email:</span>
                            <input type="email" placeholder="example@example.com" />

                        </div>
                        <div class="inputBox">
                            <span>Address:</span>
                            <input type="text" placeholder="house no.- colony - locality" />
                        </div>
                        <div class="inputBox">
                            <span>City:</span>
                            <input type="text" placeholder="delhi" />

                        </div>
                        <div class="flex">
                            <div class="inputBox">
                                <span>State :</span>
                                <input type="text" placeholder="maharastra" />
                            </div>


                            <div class="inputBox">
                                <span>Zip Code:</span>
                                <input type="text" placeholder="125 254" />

                            </div>
                        </div>
                    </div>



                    <div class="col">
                        <h3 class="pay_title title">PAYMENT</h3>
                        <div class="inputBox">
                            <span>Card accepted :</span>
                            <img src="https://chicfashion.ie/wp-content/uploads/2018/10/cards-.jpg " width="220" height="30" alt="" />
                        </div>
                        <div class="inputBox">
                            <span>Name on card :</span>
                            <input type="text" placeholder="Harry potter" />

                        </div>
                        <div class="inputBox">
                            <span>Credit card number :</span>
                            <input type="text" placeholder="2222-6666-3333-1111" />
                        </div>
                        <div class="inputBox">
                            <span>Exp month  :</span>
                            <input type="text" placeholder="january" />

                        </div>
                        <div class="flex">
                            <div class="inputBox">
                                <span>Exp year :</span>
                                <input type="number" placeholder="2027" />
                            </div>


                            <div class="inputBox">
                                <span>CVV :</span>
                                <input type="text" placeholder="1234" />

                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" value="proceed to checkout" class="submit-btn btn login_btn">PROCEED TO CHECKOUT</button>
            </form>
        </div>
    );
}