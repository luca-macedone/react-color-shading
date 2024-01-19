import { useEffect, useState } from "react";
import "./App.css";
import Values from "values.js";

function App() {
  const [data, setData] = useState({
    color: "#1194ec",
    amount: 9,
  });

  const [colors, setColors] = useState([]); // array contenente le tonalità del colore scelto
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e) => {
    // console.log(e);
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const createGradient = () => {
    if (parseInt(data.amount, 10) > 0 && data.color.length === 7) {
      const baseColor = new Values(`${data.color}`);
      setColors(baseColor.all(Math.round(100 / parseInt(data.amount, 10)) * 2));
    }
    setIsLoading(false);
    console.log(data.color, " => ", colors);
  };

  useEffect(() => {
    setIsLoading(true);

    const baseColor = new Values(`${data.color}`);
    setColors(baseColor.all(Math.round(100 / parseInt(data.amount, 10)) * 2));

    setIsLoading(false);
  }, []);

  return (
    <div className="App bg-light min-vh-100 ">
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-12">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createGradient();
              }}
              className="d-flex align-items-center flex-wrap flex-md-nowrap gap-4"
            >
              <input
                type="text"
                className="form-control border-0 border-bottom rounded-0 bg-light"
                name="color"
                value={data.color}
                onChange={handleChange}
                maxLength={7}
              ></input>
              <input
                type="number"
                min={0}
                placeholder="9"
                step={3}
                className="form-control border-0 border-bottom rounded-0 bg-light"
                name="amount"
                value={data.amount}
                onChange={handleChange}
              ></input>
              <button
                type="submit"
                className="btn btn-info rounded-pill px-4 text-uppercase"
              >
                Create
              </button>
            </form>
          </div>
          <div className="col-12 d-flex flex-wrap py-4">
            {!isLoading &&
              colors.map((elem, index) => {
                let half = (colors.length - 1) / 2;
                return (
                  <div
                    key={index}
                    className={
                      "#" + elem.hex === data.color
                        ? "col-12 col-sm-6 col-md-4 p-5 text-center border border-light border-4 pointer"
                        : "col-12 col-sm-6 col-md-4 p-5 text-center pointer"
                    }
                    style={{ backgroundColor: "#" + elem.hex }}
                    onClick={() => {
                      navigator.clipboard.writeText("#" + elem.hex);
                    }}
                  >
                    <h6
                      className={
                        index > half
                          ? "fb-bold text-light"
                          : "fw-bold text-dark"
                      }
                    >
                      #{elem.hex}
                    </h6>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
