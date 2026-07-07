import react from "react";
import { Link } from "react-router-dom";


export default function HeadingSection(props) {
    return (
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-black">{props.title}</h1>
           <div className="">
            <Link to={props.link} className="bg-primary text-sm text-white px-3 py-2 rounded-md hover:bg-primary-200">{props.btnText}</Link>
           </div>
        </div>
    );
}