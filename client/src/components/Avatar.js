import axios from "axios";
import { useState, useEffect } from "react";

function Avatar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/file")
      .then((res) => {
        console.log("Data is", data);
        setData(res.data);
      })
      .catch((err) => console.log(err, "it has an error"));
  }, []);

  return (
    <div className="App">
      <h1>Image uploading react</h1>
      {console.log(data)}
      {data.map((singleData) => {
        const base64String = btoa(
          new Uint8Array(singleData.img.data.data).reduce(function (
            data,
            byte
          ) {
            return data + String.fromCharCode(byte);
          },
          "")
        );
        return (
          <img src={`data:image/png;base64,${base64String}`} width="300" />
        );
      })}
    </div>
  );
}

export default Avatar;
