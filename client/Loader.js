import * as React from "react";
import "./loader.css";
import loading from './loading.gif';

export const Loader = ({ isLoading = false }) => {
    return (
        <React.Fragment>
            {isLoading && (
                <div className={"loader"}>
                    <img className="loader-image" src={loading} ></img>
                </div>
            )}
        </React.Fragment>
    )
}
