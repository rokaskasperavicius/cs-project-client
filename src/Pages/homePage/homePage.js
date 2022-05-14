import React, {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import {apiUrl} from "../../config";
import orderBy from "lodash/orderBy";
import { Input } from "../../components/Input";




export const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [selectedSearch] = useState("");
    const [selectedOrderBy, setSelectedOrderBy] = useState("");
    //TODO: get possible orders from database, MP 08/05

    const orderByOptions = [
        {label: "Name", value: "name"},
        {label: "Note", value: "note"},
        {label: "Expiry", value: "expiryDate"},
    ];

    const [debouncedSearch] = useDebounce(selectedSearch, 300);

    console.log(products);



    useEffect(() => {
        // Fetching all products
        fetch(apiUrl + "/products")
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    // Set new categories
                    setProducts(res.data);
                }
            });
    }, []);

    useEffect(() => {
        const newOrder = selectedOrderBy || "name";
        setProducts(orderBy(products, [newOrder]));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOrderBy]);

    useEffect(() => {
        // fail check
        const parametersArray = [];

        if (debouncedSearch) {
            parametersArray.push("search=" + encodeURIComponent(debouncedSearch));
        }
        const endpoint = "/products?" + parametersArray.join("&");

        fetch(apiUrl + endpoint)
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    setProducts(res.data);
                    setSelectedOrderBy("");
                }
            });
    }, [debouncedSearch]);

    Date.prototype.addDays = function (days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    return (

        <>
            <h2 className="title">Welcome</h2>
            <div className="box">
                <h3>Products expiring soon</h3>
                {products.filter((p) => p.expiryDate < new Date().addDays(7).toISOString())
                    .map((p) => (
                        <tr>
                            <th>{p.name}</th>
                            <th>{p.note}</th>
                            <th>{p.expiryDate.split("T")[0]}</th>
                        </tr>
                    ))
                }
            </div>

        </>
    );
};

