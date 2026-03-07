import { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "./arhive.css"

const Archive = () => {

const [query,setQuery] = useState("");
const [results,setResults] = useState([]);

const search = async () => {

const res = await axios.get(
`/api/archive/search?q=${query}`
);

setResults(res.data);

};

return (

<div className="archive-page">

<h1>Government Digital Archive</h1>

<input
placeholder="Search leaders, documents, reports..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
/>

<button onClick={search} className="search-btn">
Search
<FaSearch/>
</button>

<div className="archive-results">

{results.map(item => (

<div key={item._id} className="archive-card">

<h3>{item.title}</h3>

<p>{item.description}</p>

<p>Year: {item.year}</p>

<p>Category: {item.category}</p>

</div>

))}

</div>

</div>

);

};

export default Archive;