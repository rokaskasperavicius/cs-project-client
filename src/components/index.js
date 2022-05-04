import React from "react";

export { Button } from "./Button";
export { Footer } from "./Footer";

const Footer = () => {
    return (
        <>
                <Footer>
                    <FooterLink to="/my-products" activeStyle>
                        My products
                    </FooterLink>
                    <FooterLink to="/add-product" activeStyle>
                        Add product
                    </FooterLink>
                    <FooterLink to="/my-profile" activeStyle>
                        My profile
                    </FooterLink>
                </Footer>
        </>
    )
}
export default Footer